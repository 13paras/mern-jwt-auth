import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import morgan from "morgan";
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
app.use(morgan("dev"));

// serve the static files from the react app
app.use(express.static(path.join(__dirname, "../../frontend/dist")))

// Handle requests by serving index.html for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", 'index.html'))
})

app.get("/health", async (_, res) => {
  res.status(OK).json({ message: "Namaste Everyone", status: "Healthy" });
});

import { authRouter } from "./routes/auth.routes.js";
import { authenticate } from "./middleware/authenticate.middleware.js";
import { userRoutes } from "./routes/user.routes.js";
import { sessionRouter } from "./routes/session.routes.js";
import path from "node:path";

// auth routes
app.use("/auth", authRouter);

// protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRouter);

app.use(errorHandler);

export { app };
