import { model, Schema } from "mongoose";
import { TUserModel } from "../types/index.js";

const UserModel = new Schema<TUserModel>({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: false,
  },
  profile: {
    type: Schema.Types.ObjectId || null,
    default: null,
    ref: "Profile",
  },
});

export default model("User", UserModel);
