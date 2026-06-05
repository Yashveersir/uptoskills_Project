import {
    exportUsersReportService,
    exportCoursesReportService,
    exportEnrollmentsReportService
} from "../services/reportService.js";


export const exportUsersReportController =
async (req, res, next) => {

    try {

        const csv =
            await exportUsersReportService();

        res.header(
            "Content-Type",
            "text/csv"
        );

        res.attachment("users-report.csv");

        return res.send(csv);

    } catch (error) {
        next(error);
    }
};


export const  exportCoursesReportController =
async (req, res, next) => {

    try {

        const csv =
            await  exportCoursesReportService();    

        res.header(
            "Content-Type",
            "text/csv"
        );

        res.attachment("users-report.csv");

        return res.send(csv);

    } catch (error) {
        next(error);
    }
};

export const exportEnrollmentsReportController =
async (req, res, next) => {

    try {

        const csv =
            await exportEnrollmentsReportService();

        res.header(
            "Content-Type",
            "text/csv"
        );

        res.attachment("users-report.csv");

        return res.send(csv);

    } catch (error) {
        next(error);
    }
};