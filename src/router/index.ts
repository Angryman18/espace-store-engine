import { handleCreateProfile, handleSignIn } from "../controller/authentication.js";
import express from "express";
import { getUserInformations } from "../controller/user-controller.js";
import AuthMiddleware from "../middleware/auth.js";
import { getFileAndFolder } from "../controller/file-folder-controller.js";

const Router = express.Router();

Router.post("/create-profile", AuthMiddleware, handleCreateProfile);
Router.post("/signin", handleSignIn);
Router.post("/user-info", AuthMiddleware, getUserInformations);
Router.post("/user-content", AuthMiddleware, getFileAndFolder);

export default Router;
