import { CREATED, OK, UNAUTHORIZED } from "@/constants/http.js";
import SessionModel from "@/models/session.model.js";
import { loginSchema, registerSchema } from "@/schemas/auth.schema.js";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
} from "@/services/auth.service.js";
import appAssert from "@/utils/appAssert.js";
import catchErrors from "@/utils/catchErrors.js";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "@/utils/cookies.js";
import { verifyToken } from "@/utils/jwt.js";
import { z } from "zod";

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate Response
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // Call service
  const { accessToken, refreshToken } = await loginUser(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login Successful",
  });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  clearAuthCookies(res);
  res.status(OK).json({ message: "Logout Successful" });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = (req.cookies.refreshToken as string) || undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing Refresh Token");

  // call a service
  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({
      message: "Access token refreshed",
    });
});
