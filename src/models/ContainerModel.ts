import { Schema, model } from "mongoose";

const ContainerModel = new Schema({
  files: {
    type: [Schema.Types.ObjectId],
    ref: "Files",
  },
  folders: {
    type: [Schema.Types.ObjectId],
    ref: "Folders",
    required: true
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
  },
});


export default model('Container', ContainerModel)