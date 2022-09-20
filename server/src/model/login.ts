import mongoose from "mongoose";
import db from "../config/database.config"
export interface LoginAttributes extends mongoose.Document{
    id:string;
    course:string;
    image:string;
    description:string;
    price:number;
    userId:string;
}


const LoginInstance = new mongoose.Schema({
    course:{type: String, required:true},
    image:{type: String, required:true},
    description:{type: String, required:true},
    price:{type: Number, required:true},
    userId:{type: String, required:false}
    
},
{
    timestamps:true
})
export const Login = mongoose.model('Login', LoginInstance);