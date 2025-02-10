import { Router } from "express"
import { deleteHeader, getHeaderById, getHeaders, saveHeader, updateHeader } from "../controller/header.controller";

const headerRoutes = Router();

headerRoutes.get("/", getHeaders);
headerRoutes.get("/:id", getHeaderById);
headerRoutes.post("/", saveHeader);
headerRoutes.put("/:id", updateHeader);
headerRoutes.delete("/:id", deleteHeader);

export default headerRoutes;