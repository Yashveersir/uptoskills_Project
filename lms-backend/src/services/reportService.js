import prisma from "../config/prisma.js";
import { Parser } from "json2csv";

export const exportUsersReportService = async () => {

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            verified: true,
            createdAt: true
        }
    });

    const parser = new Parser();

    return parser.parse(users);
};


export const exportCoursesReportService = async () => {

    const courses = await prisma.course.findMany({
        select: {
            id: true,
            title: true,
            category: true,
            level: true,
            status: true,
            createdAt: true
        }
    });

    const parser = new Parser();

    return parser.parse(courses);
};


export const exportEnrollmentsReportService =
async () => {

    const enrollments =
        await prisma.enrollment.findMany({
            include: {
                user: true,
                course: true
            }
        });

    const formatted =
        enrollments.map(e => ({
            enrollmentId: e.id,
            userName: e.user.name,
            userEmail: e.user.email,
            courseTitle: e.course.title,
            enrolledAt: e.createdAt
        }));

    const parser = new Parser();

    return parser.parse(formatted);
};