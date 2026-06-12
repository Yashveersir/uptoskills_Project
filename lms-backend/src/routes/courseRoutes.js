<<<<<<< HEAD

import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

import {
    getAllCoursesController,
    getSingleCourseController,
    searchCoursesController
=======
import express from "express";

import {authMiddleware} from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

import {
    
    getAllCoursesController,
    getSingleCourseController,
    searchCoursesController
    
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
} from "../controllers/courseController.js";

const router = express.Router();

<<<<<<< HEAD
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course APIs
 */

/**
 * @swagger
 * /api/courses/search:
 *   get:
 *     summary: Search courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Courses found successfully
 */
router.get("/search", searchCoursesController);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get("/", getAllCoursesController);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get single course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course details
 *       404:
 *         description: Course not found
 */
router.get("/:id", getSingleCourseController);

export default router;

/*
Search Examples

GET http://localhost:5000/api/courses/search?keyword=node
GET http://localhost:5000/api/courses/search?category=Backend
GET http://localhost:5000/api/courses/search?level=Intermediate
GET http://localhost:5000/api/courses/search?page=1&limit=5
GET http://localhost:5000/api/courses/search?keyword=node&category=Backend&page=1&limit=5
*/
=======



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
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
