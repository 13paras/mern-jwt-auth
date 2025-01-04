import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/constants/http.js";
import type { ErrorRequestHandler } from "express";
import { z } from "zod";
import type { Response } from "express";
import AppError from "@/utils/AppError.js";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error); // for debug info

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }
  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  res.status(INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!!",
    error: error,
  });
  next();
};

export { errorHandler };
