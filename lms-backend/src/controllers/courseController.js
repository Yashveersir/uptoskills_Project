import {
    createCourseService,
    deleteCourseService,
    getAllCoursesService,
    getSingleCourseService,
    updateCourseService,
    getPendingCoursesService,
    approveCourseService,
    rejectCourseService,
    getPendingCoursesCountService
} from "../services/courseService.js";


// CREATE COURSE(ADMIN ONLY)
export const createCourseController = async (req, res, next) => {
    try {

        const course = await createCourseService(req.body);

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course
        });

    } catch (error) {
        next(error);
    }
};



// GET ALL COURSES
export const getAllCoursesController = async (req, res, next) => {
    try {

        const courses = await getAllCoursesService();

        res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {
        next(error);
    }
};



// GET SINGLE COURSE
export const getSingleCourseController = async (req, res, next) => {
    try {

        const course = await getSingleCourseService(req.params.id);

        res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        next(error);
    }
};

import { searchCoursesService } from "../services/courseService.js";

// SEARCH COURSES
export const searchCoursesController = async (req, res, next) => {
    try {

        const result = await searchCoursesService(req.query);

            res.status(200).json({
                success: true,
                ...result
});

    } catch (error) {
        next(error);
    }
};

// UPDATE COURSE

export const updateCourseController=async (req,res,next)=>{

    try {
         const course= await updateCourseService(
            req.params.id,
            req.body
         );

         res.status(200).json({
            success:true,
            message:"Record updated successfully",
            course
         });
        
    } catch (error) {
        next(error);
    }
};

// DELETE COURSE

export const deleteCourseController= async( req,res,next)=>{
    try {
         await deleteCourseService(req.params.id);

         res.status(200).json({
            success:true,
            message:"Course deleted successfully"
         })
    } catch (error) {
        next(error);
    }
}

// GET PENDING COURSES

export const getPendingCoursesController=async (req,res,next)=>{
    try {
        const courses=await getPendingCoursesService();

        res.status(200).json({
            success:true,
            courses
        });
    } catch (error) {
        next(error);
    }
};

// APPROVE COURSE

export const approveCourseController=async (req,res,next)=>{
    try {
        const course=await approveCourseService(req.params.id);
        res.status(200).json({
            success:true,
            message:"Course approved ",
            course
        });
    } catch (error) {
        next(error);
    }   
};


// REJECT COURSE

export const rejectCourseController=async (req,res,next)=>{
    try {
        const course=await rejectCourseService(req.params.id);
        res.status(200).json({
            success:true,
            message:"Course rejected",
            course
        });
    } catch (error) {
        next(error);
    }
};

// GET PENDING COURSE 

export const getPendingCourseController=async (req,res,next)=>{
    try {
        const course=await getPendingCoursesCountService();
        res.status(200).json({
            success:true,
            course
        });
    } catch (error) {
        next(error);
    }
};