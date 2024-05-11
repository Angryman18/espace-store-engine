import { Response } from "express";
import wrapper from "../helpers/wrapper.js";

export const handleAuth = wrapper(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Auth Success" });
});

// export { handleAuth };
