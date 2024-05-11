import { handleAuth } from "../controller/authentication.js";
import express from "express";

const Router = express.Router();

Router.get("/verify", handleAuth);

export default Router;
