import AppErrorCode from "@/constants/appErrorCode.js";
import { UNAUTHORIZED } from "@/constants/http.js";
import appAssert from "@/utils/appAssert.js";
import { verifyToken } from "@/utils/jwt.js";
import type { RequestHandler } from "express";

const authenticate: RequestHandler = (req, _, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized!",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  (req as any).userId = payload.userId;
  (req as any).sessionId = payload.sessionId;
  next();
};
export { authenticate };
