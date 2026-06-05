import prisma from "../config/prisma.js";

import {createNotificationService} from "./notificationService.js";


// CREATE COURSE
export const createCourseService = async (data, userId) => {

    const {
        title,
        description,
        category,
        level,
        thumbnail
    } = data;

    if (!title || !description || !category || !level) {
        throw new Error("All required fields must be provided");
    }

    const course = await prisma.course.create({
        data: {
            title,
            description,
            category,
            level,
            thumbnail,
            createdBy: Number(userId)
        }
    });

    return course;
};



// GET ALL COURSES
export const getAllCoursesService = async () => {

    const courses = await prisma.course.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return courses;
};



// GET SINGLE COURSE (USING ID)
export const getSingleCourseService = async (courseId) => {

    const course = await prisma.course.findUnique({
        where: {
            id: Number(courseId)
        }
    });

    if (!course) {
        throw new Error("Course not found");
    }

    return course;
};

// SEARCH COURSES
export const searchCoursesService = async (query) => {

    const {
        keyword,
        category,
        level,
        page = 1,
        limit = 10
    } = query;

    const currentPage = Number(page);
    const pageSize = Number(limit);

    const where = {
        status: "approved",

        AND: [
            keyword
                ? {
                      OR: [
                          {
                              title: {
                                  contains: keyword,
                                  mode: "insensitive"
                              }
                          },
                          {
                              description: {
                                  contains: keyword,
                                  mode: "insensitive"
                              }
                          }
                      ]
                  }
                : {},

            category
                ? {
                      category: {
                          equals: category,
                          mode: "insensitive"
                      }
                  }
                : {},

            level
                ? {
                      level: {
                          equals: level,
                          mode: "insensitive"
                      }
                  }
                : {}
        ]
    };

    const totalCourses = await prisma.course.count({
        where
    });

    const courses = await prisma.course.findMany({
        where,
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        orderBy: {
            createdAt: "desc"
        }
    });

    return {
        courses,
        pagination: {
            totalCourses,
            currentPage,
            totalPages: Math.ceil(
                totalCourses / pageSize
            ),
            pageSize
        }
    };
};

// update course
export const updateCourseService = async (courseId, data) => {
    const course=await prisma.course.findUnique({
        where:{
            id:Number(courseId)

        }
    });

    if(!course){
        throw new Error("Course not found");
    }

    return await prisma.course.update({

        where:{
            id:Number(courseId)
        },
        data
    });
}

// DELETE COURSE

export const deleteCourseService = async (courseId) => {

    const course = await prisma.course.findUnique({
        where: {
            id: Number(courseId)
        }
    });

    if (!course) {
        throw new Error("Course not found");
    }

    await prisma.progress.deleteMany({
        where: {
            lesson: {
                courseId: Number(courseId)
            }
        }
    });

    await prisma.lesson.deleteMany({
        where: {
            courseId: Number(courseId)
        }
    });

    await prisma.enrollment.deleteMany({
        where: {
            courseId: Number(courseId)
        }
    });

    await prisma.course.delete({
        where: {
            id: Number(courseId)
        }
    });

    return true;
};

// GET PENDING COURSES 

export const getPendingCoursesService = async () => {
    const courses = await prisma.course.findMany({
        where: {
            status: "pending"
        },  
        orderBy: {
            createdAt: "asc"
        }
    });
    
    return courses;
};

// APPROVE  COURSE

export const approveCourseService = async (courseId) => {

    const course = await prisma.course.findUnique({
        where: {
            id: Number(courseId)
        }
    });

    if (!course) {
        throw new Error("Course not found");
    }

    const updatedCourse = await prisma.course.update({
        where: {
            id: Number(courseId)
        },
        data: {
            status: "approved",
            rejectionMessage: null
        }
    });

    if (course.createdBy) {
        await createNotificationService({
            userId: course.createdBy,
            title: "Course Approved",
            message: `${course.title} has been approved`
        });
    }

    return updatedCourse;
};



// REJECT COURSE

export const rejectCourseService = async (
    courseId,
    reason
) => {

    const course = await prisma.course.findUnique({
        where: {
            id: Number(courseId)
        }
    });

    if (!course) {
        throw new Error("Course not found");
    }

    const updatedCourse = await prisma.course.update({
        where: {
            id: Number(courseId)
        },
        data: {
            status: "rejected",
            rejectionMessage: reason
        }
    });

    if (course.createdBy) {
        await createNotificationService({
            userId: course.createdBy,
            title: "Course Rejected",
            message: `${course.title} has been rejected`
        });
    }

    return updatedCourse;
};



// PENDING COURSES COUNT

export const getPendingCoursesCountService = async () => {
    const count = await prisma.course.count({
        where: {
            status: "pending"
        }
    });
    return count;
};
