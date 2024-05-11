import { Schema, model } from "mongoose";

const URLModel = new Schema({
  type: {
    type: String,
    required: true,
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: "Files",
    required: false,
  },
  folder: {
    type: Schema.Types.ObjectId,
    ref: "Folders",
    required: false,
  },
});

export default model("URLModel", URLModel);
