import assert from "node:assert";
import AppError from "./AppError.js";
import type { HttpStatusCode } from "@/constants/http.js";
import type AppErrorCode from "@/constants/appErrorCode.js";

type AppAssertParams = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

/* 
* Asserts a condition and throws an AppError if the condition is falsy.
/ */

const appAssert: AppAssertParams = (
  condition: any,
  httpStatusCode,
  message,
  appErrorCode
) => {
  assert(condition, new AppError(httpStatusCode, message, appErrorCode));
};

export default appAssert;
