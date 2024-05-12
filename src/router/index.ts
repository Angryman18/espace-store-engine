import { handleAuth, handleCreateUser } from "../controller/authentication.js";
import express from "express";

const Router = express.Router();

Router.get("/verify", handleAuth);
Router.post("/signin", handleCreateUser);

export default Router;
