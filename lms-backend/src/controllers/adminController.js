import {
    getDashboardStatsService,
    getAllUsersService,
    getAllCoursesAdminService,
    getAllEnrollmentsService,
    searchUsersService,
    getUserAnalyticsService,
    getCourseAnalyticsService,
    getCompletionAnalyticsService,
    getPendingApprovalCountService
} from "../services/adminService.js";


// DASHBOARD
export const dashboardController = async (
    req,
    res,
    next
) => {
    try {

        const stats =
            await getDashboardStatsService();

        res.status(200).json({
            success: true,
            stats
        });

    } catch (error) {
        next(error);
    }
};


// GET USERS
export const getAllUsersController = async (
    req,
    res,
    next
) => {
    try {

        const users =
            await getAllUsersService();

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        next(error);
    }
};


// GET COURSES
export const getAllCoursesAdminController =
async (req, res, next) => {
    try {

        const courses =
            await getAllCoursesAdminService();

        res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {
        next(error);
    }
};


// GET ENROLLMENTS
export const getAllEnrollmentsController =
async (req, res, next) => {
    try {

        const enrollments =
            await getAllEnrollmentsService();

        res.status(200).json({
            success: true,
            enrollments
        });

    } catch (error) {
        next(error);
    }
};


// SEARCH USERS
export const searchUsersController = async (
    req,
    res,
    next
) => {
    try {

        const result =
            await searchUsersService(req.query);

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {
        next(error);
    }
};


// USER ANALYTICS
export const userAnalyticsController = async (
    req,
    res,
    next
) => {
    try {

        const analytics =
            await getUserAnalyticsService();

        res.status(200).json({
            success: true,
            analytics
        });

    } catch (error) {
        next(error);
    }
};


// COURSE ANALYTICS
export const courseAnalyticsController = async (
    req,
    res,
    next
) => {
    try {

        const analytics =
            await getCourseAnalyticsService();

        res.status(200).json({
            success: true,
            analytics
        });

    } catch (error) {
        next(error);
    }
};


// COMPLETION ANALYTICS
export const completionAnalyticsController =
async (req, res, next) => {

    try {

        const analytics =
            await getCompletionAnalyticsService();

        res.status(200).json({
            success: true,
            analytics
        });

    } catch (error) {
        next(error);
    }
};


// PENDING APPROVAL COUNT
export const pendingApprovalCountController =
async (req, res, next) => {

    try {

        const data =
            await getPendingApprovalCountService();

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        next(error);
    }
};



export const uploadLessonVideoController =
async (req, res, next) => {

    try {

        const { lessonId } = req.params;

        if (!req.file) {
            throw new Error("Video file is required");
        }

        const lesson =
            await uploadLessonVideoService(
                lessonId,
                req.file.path
            );

        res.status(200).json({
            success: true,
            message: "Video uploaded successfully",
            lesson
        });

    } catch (error) {
        next(error);
    }
};