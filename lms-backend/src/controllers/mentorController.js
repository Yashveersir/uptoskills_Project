import {getMentorsService, createMentorService} from "../services/mentorService.js";    

// GET MENTORS
export const getMentorsController = async (req, res, next) => {

    try {

        const mentors = await getMentorsService();
        res.status(200).json({
            success: true,
            mentors 
        });
}catch (error) {
        next(error);    
    }
};


export const createMentorController = async (req, res, next) => {
    try {
        const mentor = await createMentorService(req.body);
        res.status(201).json({
            success: true,
            message: "Mentor created successfully",
            mentor
        });
    } catch (error) {
        next(error);
    };
    
}
