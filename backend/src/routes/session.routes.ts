import { getSessionsHandler } from "@/controllers/session.controller.js";
import { Router } from "express";

const sessionRouter = Router();

sessionRouter.get("/", getSessionsHandler);

export { sessionRouter };
