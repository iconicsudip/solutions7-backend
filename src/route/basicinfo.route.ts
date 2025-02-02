import { Router } from "express"
import { getBasicInfos, upsertBasicInfo } from "../controller/basicinfo.controller";

const basicInfoRoutes = Router();
basicInfoRoutes.get("/", getBasicInfos);
basicInfoRoutes.post("/upsert", upsertBasicInfo);

export default basicInfoRoutes;