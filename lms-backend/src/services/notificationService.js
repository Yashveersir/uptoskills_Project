import prisma from "../config/prisma.js";

// CREATE NOTIFICATION
export const createNotificationService = async ({
    userId,
    title,
    message
}) => {

    return await prisma.notification.create({
        data: {
            userId,
            title,
            message
        }
    });
};

// GET USER NOTIFICATIONS
export const getNotificationsService = async (
    userId
) => {

    return await prisma.notification.findMany({
        where: {
            userId: Number(userId)
        },

        orderBy: {
            createdAt: "desc"
        }
    });
};

// MARK AS READ
export const markNotificationReadService =
async (notificationId) => {

    return await prisma.notification.update({
        where: {
            id: Number(notificationId)
        },

        data: {
            isRead: true
        }
    });
};