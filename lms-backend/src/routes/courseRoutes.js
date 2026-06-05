import express from "express";

import {authMiddleware} from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

import {
    
    getAllCoursesController,
    getSingleCourseController,
    searchCoursesController
    
} from "../controllers/courseController.js";

const router = express.Router();




// SEARCH COURSES 
router.get("/search", searchCoursesController);


// GET ALL COURSES
router.get("/", getAllCoursesController);

// GET SINGLE COURSE
router.get("/:id", getSingleCourseController);


export default router;


//  Search courses

//  GET http://localhost:5000/api/courses/search?keyword=node
//  GET http://localhost:5000/api/courses/search?category=Backend
//  GET http://localhost:5000/api/courses/search?level=Intermediate
//  GET http://localhost:5000/api/courses/search?page=1&limit=5
//  GET http://localhost:5000/api/courses/search?keyword=node&category=Backend&page=1&limit=5