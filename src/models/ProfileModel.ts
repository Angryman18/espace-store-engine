import { Schema, model } from "mongoose";

const ProfileModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  session: {
    type: [Schema.Types.ObjectId],
    ref: "Session",
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
});

export default model("Profile", ProfileModel);
