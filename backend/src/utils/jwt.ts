import { config } from "@/config/config.js";
import type { SessionDocument } from "@/models/session.model.js";
import type { UserDocument } from "@/models/user.model.js";
import jwt, { type SignOptions } from "jsonwebtoken";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: config.JWT_SECRET_KEY!,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: config.JWT_REFRESH_SECRET!,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...signOpts,
  });
};
