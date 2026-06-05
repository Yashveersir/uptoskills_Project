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


export const getUserAnalyticsService = async () => {

    const totalUsers = await prisma.user.count({
        where: {
            role: "user"
        }
    });

    const verifiedUsers = await prisma.user.count({
        where: {
            role: "user",
            verified: true
        }
    });

    const unverifiedUsers = await prisma.user.count({
        where: {
            role: "user",
            verified: false
        }
    });

    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const newUsersThisMonth = await prisma.user.count({
        where: {
            role: "user",
            createdAt: {
                gte: currentMonth
            }
        }
    });

    return {
        totalUsers,
        verifiedUsers,
        unverifiedUsers,
        newUsersThisMonth
    };
};

export const getCourseAnalyticsService = async () => {

    const totalCourses = await prisma.course.count();

    const approvedCourses = await prisma.course.count({
        where: {
            status: "APPROVED"
        }
    });

    const pendingCourses = await prisma.course.count({
        where: {
            status: "PENDING"
        }
    });

    const rejectedCourses = await prisma.course.count({
        where: {
            status: "REJECTED"
        }
    });

    const totalEnrollments = await prisma.enrollment.count();

    const topCourses = await prisma.course.findMany({
        select: {
            id: true,
            title: true,
            _count: {
                select: {
                    enrollments: true
                }
            }
        },
        orderBy: {
            enrollments: {
                _count: "desc"
            }
        },
        take: 5
    });

    return {
        totalCourses,
        approvedCourses,
        pendingCourses,
        rejectedCourses,
        totalEnrollments,
        topCourses
    };
};


export const getCompletionAnalyticsService = async () => {

    const totalProgress = await prisma.progress.count();

    const completedLessons = await prisma.progress.count({
        where: {
            completed: true
        }
    });

    const pendingLessons = await prisma.progress.count({
        where: {
            completed: false
        }
    });

    const totalTimeSpent = await prisma.progress.aggregate({
        _sum: {
            timeSpent: true
        }
    });

    const topLearners = await prisma.progress.groupBy({
        by: ["userId"],

        _sum: {
            timeSpent: true
        },

        orderBy: {
            _sum: {
                timeSpent: "desc"
            }
        },

        take: 5
    });

    const completionRate =
        totalProgress === 0
            ? 0
            : Number(
                  (
                      (completedLessons / totalProgress) *
                      100
                  ).toFixed(2)
              );

    return {
        totalProgress,
        completedLessons,
        pendingLessons,
        completionRate,
        totalMinutesWatched:
            totalTimeSpent._sum.timeSpent || 0,
        topLearners
    };
};

// PENDING APPROVAL COUNT
export const getPendingApprovalCountService = async () => {

    const pendingCourses = await prisma.course.count({
        where: {
            status: "PENDING"
        }
    });

    return {
        pendingCourses
    };
};


// LESSON VIDEO UPLOAD

export const uploadLessonVideoService = async (
    lessonId,
    filePath
) => {

    const result = await cloudinary.uploader.upload(
        filePath,
        {
            resource_type: "video",
            folder: "lms/videos"
        }
    );

    return await prisma.lesson.update({
        where: {
            id: Number(lessonId)
        },
        data: {
            videoUrl: result.secure_url
        }
    });
};