import { NextFunction, Request, Response } from "express";
import generateResponse from "../utils/response";
import { PageService } from "../services/page.service";
import { PageContentService } from "../services/pagecontent.service";
import { ServiceService } from "../services/service.service";
import { getUnsplshImage } from "../utils/global.function";
import { BasicInfoService } from "../services/basicinfo.service";

const pageService = new PageService();
const pageContentService = new PageContentService();
const serviceService = new ServiceService();
const basicInfoService = new BasicInfoService()
export const homePage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const page = await pageService.getPageByName("home");
        if (!page) {
            return generateResponse(res, 500, {}, "Page not found");
        }
        const pageContent = await pageContentService.getPageContentSectionByPageId(page.id);

        return res.render('pages/main', { title: 'Home - 7solutions', body: 'home' });
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
        const contactInfo = await basicInfoService.getBasicInfoByTypes(["companyEmail", "companyLocation", "companyPhoneNumber"])
        return res.render('pages/main', { title: 'Contact - 7solutions', body: 'contact', data: contactInfo });
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}