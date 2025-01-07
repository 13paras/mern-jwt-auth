import { CREATED, OK, UNAUTHORIZED } from "@/constants/http.js";
import SessionModel from "@/models/session.model.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from "@/schemas/auth.schema.js";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
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

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  await verifyEmail(verificationCode);

  return res.status(OK).json({ message: "Email was successfully verified" });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await sendPasswordResetEmail(email);

  return res.status(OK).json({ message: "Password reset email sent" });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);

  await resetPassword(request);

  clearAuthCookies(res);
  res.status(OK).json({ message: "Password was reset successfully" });
});
