import express,{Request,Response,NextFunction} from "express";
import {Login } from '../model/login';
import { User} from "../model/userModel";
import {v4 as uuidv4, validate} from "uuid";
import { createCourseSchema, options, updateCourseSchema } from "../utils/utils";
import mongoose from "mongoose";
import { title } from "process";

export async function Users(req:Request | any, res:Response, next:NextFunction) {
    const id = uuidv4()
    try{
        const verified = req.user
        const validateResult = createCourseSchema.validate(req.body,options)
        if(validateResult.error){
            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }
        const record = await Login.create({...req.body, userId:verified.id})
        res.status(201);
        res.json({
            message:"You have successfully enrolled your course.",
            record
        })
        // res.redirect('/users/dashboard')
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:'failed to create',
            route:'/create'

        })
    }

  }
  export async function getCourses(req:Request, res:Response, next:NextFunction){
    try{
        const limit = req.query.limit as number | undefined
        const offset = req.query.offset as number| undefined
        const record = await Login.find({});
        res.status(200);
        res.json({
            msg:"Here are your courses",
            count:record
        })
        // ('index', {
        //     title: "courses",
        //    message:'Here are your courses',
        //    data: record.rows
        // })
    }catch(error){
           res.status(500).json({
            msg:'failed to read all',
             route: '/getCourses'
           })
    }
  }

  export async function getOne(req:Request, res:Response, next:NextFunction){
    try{
      const { id } = req.params
      const record = await Login.findOne({id})
        res.status(200).json({
            msg:"Here is your course",
            record
        })
    }catch(error){
           res.status(500).json({
            msg:'failed to read single course',
            route: '/read/:id'

           })
    }
}

export async function UpdateCourses(req:Request, res:Response, next:NextFunction){
    try{
        const { id } = req.params
        // const id = req.params
        const {course,description,image,price} = req.body
        const validateResult = updateCourseSchema.validate(req.body,options)
        if(validateResult.error){
            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }
        const record = await Login.findByIdAndUpdate({id})
        if(!record){
            res.status(404).json({
                      Error:"cannot find course",
                })   
        }
        
         const updaterecord = await record?.update({
            course: course,
            description:description,
            image:image,
            price:price
         })
         res.status(200).json({
            message: 'you have successfully updated your course',
            record: updaterecord 
         })
        // res.redirect('/users/dashboard')
    }catch(error){
           res.status(500).json({
            msg:'failed to update',
            route: '/update/:id'

           })
    }
}

export async function DeleteCourses(req:Request, res:Response, next:NextFunction){
    try{
        const { id } = req.params
        const record = await Login.find({id})
        if(!record){
            res.status(404).json({
                message: "does not exist"
            })
        }
    //    const deletedRecord = await record?.delete();
    //    res.render("dashboardrefresh")
       res.status(200).json({
        msg: 'Course has been deleted successfully',
        record
       })
    }catch(error){
           res.status(500).json({
            msg:'failed to delete',
            route: '/delete/:id'

           })
    }
}

export async function getUniqueCourse(req:Request, res:Response, next:NextFunction){
    try{
      const id = req.params
      const record = await Login.findOne({id})
        res.status(200).json({
            msg:"Here is your course",
            record
        })
        // res.render('editcourse', {record:record})
    }catch(error){
           res.status(500).json({
            msg:'failed to read single course',
            route: '/read/:id'

           })
    }
}