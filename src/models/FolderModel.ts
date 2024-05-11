import { Schema, model } from "mongoose";

const FoldersModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  cid: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
    set: () => new Date().getTime(),
  },
  breadcrumbs: {
    type: String,
    required: true,
  },
});

export default model("Folders", FoldersModel);
