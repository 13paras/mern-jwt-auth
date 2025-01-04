import { config } from "@/config/config.js";
import { CONFLICT } from "@/constants/http.js";
import VerificationCodeType from "@/constants/verificationCodeTypes.js";
import SessionModel from "@/models/session.model.js";
import UserModel from "@/models/user.model.js";
import VerificationCodeModel from "@/models/verificationCode.model.js";
import appAssert from "@/utils/appAssert.js";
import { oneYearFromNow } from "@/utils/date.js";
import jwt from "jsonwebtoken";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify existing user doesn't exist
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(!existingUser, CONFLICT, "Email already in use");

  /* if (existingUser) {
    throw new Error("User already exists");
  } */

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email
  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // sign access token & refresh Token
  const refreshToken = jwt.sign(
    {
      sessionId: session._id,
    },
    config.JWT_REFRESH_SECRET as string,
    {
      audience: ["user"],
      expiresIn: "30d",
    }
  );
  const accessToken = jwt.sign(
    {
      sessionId: session._id,
    },
    config.JWT_SECRET_KEY as string,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );

  // return user & token

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
