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
import { resendOtpService } from "../services/resendOtpService.js";


// ---------------- REGISTER ----------------

export const registerController = async (req, res, next) => {
    try {

        const { email } = req.validated;

        const otp = generateOTP();

        await registerService({
            email,
            otp
        });

        await sendMail(
            email,
            "Verify Your Email - LMS App",
            otpTemplate({ otp })
        );

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- VERIFY REGISTER OTP ----------------

export const verifyOtpController = async (req, res, next) => {
    try {

        const result = await verifyOtpService(
            req.validated
        );

        return res.status(201).json({
            success: true,
            message: "Account verified successfully",
            user: result.user,
            token: result.token
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- RESEND OTP ----------------

export const resendOtpController = async (req, res, next) => {
    try {

        const { email, type } = req.validated;

        const otp = generateOTP();

        await resendOtpService({
            email,
            otp,
            type
        });

        await sendMail(
            email,
            "OTP Verification - LMS App",
            otpTemplate({ otp })
        );

        return res.status(200).json({
            success: true,
            message: "OTP resent successfully"
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- LOGIN ----------------

export const loginController = async (req, res, next) => {
    try {

        const result = await loginService(
            req.validated
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user,
            token: result.token
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- SEND LOGIN OTP ----------------

export const sendLoginOtpController = async (req, res, next) => {
    try {

        const { email } = req.validated;

        await sendLoginOtpService(email);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- VERIFY LOGIN OTP ----------------

export const verifyLoginOtpController = async (req, res, next) => {
    try {

        const { email, otp } = req.validated;

        const result = await verifyLoginOtpService(
            email,
            otp
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user,
            token: result.token
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- FORGOT PASSWORD ----------------

export const forgotPasswordController = async (req, res, next) => {
    try {

        const { email } = req.validated;

        const otp = generateOTP();

        await forgotPasswordService({
            email,
            otp
        });

        return res.status(200).json({
            success: true,
            message:
                "If an account exists, an OTP has been sent."
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- VERIFY RESET OTP ----------------

export const verifyResetOtpController = async (req, res, next) => {
    try {

        await verifyResetOtpService(
            req.validated
        );

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- RESET PASSWORD ----------------

export const resetPasswordController = async (req, res, next) => {
    try {

        await resetPasswordService(
            req.validated
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        next(error);
    }
};


// ---------------- LOGOUT ----------------

export const logoutController = async (req, res, next) => {
    try {

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        next(error);
    }
};