import { Schema, model } from "mongoose";

const FilesModel = new Schema({
  filePath: {
    type: String,
    required: true,
  },
  folderId: {
    type: Schema.Types.ObjectId,
    ref: "Folders",
    required: true,
  },
  cid: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: false,
  },
  tag: {
    type: [Schema.Types.ObjectId],
    ref: "Tag",
    required: false,
  },
  breadcrumbs: {
    type: String,
    required: true,
  },
});

export default model("Files", FilesModel);
