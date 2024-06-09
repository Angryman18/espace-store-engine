import { Response } from "express";
import wrapper from "../helpers/wrapper.js";
import { AuthRequest } from "../types/index.js";
import FolderModel from "../models/FolderModel.js";

export const getFileAndFolder = wrapper(async (req: AuthRequest, res: Response) => {
  const user = req.user;
    // const getFolders = await FolderModel.find()
  res.status(200).json(user);
});
