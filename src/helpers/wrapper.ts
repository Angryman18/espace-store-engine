import { NextFunction, Response } from "express";
import CustomError from "./Error.js";

type Callback = (...args: any[]) => Promise<void | Response>;

export default function wrapper(func: Callback) {
  return async function (...args: any[]) {
    try {
      await func(...args);
    } catch (err) {
      const res = args[1];
      if (err instanceof CustomError) {
        return res.status(err.status ?? 500).json({
          error: err.message,
        });
      } else {
        return res.status(500).json({
          error: (err as Error).message ?? "Something went wrong",
        });
      }
    }
  };
}
