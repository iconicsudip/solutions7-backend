import { Router } from "express"
import { createPageContentSection, getPageContentSectionByPage } from "../controller/pagecontent.controller";

const pageContentRoutes = Router();

pageContentRoutes.post("/add-page-section", createPageContentSection);
pageContentRoutes.get("/get-page-section/:pageId", getPageContentSectionByPage);

export default pageContentRoutes;