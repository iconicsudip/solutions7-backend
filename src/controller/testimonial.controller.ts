import { NextFunction, Request, Response } from "express";
import generateResponse from "../utils/response";
import { TestimonialService } from "../services/testimonial.service";


const serviceService = new TestimonialService()
export const allTestimonials = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const pages = await serviceService.getAllTestimonials()
        return generateResponse(res, 200, pages);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const createTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body = req.body;
        const page = await serviceService.createTestimonial(body);
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const query = req.params;
        console.log(query)
        if (!query.id) {
            return generateResponse(res, 400, {}, "Page ID is required");
        }
        const page = await serviceService.deleteTestimonial(query.id);
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return generateResponse(res, 400, {}, "id is required");
        }
        const page = await serviceService.updateTestimonial(id, req.body);
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}