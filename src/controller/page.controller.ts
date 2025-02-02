import { NextFunction, Request, Response } from "express";
import { PageService } from "../services/page.service";
import generateResponse from "../utils/response";


const pageService = new PageService()
export const allPages = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { isPublished } = req.query;
        const pages = await pageService.getAllPages({
            isPublished: isPublished as string
        });
        return generateResponse(res, 200, pages);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const createPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body = req.body;
        if (!body.title) {
            return generateResponse(res, 400, {}, "Title is required");
        }
        const page = await pageService.createPage(req.body);
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const deletePage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const query = req.params;
        console.log(query)
        if (!query.id) {
            return generateResponse(res, 400, {}, "Page ID is required");
        }
        const page = await pageService.deletePage(query.id);
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const publishPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const query = req.params;
        if (!query.id) {
            return generateResponse(res, 400, {}, "Page ID is required");
        }
        const page = await pageService.publishPage(query.id);

        return generateResponse(res, 200, page);

    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const unpublishPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const query = req.params;
        if (!query.id) {
            return generateResponse(res, 400, {}, "Page ID is required");
        }
        const page = await pageService.unpublishPage(query.id);

        return generateResponse(res, 200, page);

    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}