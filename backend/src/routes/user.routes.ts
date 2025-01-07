import { getUserHandler } from "@/controllers/user.controller.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);

export { userRoutes };
