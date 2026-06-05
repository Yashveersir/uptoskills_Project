import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const authMiddleware = async (req, res, next) => {
    try {

        let token;

        // 1. Check Authorization header
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Get user from DB 
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                verified: true
            }
        });

        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        // 4. Attach user to request
        req.user = user;

        next();

    } catch (error) {
        res.status(401);
        next(new Error("Not authorized, token failed"));
    }
};

