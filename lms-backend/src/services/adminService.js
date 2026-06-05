import prisma from "../config/prisma.js";


// DASHBOARD STATS
export const getDashboardStatsService = async () => {

    const totalUsers = await prisma.user.count(
        {
            where: {
                role: "user"
            }
        }
    )
    const totalCourses = await prisma.course.count();

       const coursesWithLessonCount = await prisma.course.findMany({
        select: {
            id: true,
            title: true,
            _count: {
                select: {
                    lessons: true
                }
            }
        }
    });

    const totalEnrollments =
        await prisma.enrollment.count();

    return {
        totalUsers,
        totalCourses,
        coursesWithLessonCount,
        totalEnrollments
    };
};



// GET ALL USERS
export const getAllUsersService = async () => {

    const users = await prisma.user.findMany({
        where:{
            role: "user"
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            verified: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return users;
};


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
    });

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

// GET ALL COURSES
export const getAllCoursesAdminService = async () => {

    const courses = await prisma.course.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return courses;
};




// GET ALL ENROLLMENTS
export const getAllEnrollmentsService = async () => {

    const enrollments =
        await prisma.enrollment.findMany({
            include: {
                user: true,
                course: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

    return enrollments;
};

//SEARCH USERS


// SEARCH USERS
export const searchUsersService = async (query) => {

    const {
        keyword,
        role,
        page = 1,
        limit = 10
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const where = {
        AND: [
            keyword
                ? {
                    OR: [
                        {
                            name: {
                                contains: keyword,
                                mode: "insensitive"
                            }
                        },
                        {
                            email: {
                                contains: keyword,
                                mode: "insensitive"
                            }
                        }
                    ]
                }
                : {},
            role
                ? {
                    role: role
                }
                : {}
        ]
    };

    const users = await prisma.user.findMany({
        where,

        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            verified: true,
            avatar: true,
            createdAt: true,
            updatedAt: true
        },

        skip,
        take: limitNumber,

        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.user.count({
        where
    });

    return {
        users,
        total,
        page: pageNumber,
        totalPages: Math.ceil(total / limitNumber)
    };
};
