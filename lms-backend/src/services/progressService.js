import prisma from "../config/prisma.js";


// MARK LESSON COMPLETE
export const markLessonCompleteService = async (
    userId,
    lessonId
) => {

    // check lesson exists
    const lesson = await prisma.lesson.findUnique({
        where: {
            id: Number(lessonId)
        }
    });

    if (!lesson) {
        throw new Error("Lesson not found");
    }

    // check enrolled
    const enrollment = await prisma.enrollment.findFirst({
        where: {
            userId,
            courseId: lesson.courseId
        }
    });

    if (!enrollment) {
        throw new Error("You are not enrolled in this course");
    }

    // upsert progress
    const progress = await prisma.progress.upsert({
        where: {
            userId_lessonId: {
                userId,
                lessonId: Number(lessonId)
            }
        },
        update: {
            completed: true,
            completedAt: new Date()
        },
        create: {
            userId,
            lessonId: Number(lessonId),
            completed: true,
            completedAt: new Date()
        }
    });

    return progress;
};




// GET COURSE PROGRESS
export const getCourseProgressService = async (
    userId,
    courseId
) => {

    // total lessons
    const totalLessons = await prisma.lesson.count({
        where: {
            courseId: Number(courseId)
        }
    });

    // completed lessons
    const completedLessons = await prisma.progress.count({
        where: {
            userId,
            completed: true,
            lesson: {
                courseId: Number(courseId)
            }
        }
    });

    // percentage
    const progressPercentage =
        totalLessons === 0
            ? 0
            : Math.round(
                (completedLessons / totalLessons) * 100
            );

    return {
        totalLessons,
        completedLessons,
        progressPercentage
    };
};

// UPDATE LESSON TIME SPENT

export const updateLessonTimeService = async (
    userId,
    lessonId,
    timeSpent
) => {

    const lesson = await prisma.lesson.findUnique({
        where: {
            id: Number(lessonId)
        }
    });

    if (!lesson) {
        throw new Error("Lesson not found");
    }

    const enrollment = await prisma.enrollment.findFirst({
        where: {
            userId,
            courseId: lesson.courseId
        }
    });

    if (!enrollment) {
        throw new Error("You are not enrolled in this course");
    }

    const progress = await prisma.progress.upsert({
        where: {
            userId_lessonId: {
                userId,
                lessonId: Number(lessonId)
            }
        },
        update: {
            timeSpent: {
                increment: Number(timeSpent)
            }
        },
        create: {
            userId,
            lessonId: Number(lessonId),
            timeSpent: Number(timeSpent)
        }
    });

    return progress;
};