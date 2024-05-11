import { Schema, model } from "mongoose";

const PermissonModel = new Schema({
  type: {
    type: String,
    required: true,
  },
  destinationId: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
    default: "R",
  },
});


export default model('Permission', PermissonModel)