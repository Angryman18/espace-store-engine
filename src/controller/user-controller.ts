import { Response, Request } from "express";
import wrapper from "../helpers/wrapper.js";
import decodeJWT from "../helpers/jwt.js";
import UserModel from "../models/UserModel.js";

export const getUserInformations = wrapper(async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  const decode = decodeJWT(token);
  const username = decode.username;
  const findUser = await UserModel.findOne({ username }).lean();
  res.status(200).json({ ...findUser });
});
