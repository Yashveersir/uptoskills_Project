import prisma from "../config/prisma.js";

// GET PROFILE SERVICE
export const getMyProfileService = async (userId) => {

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
            verified: true,
            createdAt: true
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};


export const updateMyProfileService = async (userId, data) => {

    const { name, avatar } = data;

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name: name || undefined,
            avatar: avatar || undefined
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true
        }
    });

    return updatedUser;
};

