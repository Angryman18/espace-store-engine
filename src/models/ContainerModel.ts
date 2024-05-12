import { Schema, model } from "mongoose";

const ContainerModel = new Schema({
  files: {
    type: [Schema.Types.ObjectId],
    ref: "Files",
  },
  folders: {
    type: [Schema.Types.ObjectId],
    ref: "Folders",
    required: true,
  },
  fileCount: {
    type: Number,
    required: true,
  },
  folderCount: {
    type: Number,
    required: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const NosOfFolder = ContainerModel.virtual("noOfFolders");
const NosOfFiles = ContainerModel.virtual("noOfFiles");
NosOfFiles.get(function () {
  return this.files.length;
});
NosOfFolder.get(function () {
  return this.folders.length;
});

export default model("Container", ContainerModel);
