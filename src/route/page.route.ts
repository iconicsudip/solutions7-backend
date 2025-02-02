import { Router } from "express"
import { allPages, createPage, deletePage, publishPage, unpublishPage } from "../controller/page.controller";

const pageRoutes = Router();

pageRoutes.get("/", allPages);
pageRoutes.post("/add-page", createPage);
pageRoutes.delete("/delete-page/:id", deletePage);
pageRoutes.put("/publish-page/:id", publishPage);
pageRoutes.put("/unpublish-page/:id", unpublishPage);

export default pageRoutes;