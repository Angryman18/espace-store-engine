import { Request } from "express";
import { Types } from "mongoose";

export type TAuthResp = {
  fullname: string;
  username: string;
  email: string;
  userId: string;
  avatar: string | null;
};

export type TReq<T = any> = Request<{}, {}, T>;

export type TUserModel = {
  id: string;
  email: string;
  fullname: string;
  username: string;
  profile: Types.ObjectId | null;
  avatar?: string | null | undefined;
  provider?: string | null | undefined;
};
