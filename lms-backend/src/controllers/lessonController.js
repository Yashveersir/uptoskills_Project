import {
    createLessonService,
    getLessonsByCourseService
} from "../services/lessonService.js";


// CREATE LESSON
export const createLessonController = async (req, res, next) => {
    try {

        const lesson = await createLessonService(req.body);

        res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            lesson
        });

    } catch (error) {
        next(error);
    }
};



// GET LESSONS BY COURSE
export const getLessonsByCourseController = async (req, res, next) => {
    try {

        const lessons = await getLessonsByCourseService(req.params.courseId);

        res.status(200).json({
            success: true,
            lessons
        });

    } catch (error) {
        next(error);
    }
};

// SEARCH LESSONS

export const searchLessonsController = async (req, res, next) => {
    try {
        const result = await searchLessonsService(req.query);

        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};

