import { Schema, model } from "mongoose";

const SessionModel = new Schema({
  sessionID: {
    type: String,
    required: false,
  },
  isActive: {
    type: String,
    required: true,
  },
  lasLoggedIn: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: false,
  },
  browser: {
    type: String,
    required: false,
  },
  extraInfo: {
    type: Schema.Types.Mixed,
    required: false,
  },
});

export default model("Session", SessionModel);
