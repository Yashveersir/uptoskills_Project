import prisma from "../config/prisma.js";

const enrolledOnly = async (req, res, next) => {
    try {

        const userId = req.user.id;

        // courseId can come from params or query
        const courseId = req.params.courseId || req.query.courseId;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required"
            });
        }

        const enrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: Number(userId),
                    courseId: Number(courseId)
                }
            }
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You are not enrolled in this course"
            });
        }

        // optional: attach enrollment info to request
        req.enrollment = enrollment;

        next();

    } catch (error) {
        next(error);
    }
};

export default enrolledOnly;