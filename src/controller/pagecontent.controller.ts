import { NextFunction, Request, Response } from "express";
import generateResponse from "../utils/response";
import { PageContentService } from "../services/pagecontent.service";
const pageContentService = new PageContentService();

export const createPageContentSection = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body = req.body;

        if (!body) {
            return generateResponse(res, 400, {}, "Body is required");
        }

        let sectionType = "created";
        const { page, ...rest } = body; // Extract page and the remaining sections
        const sections = rest;

        // Process each section asynchronously
        let index = 0;
        for (const sec of Object.keys(sections)) {
            const contentSection = sections[sec];
            const order = index;
            for (const key of Object.keys(contentSection)) {
                const content = JSON.stringify(contentSection[key]);
                const contentType = key;
                const section = sec;
                const pageId = page;

                // Check if the content already exists
                const existingContent = await pageContentService.getPageContentSection(contentType, section, pageId);

                if (existingContent) {
                    // Update the existing content
                    await pageContentService.updatePageContentSection(content, contentType, section, pageId);
                    sectionType = "updated";
                } else {
                    // Create new content
                    await pageContentService.createPageContentSection(content, contentType, section, pageId, order);
                    sectionType = "created";
                }
            }
            index++;
        }

        // Respond after processing all sections
        return generateResponse(res, 200, `Content ${sectionType} successfully`);
    } catch (error: any) {
        // Handle any errors and return a 500 response
        return generateResponse(res, 500, {}, error.message);
    }
};

export const getPageContentSectionByPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { pageId } = req.params;
        if (!pageId) {
            return generateResponse(res, 400, {}, "pageId is required");
        }

        const pageContent = await pageContentService.getPageContentSectionByPageId(parseInt(pageId as string));
        const pageContentSection: { [key: string]: { [key: string]: any } } = {};
        pageContent.forEach((content) => {
            if (!pageContentSection[content.section]) {
                pageContentSection[content.section] = {};
            }
            pageContentSection[content.section][content.contentType] = JSON.parse(content.content);
        });
        return generateResponse(res, 200, pageContentSection);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}