import { Router } from "express"
import { userSignIn, userSignUp } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", userSignUp);
authRoutes.post("/signin", userSignIn);

export default authRoutes;