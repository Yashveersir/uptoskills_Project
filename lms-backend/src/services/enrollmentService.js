import prisma from "../config/prisma.js";

export const enrollCourseService = async (userId, courseId, mentorId) => {

   

    // Validate inputs
    if (!courseId) throw new Error("courseId is required");
    if (!mentorId) throw new Error("mentorId is required");

    const parsedUserId = Number(userId);
    const parsedCourseId = Number(courseId);
    const parsedMentorId = Number(mentorId);

    // Check course exists
    const course = await prisma.course.findUnique({
        where: { id: parsedCourseId }
    });

    if (!course) throw new Error("Course not found");

    // Check mentor exists
    const mentor = await prisma.mentor.findUnique({
        where: { id: parsedMentorId }
    });

    if (!mentor) throw new Error("Mentor not found");

    // Check already enrolled
    const existing = await prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId: parsedUserId,
                courseId: parsedCourseId
            }
        }
    });

    if (existing) {
        throw new Error("Already enrolled in this course");
    }

    // Create enrollment
    return await prisma.enrollment.create({
        data: {
            userId: parsedUserId,
            courseId: parsedCourseId,
            mentorId: parsedMentorId
        },
        include: {
            course: true,
            mentor: true
        }
    });
};

export const getMyCoursesService = async (userId) => {

    const parsedUserId = Number(userId);

    return await prisma.enrollment.findMany({
        where: {
            userId: parsedUserId
        },
        include: {
            course: true,
            mentor: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};