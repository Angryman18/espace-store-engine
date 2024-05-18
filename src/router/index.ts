import { handleAuth, handleSignIn } from "../controller/authentication.js";
import express from "express";
import { getUserInformations } from "../controller/user-controller.js";
import AuthMiddleware from "../middleware/auth.js";

const Router = express.Router();

Router.post("/verify", handleAuth);
Router.post("/signin", handleSignIn);
Router.post("/user-info", AuthMiddleware, getUserInformations);

export default Router;
