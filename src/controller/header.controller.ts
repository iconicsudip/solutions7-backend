import { NextFunction, Request, Response } from "express";
import generateResponse from "../utils/response";
import { HeaderService } from "../services/header.service";

const headerService = new HeaderService();

// ✅ Get All Headers
export const getHeaders = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const headers = await headerService.getAllHeaders();
        return generateResponse(res, 200, headers);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
};

// ✅ Get Header by ID
export const getHeaderById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const header = await headerService.getHeaderById(Number(req.params.id));
        if (!header) return generateResponse(res, 404, {}, "Header not found");
        return generateResponse(res, 200, header);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
};

// ✅ Create or Update Header
export const saveHeader = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const header = await headerService.saveHeader(req.body);
        return generateResponse(res, 200, header, "Header saved successfully");
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
};

export const updateHeader = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const updatedHeader = await headerService.updateHeader(Number(req.params.id), req.body);
        if (!updatedHeader) return generateResponse(res, 404, {}, "Header not found");
        return generateResponse(res, 200, updatedHeader, "Header updated successfully");
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
};
// ✅ Delete Header
export const deleteHeader = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        await headerService.deleteHeader(Number(req.params.id));
        return generateResponse(res, 200, {}, "Header deleted successfully");
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
};