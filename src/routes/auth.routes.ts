import { Router } from "express";
import { signinHandler, registerHandler } from "../controllers/auth.controller";
import { registerValidation } from "../validations/auth.validations";

const authRouter = Router();

authRouter.post("/register", registerValidation, registerHandler);

authRouter.post("/signin", signinHandler);

export default authRouter;