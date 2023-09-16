import mongoose from "mongoose";
import bcrypt from "bcrypt"
import config from "config"
import { UserDocument } from "./user.model";

export interface SchemaDocument extends mongoose.Document{
    user:UserDocument['_id'];
    valid:Boolean;
    userAgent:String;
    createdAt:Date;
    updatedAt:Date;
}


const sessionSchema= new mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:'User'},
    valid:{type:Boolean,default:true},
    userAgent:{type:String}
},{
    timestamps:true
})


const SessionModel=mongoose.model<SchemaDocument>("Session",sessionSchema);

export default SessionModel