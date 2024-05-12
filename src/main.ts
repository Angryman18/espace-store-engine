import express from "express";
import connect from "./conect.js";
import AuthMiddleware from "./middleware/auth.js";
import morgan from "morgan";
import { config } from "dotenv";
config();
import Router from "./router/index.js";
import cookieparser from 'cookie-parser'

const app = express();

const isDev = process.env.ENV === "dev";

app.use(express.json());
app.use(cookieparser())
app.use(morgan(isDev ? "dev" : "combined"));

app.use("/v1", Router);
app.get("/", AuthMiddleware, (req, res) => {
  res.status(200).json({ message: "Server is running." });
});

connect().then(() => {
  app.listen(5000, () => console.log("Server Running at 5000"));
});
