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
<<<<<<< HEAD
import { otpTemplate } from "../templates/otpTemplates.js";
import { resendOtpService } from "../services/resendOtpService.js";


// ---------------- REGISTER ----------------

export const registerController = async (req, res, next) => {
    try {

        const { email } = req.validated;
=======

import { otpTemplate } from "../templates/otpTemplates.js";
import { forgotPasswordTemplate } from "../templates/forgotPasswordTemplate.js";

import { resendOtpService } from "../services/resendOtpService.js";




// REGISTER (SEND OTP)

export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a

        const otp = generateOTP();

        await registerService({
<<<<<<< HEAD
            email,
=======
            name,
            email,
            password,
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
            otp
        });

        await sendMail(
            email,
            "Verify Your Email - LMS App",
            otpTemplate({ otp })
        );

<<<<<<< HEAD
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
=======
        res.status(200).json({
            success: true,
            message: "OTP sent to email successfully"
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
        });

    } catch (error) {
        next(error);
    }
};


<<<<<<< HEAD
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
=======

// VERIFY OTP (REGISTER)

export const verifyOtpController = async (req, res, next) => {
    try {
        const data = await verifyOtpService(req.body);

        res.status(201).json({
            success: true,
            message: "User verified successfully",
            user: data.user,
            token: data.token
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
        });

    } catch (error) {
        next(error);
    }
};


<<<<<<< HEAD
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
=======

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
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
            success: true,
            message: "OTP resent successfully"
        });

    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD

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
=======
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
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD

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
=======
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
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
        });

    } catch (error) {
        next(error);
    }
};


<<<<<<< HEAD
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
=======




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
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
        });

    } catch (error) {
        next(error);
    }
};


<<<<<<< HEAD
// ---------------- VERIFY RESET OTP ----------------

export const verifyResetOtpController = async (req, res, next) => {
    try {

        await verifyResetOtpService(
            req.validated
        );

        return res.status(200).json({
=======

// VERIFY RESET OTP

export const verifyResetOtpController = async (req, res, next) => {
    try {
        await verifyResetOtpService(req.body);

        res.status(200).json({
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        next(error);
    }
};


<<<<<<< HEAD
// ---------------- RESET PASSWORD ----------------

export const resetPasswordController = async (req, res, next) => {
    try {

        await resetPasswordService(
            req.validated
        );

        return res.status(200).json({
=======

// RESET PASSWORD

export const resetPasswordController = async (req, res, next) => {
    try {
        await resetPasswordService(req.body);

        res.status(200).json({
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD

// ---------------- LOGOUT ----------------
=======
// LOGOUT 
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a

export const logoutController = async (req, res, next) => {
    try {

<<<<<<< HEAD
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
=======
       
        const user = req.user;

        if (!user) {
            res.status(401);
            throw new Error("Not authorized");
        }

        res.status(200).json({
            success: true,
            message: `User ${user.email} logged out successfully`
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
        });

    } catch (error) {
        next(error);
    }
};