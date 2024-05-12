import { Response, Request } from "express";
import wrapper from "../helpers/wrapper.js";
import CustomError from "../helpers/Error.js";
import request from "../helpers/request.js";
import { VERIFY_AUTH } from "../endpoints/endpoint.js";
import { AxiosResponse } from "axios";
import UserModel from "../models/UserModel.js";
import { TAuthResp, TReq, TUserModel } from "../types/index.js";
import ContainerModel from "../models/ContainerModel.js";
import FolderModel from "../models/FolderModel.js";
import ResourceModel from "../models/ResourceModel.js";
import SessionModel from "../models/SessionModel.js";
import ProfileModel from "../models/ProfileModel.js";
import decodeJWT from "../helpers/jwt.js";
import { FlattenMaps, Schema, Types } from "mongoose";

export const handleCreateUser = wrapper(async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) throw new CustomError("No Token provided", 400);
  const getUserInfo = await request.post<TAuthResp>(VERIFY_AUTH, { token });
  const isUserExist = await UserModel.findOne({ email: getUserInfo.data.email }).lean();
  if (isUserExist) {
    return res.status(200).json({ user: "Already Exists" });
  } else {
    const userCreate = await UserModel.create({
      fullname: getUserInfo.data.fullname,
      email: getUserInfo.data.email,
      avatar: getUserInfo.data.avatar,
      username: getUserInfo.data.username,
      id: getUserInfo.data.userId,
      provider: "N/A",
      profile: null,
    });
    res.cookie("token", token, { sameSite: "strict", maxAge: 3600 * 24 * 7 * 1000 });
    return res.status(200).json({ ...userCreate.toObject() });
  }
});

export const handleAuth = wrapper(async (req: TReq, res: Response) => {
  try {
    const getData = decodeJWT(req.cookies?.token);
    const findUser = await UserModel.findOne({ username: getData.username }).lean();
    const newUser = await createUserProfile(findUser!);
    return res.status(200).json({ message: "Auth Success", data: newUser });
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message ?? "Auth Failed" });
  }
});

const createUserProfile = async (userInfo: TUserModel & { _id: Types.ObjectId }) => {
  // CREATE CONTAINER
  const newContainer = new ContainerModel({
    fileCount: 0,
    folderCount: 1,
    files: [],
    folders: [],
  });
  const container = await newContainer.save();
  // CREATE RESOURCE
  const newResource = await ResourceModel.create({
    cid: container._id,
  });
  // CREATE A FOLDER
  const newFolder = await FolderModel.create({
    parent: "/",
    createdAt: new Date().getTime(),
    breadcrumbs: "/",
    name: "root",
    cid: container._id,
  });

  // UPDATE CONTAINER WITH THE ROOT FOLDER
  await ContainerModel.findOneAndUpdate(
    { _id: container._id },
    {
      $push: { folders: newFolder },
    },
    {
      new: true,
    }
  );

  // CREATE A SESSION
  const newSession = await SessionModel.create({
    isActive: true,
    lasLoggedIn: "abcd",
  });

  // CREATE THE USER

  const profile = await ProfileModel.create({
    resource: newResource._id,
    session: [newSession._id],
    space: "1024 MB",
    usedSpace: "0 MB",
    userId: userInfo._id,
  });

  // UPDATE NEW USER PROFILE
  const newUser = await UserModel.findOneAndUpdate(
    { _id: userInfo._id },
    { $set: { profile: profile._id } },
    { new: true }
  ).lean();
  // UPDATE THE CONTAINER WITH THE USERID
  await ContainerModel.findOneAndUpdate({ _id: container._id }, { $set: { uid: userInfo._id } });
  return newUser;
};
