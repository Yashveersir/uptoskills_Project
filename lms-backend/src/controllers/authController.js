import {
    registerService,
    verifyOtpService,
    loginService,
    sendLoginOtpService,
    verifyLoginOtpService,
    forgotPasswordService,
    verifyResetOtpService,
    resetPasswordService
} from "../services/authService.js";

import { generateOTP } from "../utils/generateOTP.js";
import { sendMail } from "../services/sendMail.js";

import { otpTemplate } from "../templates/otpTemplates.js";
import { forgotPasswordTemplate } from "../templates/forgotPasswordTemplate.js";

import { resendOtpService } from "../services/resendOtpService.js";




// REGISTER (SEND OTP)

export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const otp = generateOTP();

        await registerService({
            name,
            email,
            password,
            otp
        });

        await sendMail(
            email,
            "Verify Your Email - LMS App",
            otpTemplate({ otp })
        );

        res.status(200).json({
            success: true,
            message: "OTP sent to email successfully"
        });

    } catch (error) {
        next(error);
    }
};



// VERIFY OTP (REGISTER)

export const verifyOtpController = async (req, res, next) => {
    try {
        const data = await verifyOtpService(req.body);

        res.status(201).json({
            success: true,
            message: "User verified successfully",
            user: data.user,
            token: data.token
        });

    } catch (error) {
        next(error);
    }
};



// RESEND OTP

export const resendOtpController = async (req, res, next) => {
    try {
        const { email, type = "REGISTER" } = req.body;

        if (!email) {
            res.status(400);
            throw new Error("Email is required");
        }

        const otp = generateOTP();

        await resendOtpService({ email, otp, type });

        await sendMail(
            email,
            "Resend OTP - LMS App",
            otpTemplate({ otp })   // 
        );

        res.status(200).json({
            success: true,
            message: "OTP resent successfully"
        });

    } catch (error) {
        next(error);
    }
};

// LOGIN via OTP

export const sendLoginOtpController = async (
    req,
    res,
    next
) => {
    try {

        await sendLoginOtpService(
            req.body.email
        );

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        next(error);
    }
};

export const verifyLoginOtpController = async (
    req,
    res,
    next
) => {
    try {

        const { email, otp } = req.body;

        const result =
            await verifyLoginOtpService(
                email,
                otp
            );

        res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        });

    } catch (error) {
        next(error);
    }
};






// LOGIN

export const loginController = async (req, res, next) => {
    try {
        const data = await loginService(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: data.user,
            token: data.token
        });

    } catch (error) {
        next(error);
    }
};



// FORGOT PASSWORD (SEND OTP)

export const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body;

        const otp = generateOTP();

        await forgotPasswordService({ email, otp });

        await sendMail(
            email,
            "Password Reset OTP - LMS App",
            forgotPasswordTemplate({ otp })
        );

        res.status(200).json({
            success: true,
            message: "OTP sent to email for password reset"
        });

    } catch (error) {
        next(error);
    }
};



// VERIFY RESET OTP

export const verifyResetOtpController = async (req, res, next) => {
    try {
        await verifyResetOtpService(req.body);

        res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        next(error);
    }
};



// RESET PASSWORD

export const resetPasswordController = async (req, res, next) => {
    try {
        await resetPasswordService(req.body);

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        next(error);
    }
};

// LOGOUT 

export const logoutController = async (req, res, next) => {
    try {

       
        const user = req.user;

        if (!user) {
            res.status(401);
            throw new Error("Not authorized");
        }

        res.status(200).json({
            success: true,
            message: `User ${user.email} logged out successfully`
        });

    } catch (error) {
        next(error);
    }
};