import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from "@/controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

// prefix: /auth

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.get("/refresh", refreshHandler);
authRouter.get("/logout", logoutHandler);

export { authRouter };
