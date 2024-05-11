import { NextFunction, Request, Response } from "express";

import fs from "fs";
import path from "path";

const getPublicKey = fs.readFileSync(path.resolve("publickey.pem"), { encoding: "utf8" });

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.cookies);
  next();
}
