import { Request, Response } from "express";
import wrapper from "../helpers/wrapper.js";
import decodeJWT from "../helpers/jwt.js";
import UserModel from "../models/UserModel.js";
import client from "../service/redisClient.js";




export const getFileAndFolder = wrapper(async (req: Request, res: Response) => {
    const payload = decodeJWT(req.cookies?.token)

    let user = await client.get(`user:${payload.username}`)
    if (!user) {
        user = await UserModel.findOne({ username: payload.username }).lean();
    }

    res.status(200).json(user)
})