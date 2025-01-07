import {
  deleteSessionHandler,
  getSessionsHandler,
} from "@/controllers/session.controller.js";
import { Router } from "express";

const sessionRouter = Router();

sessionRouter.get("/", getSessionsHandler);
sessionRouter.delete("/:id", deleteSessionHandler);

export { sessionRouter };
