import mongoose from "mongoose";

import { config } from "dotenv";
config()

export default async function connect() {
    const url = process.env.MONGO_URL;
    console.log(url)
    return await mongoose.connect(url!)
}