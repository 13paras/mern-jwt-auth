import { INTERNAL_SERVER_ERROR } from "@/constants/http.js";
import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error); // for debug info
  res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error!!");
  next();
};

export { errorHandler };
