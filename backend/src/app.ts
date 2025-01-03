import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import catchErrors from "./utils/catchErrors.js";
import { OK } from "./constants/http.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.BASE_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.get(
  "/health", async (req, res, next) => {
    res.status(OK).json({ message: "Namaste Everyone", status: "healthy" });
  }
);

app.use(errorHandler);

export { app };
