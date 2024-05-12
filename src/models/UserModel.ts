import { model, Schema } from "mongoose";

const UserModel = new Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  resource: {
    type: Schema.Types.ObjectId,
    ref: "Resource",
    required: true,
  },
  space: {
    type: String,
    required: true,
  },
  usedSpace: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: true,
  },
  session: [
    {
      type: [Schema.Types.ObjectId],
      ref: "Session",
    },
  ],
});

export default model('User', UserModel)