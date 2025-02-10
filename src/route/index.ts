import { Router } from "express";
import authRoutes from "./auth.route";
import pageRoutes from "./page.route";
import pageContentRoutes from "./pagecontent.route";
import serviceRoutes from "./service.route";
import basicInfoRoutes from "./basicinfo.route";
import testimonialRoutes from "./testimonial.route";
import leadRoutes from "./lead.route";
import headerRoutes from "./header.route"
// import websiteRoutes from "./website.route";

const mainRoutes = Router();


mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/pages", pageRoutes);
mainRoutes.use("/pagecontent", pageContentRoutes);
mainRoutes.use("/service", serviceRoutes);
mainRoutes.use("/basic-info", basicInfoRoutes);
mainRoutes.use("/testimonials", testimonialRoutes)
mainRoutes.use("/lead", leadRoutes);
mainRoutes.use("/header", headerRoutes)
// mainRoutes.use("/website", websiteRoutes)

export default mainRoutes;