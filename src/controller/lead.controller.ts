import { NextFunction, Request, Response } from "express";
import generateResponse from "../utils/response";
import { LeadService } from "../services/lead.service";

const leadService = new LeadService()
export const getAllLeads = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const allLeads = await leadService.allLead()
        return generateResponse(res, 200, allLeads);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const addNewLead = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body = req.body;
        if (!body) {
            return generateResponse(res, 500, {}, "Body is required");
        }
        if (!body.name || !body.email) {
            return generateResponse(res, 500, {}, "Name and Email is required");
        }
        const response = await leadService.createLead(body);
        return generateResponse(res, 200, response, "Contact information sent successfully. We will touch with you shortly");
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}