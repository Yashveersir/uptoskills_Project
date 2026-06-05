import prisma from "../config/prisma.js";

// CREATE LESSON
export const createLessonService = async (data) => {

    const {
        title,
        description,
        videoUrl,
        pdfUrl,
        duration,
        courseId
    } = data;

    if (!title || !videoUrl || !courseId) {
        throw new Error("Required fields are missing");
    }

    // Check course exists
    const course = await prisma.course.findUnique({
        where: {
            id: Number(courseId)
        }
    })

    if (!course) {
        throw new Error("Course not found");
    }

    const lesson = await prisma.lesson.create({
        data: {
            title,
            description,
            videoUrl,
            pdfUrl,
            duration,
            courseId: Number(courseId)
        }
    });

    return lesson;
};


// GET LESSONS BY COURSE
export const getLessonsByCourseService = async (courseId) => {

    const lessons = await prisma.lesson.findMany({
        where: {
            courseId: Number(courseId)
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    return lessons;
};


// SEARCH LESSONS
export const searchLessonsService = async (query) => {

    const {
        keyword,
        courseId,
        page = 1,
        limit = 10
    } = query;

    const skip = (Number(page) - 1) * Number(limit);

    const where = {
        AND: [
            keyword
                ? {
                    title: {
                        contains: keyword,
                        mode: "insensitive"
                    }
                }
                : {},
            courseId
                ? {
                    courseId: Number(courseId)
                }
                : {}
        ]
    };

    const lessons = await prisma.lesson.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.lesson.count({
        where
    });

    return {
        lessons,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit)
    };
};

