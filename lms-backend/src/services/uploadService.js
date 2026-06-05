import cloudinary from "../config/cloudinary.js";
import prisma from "../config/prisma.js";

// UPLOAD USER AVATAR
export const uploadAvatarService = async (
    userId,
    filePath
) => {

    const result = await cloudinary.uploader.upload(
        filePath,
        {
            folder: "lms/avatars"
        }
    );

    return await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: {
            avatar: result.secure_url
        }
    });
};


// UPLOAD COURSE THUMBNAIL
export const uploadCourseThumbnailService = async (
    courseId,
    filePath
) => {

    const result = await cloudinary.uploader.upload(
        filePath,
        {
            folder: "lms/course-thumbnails"
        }
    );

    return await prisma.course.update({
        where: {
            id: Number(courseId)
        },
        data: {
            thumbnail: result.secure_url
        }
    });
};


// VIDEO UPLOAD SERVICE

export const uploadVideoService = async (filePath) => {

    const result = await cloudinary.uploader.upload(
        filePath,
        {
            resource_type: "video",
            folder: "lms/videos"
        }
    );

    return result.secure_url;
};

// UPLOAD PDF SERVICE

export const uploadPdfService = async (filePath) => {

    const result = await cloudinary.uploader.upload(
        filePath,
        {
            resource_type: "raw",
            folder: "lms/pdfs"
        }
    );

    return result.secure_url;
};

