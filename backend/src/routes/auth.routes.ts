import {
  loginHandler,
  registerHandler,
} from "@/controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

// prefix: /auth

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);

export { authRouter };
