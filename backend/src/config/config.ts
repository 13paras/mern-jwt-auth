import { configDotenv } from "dotenv";

configDotenv();

// "_" this is to tell  that it is a private variable
const _config = {
  PORT: process.env.PORT || 6969,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BASE_URL: process.env.BASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  LOCAL_BASE_URL: process.env.LOCAL_BASE_URL,
};

export const config = Object.freeze(_config); // it means it is read only and with freeze we can't do anything with this
