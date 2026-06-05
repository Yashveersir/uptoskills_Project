import {uploadAvatarService ,
    uploadCourseThumbnailService,
    uploadVideoService,
    uploadPdfService
} from "../services/uploadService.js"
export const uploadAvatarController = async ( req,res,next) => {
    try {

        if (!req.file) {
            throw new Error("File is required");
        }

        const user = await uploadAvatarService(
            req.user.id,
            req.file.path
        );

        res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully",
            avatar: user.avatar
        });

    } catch (error) {
        next(error);
    }
};

export const uploadCourseThumbnailController = async (
    req,
    res,
    next
) => {
    try {

        if (!req.file) {
            throw new Error("Thumbnail image is required");
        }

        const course = await uploadCourseThumbnailService(
            req.params.courseId,   // <-- params (plural)
            req.file.path
        );

        res.status(200).json({
            success: true,
            message: "Course thumbnail uploaded successfully",
            thumbnail: course.thumbnail
        });

    } catch (error) {
        next(error);
    }
};

export const uploadVideoController = async (
    req,
    res,
    next
) => {
    try {

        if (!req.file) {
            throw new Error("Video file required");
        }

        const videoUrl =
            await uploadVideoService(req.file.path);

        res.status(200).json({
            success: true,
            videoUrl
        });

    } catch (error) {
        next(error);
    }
};

export const uploadPdfController = async (
    req,
    res,
    next
) => {
    try {

        if (!req.file) {
            throw new Error("PDF file required");
        }

        const pdfUrl =
            await uploadPdfService(req.file.path);

        res.status(200).json({
            success: true,
            pdfUrl
        });

    } catch (error) {
        next(error);
    }
};

