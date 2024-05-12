import { Response, Request } from "express";
import wrapper from "../helpers/wrapper.js";
import CustomError from "../helpers/Error.js";
import request from "../helpers/request.js";
import { VERIFY_AUTH } from "../endpoints/endpoint.js";
import { AxiosResponse } from "axios";
import UserModel from "../models/UserModel.js";
import { TAuthResp } from "../types/index.js";
import ContainerModel from "../models/ContainerModel.js";
import FolderModel from "../models/FolderModel.js";

export const handleAuth = wrapper(async (req: Request, res: Response) => {
  // const token =
  //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZV91c2VybmFtZTEiLCJpYXQiOjE3MTU0OTM5MTQsImV4cCI6MTcxNjA5ODcxNH0.BDcp3oc97gBdxagGD08K-g-VrJX8ZClrVfQPBe_g7aAaFJ0Sag7Iy9Jjq2XNglsH4gUzi-PVAgYxb627nEyYiXEDKyl3pf3t40abf8MgOZxz3Jd4jebl_aTapqmqjtXsf2QU69vw1t9zrJUQebjnpQQegOIqDO2hTr0QCMkh93Ze3Mcq8wA50zhfl91ylpZrGLRwYzJsp9Zj7eMijQFe6tOdfEhOdZ4M7rwoxLOzbCIkoOnpl-usrvtkJpOyzeNV0tTjJh05ASXobTvh_nTAnyF9OVk1ynJMP0KHtg2LWvihcS3kWYjFPBunRZyt3J5y1uiMnqPlfcYUzSPp2K7g-w";
  const token = req.cookies?.token;
  console.log(req.cookies?.token);
  if (!token) throw new CustomError("Invalid Token", 400);
  try {
    const getUserInfo = await request.post<TAuthResp>(VERIFY_AUTH, { token });
    const isUserExist = await UserModel.findOne({ email: getUserInfo.data.email }).lean();
    if (isUserExist) {
      return res.status(200).json({ exist: true });
    } else {
      await createUserProfile(getUserInfo.data);
    }

    return res
      .status(200)
      .json({ message: "Auth Success", data: (getUserInfo as AxiosResponse).data });
  } catch (err) {
    return res.status(400).json({ message: "Auth Failed" });
  }
});

// export { handleAuth };

const createUserProfile = async (userInfo: TAuthResp) => {
  const user = new UserModel({
    fullname: userInfo.fullname,
    avatar: userInfo.avatar,
    id: userInfo.userId,
    provider: "",
    username: userInfo.username,
    email: userInfo.email,
  });
  const theUser = await user.save();

  const newContainer = new ContainerModel({
    fileCount: 0,
    folderCount: 1,
    uid: theUser.id,
    files: [],
    folders: [],
  });
  const container = await newContainer.save();
  const newFolder = await FolderModel.create({
    parent: null,
    createdAt: new Date().getTime(),
    breadcrumbs: "/",
    name: "root",
    cid: container._id,
  });
};
