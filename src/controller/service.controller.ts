import { NextFunction, Request, Response } from "express";
import { ServiceService } from "../services/service.service";
import generateResponse from "../utils/response";


const serviceService = new ServiceService()
export const allServices = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const pages = await serviceService.getAllServices()
        return generateResponse(res, 200, pages);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const createService = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body = req.body;
        if (!body.title) {
            return generateResponse(res, 400, {}, "Title is required");
        }
        const maxOrder = await serviceService.getMaxOrder();
        const nextOrder = maxOrder?.max !== null ? Number(maxOrder.max) + 1 : 0;
        body.order = nextOrder;
        const page = await serviceService.createService(body);
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const deleteService = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const query = req.params;
        console.log(query)
        if (!query.id) {
            return generateResponse(res, 400, {}, "Page ID is required");
        }
        const page = await serviceService.deleteService(query.id);
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const getService = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return generateResponse(res, 400, {}, "id is required");
        }
        const page = await serviceService.getServiceById(parseInt(id as string));
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const updateService = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return generateResponse(res, 400, {}, "id is required");
        }
        const page = await serviceService.updateService(id, req.body);
        return generateResponse(res, 200, page);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}