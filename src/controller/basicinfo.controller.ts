import { NextFunction, Request, Response } from "express";
import { BasicInfoService } from "../services/basicinfo.service";
import generateResponse from "../utils/response";

const basicInfoService = new BasicInfoService()
export const getBasicInfos = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const basicInfo = await basicInfoService.getBasicInfos()
        return generateResponse(res, 200, basicInfo);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}

export const upsertBasicInfo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body = req.body;
        if (!body) {
            return generateResponse(res, 500, {}, "Body is required");
        }
        let resp = ""
        await Promise.all(Object.keys(body).map(async (key) => {
            const response = await basicInfoService.updateAndCreateBasicInfo(key, body[key]);
            resp = response.message
        }))
        return generateResponse(res, 200, resp);
    } catch (error: any) {
        return generateResponse(res, 500, {}, error.message);
    }
}