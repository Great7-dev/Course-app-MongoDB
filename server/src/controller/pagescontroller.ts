import express,{Request,Response,NextFunction} from "express";
import {Login} from '../model/login';
import { User } from "../model/userModel";
import {v4 as uuidv4, validate} from "uuid";
import { createCourseSchema, options, updateCourseSchema } from "../utils/utils";

export async function Homepage(req:Request, res:Response, next:NextFunction){
    try{
        const limit = req.query.limit as number | undefined
        const offset = req.query.offset as number| undefined
        const record = await Login.find({})
        res.status(200);
        res.render('index', {
            title: "courses",
           message:'Here are your courses',
           data: record
        })
    }catch(error){
           res.status(500).json({
            msg:'failed to read all',
             route: '/getCourses'
           })
    }
  }