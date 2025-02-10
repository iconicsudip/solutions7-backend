import { Router } from "express"
import { contactPage, homePage, pricingPage, servicesPage } from "../controller/website.controller";
import { fetchHeaderData } from "../middlewares/header.middleware";
const websiteRoutes = Router();
websiteRoutes.get("/", fetchHeaderData, homePage);
websiteRoutes.get("/services", fetchHeaderData, servicesPage)
websiteRoutes.get("/pricing", fetchHeaderData, pricingPage)
websiteRoutes.get("/contact", fetchHeaderData, contactPage);
export default websiteRoutes;