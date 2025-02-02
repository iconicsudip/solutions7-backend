import { Router } from "express"
import { allServices, createService, deleteService, getService, updateService } from "../controller/service.controller";

const serviceRoutes = Router();

serviceRoutes.get("/", allServices);
serviceRoutes.post("/add-service", createService);
serviceRoutes.delete("/delete-service/:id", deleteService);
serviceRoutes.get("/:id", getService);
serviceRoutes.put("/update-service/:id", updateService);

export default serviceRoutes;