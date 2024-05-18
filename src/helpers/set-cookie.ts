import { Response } from "express";

export function setCookie(res: Response, value: Record<string, string>) {
  const inArr = Object.entries(value);
  inArr.forEach(([key, value]) => {
    res.cookie(key, value, { sameSite: "strict", maxAge: 3600 * 24 * 7 * 1000 });
  });
}
