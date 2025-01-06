import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  sendPasswordResetHandler,
  verifyEmailHandler,
} from "@/controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

// prefix: /auth

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.get("/refresh", refreshHandler);
authRouter.get("/logout", logoutHandler);
authRouter.get("/email/verify/:code", verifyEmailHandler);
authRouter.post("/password/forgot", sendPasswordResetHandler);

export { authRouter };
