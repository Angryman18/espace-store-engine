import { Schema, model } from "mongoose";

const ResourceModel = new Schema({
  cid: {
    type: [Schema.Types.ObjectId],
    ref: "Container",
  },
});

export default model("Resource", ResourceModel);
