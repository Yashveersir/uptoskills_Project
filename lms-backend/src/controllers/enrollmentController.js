import {
    enrollCourseService,
    getMyCoursesService
} from "../services/enrollmentService.js";


// ENROLL COURSE
export const enrollCourseController = async (req, res, next) => {
    try {

        const { mentorId } = req.body;

        const enrollment = await enrollCourseService(
            req.user.id,
            req.params.courseId,
            mentorId
        );

        res.status(201).json({
            success: true,
            message: "Course enrolled successfully",
            enrollment
        });

    } catch (error) {
        next(error);
    }
};

// GET MY COURSES
export const getMyCoursesController = async (req, res, next) => {
    try {

        const courses = await getMyCoursesService(
            req.user.id
        );

        res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {
        next(error);
    }
};