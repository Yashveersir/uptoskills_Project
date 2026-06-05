import {
    getMyProfileService,
    updateMyProfileService
} from "../services/userService.js";

// GET PROFILE
export const getMyProfile = async (req, res, next) => {
    try {

        const user = await getMyProfileService(req.user.id);

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        next(error);
    }
};


export const updateMyProfile = async (req, res, next) => {
    try {

        const user = await updateMyProfileService(req.user.id, req.body);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        next(error);
    }
};

