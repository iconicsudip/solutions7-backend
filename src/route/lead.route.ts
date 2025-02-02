import { Router } from "express"
import { getAllLeads, addNewLead } from "../controller/lead.controller";

const leadRoutes = Router();
leadRoutes.get("/", getAllLeads);
leadRoutes.post("/add-lead", addNewLead);

export default leadRoutes;