import { NextFunction, Request, Response } from "express";
import generateResponse from "../utils/response";
import { PageService } from "../services/page.service";
import { PageContentService } from "../services/pagecontent.service";
import { ServiceService } from "../services/service.service";
import { getUnsplshImage } from "../utils/global.function";
import { BasicInfoService } from "../services/basicinfo.service";
import { GlobalService } from "../services/global.service";

const pageService = new PageService();
const pageContentService = new PageContentService();
const serviceService = new ServiceService();
const basicInfoService = new BasicInfoService();
const globalService = new GlobalService()
export const homePage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const page = await pageService.getPageByName("home");
        if (!page) {
            return generateResponse(res, 500, {}, "Page not found");
        }
        const pageContent = await pageContentService.getPageContentSectionByPageId(page.id);
        const pageContentSection: { [key: string]: { [key: string]: any } } = {};
        await Promise.all(pageContent.map(async (content) => {
            if (!pageContentSection[content.section]) {
                pageContentSection[content.section] = {};
            }
            if (content.contentType === "services" || content.contentType === "testimonials") {
                const ids = JSON.parse(content.content); // Assuming content contains an array of IDs like [1,2,3]
                const fetchedData = await globalService.fetchData(content.contentType, ids);
                pageContentSection[content.section][content.contentType] = fetchedData;
            } else {
                pageContentSection[content.section][content.contentType] = JSON.parse(content.content);
            }
        }))
        const bannerInfo = await basicInfoService.getBasicInfoByTypes(["bannerText", "isShowBanner"])

        const response = {
            ...pageContentSection,
            bannerInfo
        }

        return res.render('pages/main', { title: 'Home - 7solutions', body: 'home', data: response });
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const servicesPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const services = await serviceService.getAllServices();
        const serviceWithImage = await Promise.all(services.map(async (s) => {
            const unsplashImage = await getUnsplshImage(s.title)
            return {
                ...s,
                image: unsplashImage.results[0].urls.regular
            }
        }))
        return res.render('pages/main', { title: 'Services - 7solutions', body: 'services', data: serviceWithImage });
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const pricingPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        return res.render('pages/main', { title: 'Pricing - 7solutions', body: 'pricing' });
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const contactPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const contactInfo = await basicInfoService.getBasicInfoByTypes(["companyEmail", "companyLocation", "companyPhoneNumber", "companyLocationIframe"])
        return res.render('pages/main', { title: 'Contact - 7solutions', body: 'contact', data: contactInfo });
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}