import rateLimit from "express-rate-limit";

// General API limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many requests. Please try again later."
    }
});

// Strict limiter for OTP routes
export const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many OTP requests. Please wait 15 minutes."
    }
});

// Login limiter
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many login attempts. Please try later."
    }
});