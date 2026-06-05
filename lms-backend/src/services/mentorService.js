import prisma from "../config/prisma.js";

export const getMentorsService = async () => {
    return await prisma.mentor.findMany({
        orderBy: {
            createdAt: "asc"    
}
    });
};

// CREATE MENTOR SERVICE
export const createMentorService = async (data) => {

    const { name, image } = data;

    if (!name || !image) {
        throw new Error("Name and image are required");
    }

    const mentor = await prisma.mentor.create({
        data: {
            name,
            image
        }
    });

    return mentor;
};