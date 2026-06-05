import {
    getNotificationsService,
    markNotificationReadService
}
from "../services/notificationService.js";

export const getNotificationsController =
async (req, res, next) => {

    try {

        const notifications =
            await getNotificationsService(
                req.user.id
            );

        res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        next(error);
    }
};

export const markNotificationReadController =
async (req, res, next) => {

    try {

        const notification =
            await markNotificationReadService(
                req.params.id
            );

        res.status(200).json({
            success: true,
            notification
        });

    } catch (error) {
        next(error);
    }
};