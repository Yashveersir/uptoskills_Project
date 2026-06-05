import {
    markLessonCompleteService,
    getCourseProgressService,
    updateLessonTimeService
} from "../services/progressService.js";


// MARK COMPLETE
export const markLessonCompleteController = async (
    req,
    res,
    next
) => {
    try {

        const progress =
            await markLessonCompleteService(
                req.user.id,
                req.params.lessonId
            );

        res.status(200).json({
            success: true,
            message: "Lesson marked completed",
            progress
        });

    } catch (error) {
        next(error);
    }
};




// GET COURSE PROGRESS
export const getCourseProgressController = async (
    req,
    res,
    next
) => {
    try {

        const progress =
            await getCourseProgressService(
                req.user.id,
                req.params.courseId
            );

        res.status(200).json({
            success: true,
            progress
        });

    } catch (error) {
        next(error);
    }
};



// UPDATE TIME SPENT
export const updateLessonTimeController = async (
    req,
    res,
    next
) => {
    try {

        const { timeSpent } = req.body;

        const progress =
            await updateLessonTimeService(
                req.user.id,
                req.params.lessonId,
                timeSpent
            );

        res.status(200).json({
            success: true,
            message: "Time updated",
            progress
        });

    } catch (error) {
        next(error);
    }
};