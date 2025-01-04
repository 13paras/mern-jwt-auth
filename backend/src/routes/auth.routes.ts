import { registerHandler } from "@/controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

// prefix: /auth

authRouter.post("/register", registerHandler);

export { authRouter };
