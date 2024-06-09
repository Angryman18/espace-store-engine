import { NextFunction, Request, Response } from "express";

import decodeJWT from "../helpers/jwt.js";
import { JsonWebTokenError } from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { TUserModel } from "../types/index.js";
import { redisGet, redisSet } from "../helpers/redis-utils.js";

export default async function AuthMiddleware(
  req: Request & { user?: TUserModel },
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = decodeJWT(token);
    const findUser = await redisGet<TUserModel>(`user:${decode.username}`);
    if (!findUser) {
      const [getUser] = await UserModel.find({ username: decode.username }, { __v: 0 }).lean();
      await redisSet(`user:${decode.username}`, getUser);
      req.user = getUser;
    } else req.user = findUser!;
    next();
  } catch (err) {
    return res.status(401).json({ error: (err as JsonWebTokenError).message });
  }
}
