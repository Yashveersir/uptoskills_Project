import {
    getDashboardStatsService,
    getAllUsersService,
    getAllCoursesAdminService,
    getAllEnrollmentsService,
    searchUsersService
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

        const users = await getAllUsersService();

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