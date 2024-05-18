import { NextFunction, Request, Response } from "express";

import decodeJWT from "../helpers/jwt.js";
import { JsonWebTokenError } from "jsonwebtoken";

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = decodeJWT(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: (err as JsonWebTokenError).message });
  }
}
