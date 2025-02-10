import { NextFunction, Request, Response } from "express";
import { HeaderService } from "../services/header.service";
import { HeaderNameType } from "../entities/header";
import { BasicInfoService } from "../services/basicinfo.service";

const headerService = new HeaderService();
const basicInfoService = new BasicInfoService()

export const fetchHeaderData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers = await headerService.getAllHeaders();
        const basicInfo = await basicInfoService.getBasicInfoByTypes(["companyName", "companyEmail", "companyLocation", "companyPhoneNumber"])
        const formatHeaders = headers.map((header) => {
            if (header.headerNameType === HeaderNameType.PAGE) {
                return {
                    name: header.name,
                    redirectUri: header.page.title === "home" ? "/" : header.page.title
                }
            } else if (header.headerNameType === HeaderNameType.SUB_PAGES) {
                return {
                    name: header.name,
                    subPages: header.pages.map((page) => {
                        return {
                            name: page.title,
                            redirectUri: page.title === "home" ? "/" : page.title
                        }
                    })
                }
            }
        })
        const response = {
            navMenus: formatHeaders,
            basicInfo: { ...basicInfo, year: new Date().getFullYear() }
        }
        res.locals.headers = response; // Store headers globally in response locals
        next();
    } catch (error: any) {
        res.locals.headers = []; // Default empty headers if an error occurs
        next();
    }
};
