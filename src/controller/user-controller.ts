import { Response, Request } from "express";
import wrapper from "../helpers/wrapper.js";
import decodeJWT from "../helpers/jwt.js";
import UserModel from "../models/UserModel.js";
import client from "../service/redisClient.js";

export const getUserInformations = wrapper(async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  const decode = decodeJWT(token);
  const username = decode.username;
  const isExist = await client.get(`user:${username}`);
  if (isExist) {
    return res.status(200).json({ ...JSON.parse(isExist) });
  }
  const findUser = await UserModel.findOne({ username }).lean();
  await client.set(`user:${username}`, JSON.stringify(findUser));
  res.status(200).json({ ...findUser });
});
