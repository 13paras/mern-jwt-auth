import { configDotenv } from "dotenv";

configDotenv();

// "_" this is to tell  that it is a private variable
const _config = {
  PORT: process.env.PORT || 6969,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BASE_URL: process.env.BASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

export const config = Object.freeze(_config); // it means it is read only and with freeze we can't do anything with this
