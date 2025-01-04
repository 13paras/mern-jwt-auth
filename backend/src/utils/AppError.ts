import AppErrorCode from "@/constants/appErrorCode.js";
import type { HttpStatusCode } from "@/constants/http.js";

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,

    public message: string,

    public errorCode?: AppErrorCode
  ) {
    super(message);

    this.name = "AppError";

    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
