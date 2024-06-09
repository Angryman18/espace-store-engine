import { Response } from "express";
import wrapper from "../helpers/wrapper.js";
// import decodeJWT from "../helpers/jwt.js";
// import UserModel from "../models/UserModel.js";
// import client from "../service/redisClient.js";
import { AuthRequest } from "../types/index.js";

export const getUserInformations = wrapper(async (req: AuthRequest, res: Response) => {
  const findUser = req.user;
  res.status(200).json({ ...findUser });
});
