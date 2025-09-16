import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app } from "./socketIO/server.js";
// const app = express();
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

import userRouter from "./routes/user.router.js";
import msgRouter from "./routes/msg.router.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/msg", msgRouter);

export { app };
