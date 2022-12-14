"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueCourse = exports.DeleteCourses = exports.UpdateCourses = exports.getOne = exports.getCoursesForUser = exports.getCourses = exports.Users = void 0;
const login_1 = require("../model/login");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
async function Users(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const verified = req.user;
        const validateResult = utils_1.createCourseSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const record = await login_1.Login.create({ ...req.body, userId: verified.id });
        // res.status(201);
        // res.json({
        //     message:"You have successfully enrolled your course.",
        //     record
        // })
        res.redirect('/users/dashboard');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        });
    }
}
exports.Users = Users;
async function getCourses(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const record = await login_1.Login.find({});
        res.status(200);
        res.json({
            msg: "Here are your courses",
            count: record
        });
        // ('index', {
        //     title: "courses",
        //    message:'Here are your courses',
        //    data: record.
        // })
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to read all',
            route: '/getCourses'
        });
    }
}
exports.getCourses = getCourses;
async function getCoursesForUser(req, res, next) {
    try {
        // let userID = req.user.id
        // const limit = req.query.limit as number | undefined
        // const offset = req.query.offset as number| undefined
        const record = await login_1.Login.find({});
        res.status(200);
        res.json({
            msg: "Here are your courses",
            count: record
        });
        // ('index', {
        //     title: "courses",
        //    message:'Here are your courses',
        //    data: record.
        // })
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to read all',
            route: '/getCourses'
        });
    }
}
exports.getCoursesForUser = getCoursesForUser;
async function getOne(req, res, next) {
    try {
        const { id } = req.params;
        const record = await login_1.Login.findOne({ id });
        res.status(200).json({
            msg: "Here is your course",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to read single course',
            route: '/read/:id'
        });
    }
}
exports.getOne = getOne;
async function UpdateCourses(req, res, next) {
    try {
        const { id } = req.params;
        // const id = req.params
        const { course, description, image, price } = req.body;
        const validateResult = utils_1.updateCourseSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const record = await login_1.Login.findById(id);
        if (!record) {
            res.status(404).json({
                Error: "cannot find course",
            });
        }
        const updaterecord = await login_1.Login.findByIdAndUpdate(id, {
            course: course,
            description: description,
            image: image,
            price: price
        }, { new: true });
        //  res.status(200).json({
        //     message: 'you have successfully updated your course',
        //     record: updaterecord 
        //  })
        res.redirect('/users/dashboard');
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to update',
            route: '/update/:id'
        });
    }
}
exports.UpdateCourses = UpdateCourses;
async function DeleteCourses(req, res, next) {
    try {
        const { id } = req.params;
        const record = await login_1.Login.findById(id);
        if (!record) {
            res.status(404).json({
                message: "does not exist"
            });
        }
        await login_1.Login.findByIdAndDelete(id);
        //    const deletedRecord = await record?.delete();
        res.render("dashboardrefresh");
        //    res.status(200).json({
        //     msg: 'Course has been deleted successfully',
        //     record
        //    })
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to delete',
            route: '/delete/:id'
        });
    }
}
exports.DeleteCourses = DeleteCourses;
async function getUniqueCourse(req, res, next) {
    try {
        const id = req.params;
        const record = await login_1.Login.findOne({ id });
        // res.status(200).json({
        //     msg:"Here is your course",
        //     record
        // })
        res.render('editcourse', { record: record });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to read single course',
            route: '/read/:id'
        });
    }
}
exports.getUniqueCourse = getUniqueCourse;
