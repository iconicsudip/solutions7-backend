import { Router } from "express"
import { contactPage, homePage, pricingPage, servicesPage } from "../controller/website.controller";
const websiteRoutes = Router();
websiteRoutes.get("/", homePage);
websiteRoutes.get("/services", servicesPage)
websiteRoutes.get("/pricing", pricingPage)
websiteRoutes.get("/contact", contactPage);
export default websiteRoutes;