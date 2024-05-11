import { Schema, model } from "mongoose";

const TagModel = new Schema({
  tagname: {
    type: String,
    required: true,
  },
});

export default model("Tag", TagModel);
