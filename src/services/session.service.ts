import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SchemaDocument } from "../models/session.model";
import { get } from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from "config"


export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent })
    return session.toJSON();
}


export async function findSession(query: FilterQuery<SchemaDocument>) {
    return await SessionModel.find(query).lean();
}


export async function updateSession(
    query: FilterQuery<SchemaDocument>,
    update: UpdateQuery<SchemaDocument>) {
    return SessionModel.updateOne(query, update);
}

export const reIssueAccessToken= async({refreshToken}:{refreshToken:string}) => {
    
    const {decoded}= await verifyJwt(refreshToken)
    
    if(!decoded || !get(decoded,'session')) return false

    const session = await SessionModel.findById(get(decoded,"session"))

    if(!session || !session.valid) return false;

    const user= await findUser({_id:session.user})

    if(!user) return false

    const accessToken=signJwt(
        {...user,session:session._id},
        {expiresIn: config.get<number>("accessTokenTtl")}
    )

    return accessToken

}

