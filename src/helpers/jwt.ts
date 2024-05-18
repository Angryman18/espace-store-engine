import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs";
import path from "path";

const publicKey = fs.readFileSync(path.resolve("publickey.pem"), { encoding: "utf8" });
export default function decodeJWT(token: string) {
  const verify = jwt.verify(token, publicKey) as JwtPayload;
  return verify;
}
