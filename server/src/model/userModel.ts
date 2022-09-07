// import { StringRegexOptions } from "joi";
import mongoose from "mongoose";
import db from "../config/database.config"

export interface UserAttributes extends mongoose.Document{
    id:string;
    fullname: string;
    address:string;
    email:string;
    phonenumber:string;
    password:string;
}



const UserInstance = new mongoose.Schema({
    fullname:{type: String, required:true},
    address:{type: String, required:true, unique:true},
    email:{type: String, required:true, unique:true},
    phonenumber:{type: String, required:true,},
    password:{type: String, required:true},
},{
    timestamps:true
});

export const User = mongoose.model<UserAttributes>('User', UserInstance);
