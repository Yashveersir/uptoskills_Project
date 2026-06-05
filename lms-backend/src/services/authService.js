


import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { generateOTP } from "../utils/generateOtp.js";
import { sendMail } from "./sendMail.js";
import { otpTemplate } from "../templates/otpTemplates.js";
import {enforceOtpCooldown} from "../utils/otpUtils.js"
import { OtpType } from "@prisma/client";



// ------------------ REGISTER ------------------

export const registerService = async ({ email, otp }) => {

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new Error("User already exists");

    await enforceOtpCooldown(email, OtpType.REGISTER);

    await prisma.oTP.upsert({
        where: { email_type: { email, type: OtpType.REGISTER } },
        update: {
            otp: String(otp),
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            verified: false,
            attempts: 0
        },
        create: {
            email,
            otp: String(otp),
            type: OtpType.REGISTER,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            verified: false,
            attempts: 0
        }
    });

    return true;
};

// ------------------ VERIFY REGISTER OTP ------------------

export const verifyOtpService = async ({ name, email, password, otp }) => {

    const otpRecord = await prisma.oTP.findUnique({

        where: {
             email_type:{
                 email,
                  type: OtpType.REGISTER
                 }
             }
    });

    if (!otpRecord) throw new Error("OTP not found");

    if (otpRecord.attempts >= 5) throw new Error("Too many invalid OTP attempts. Please request a new OTP.");

    if (new Date() > otpRecord.expiresAt) throw new Error("OTP expired");

    const userOtp = String(otp).trim().replace(/\s/g, "");
    const dbOtp = String(otpRecord.otp).trim().replace(/\s/g, "");

    if (dbOtp !== userOtp) {
        await prisma.oTP.update({
            where: { id: otpRecord.id },
            data: { attempts: { increment: 1 } }
        });

        const remainingAttempts = 5 - (otpRecord.attempts + 1);

        throw new Error(`Invalid OTP. ${remainingAttempts} attempts remaining.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({

        data: { 
            name,
            email,
            password: hashedPassword, 
            verified: true }
    });

    await prisma.oTP.delete({ 
        where: {
             email_type: {
                email,
                type: OtpType.REGISTER 
            }
         }
        });

    const token = generateToken(user.id);

    return { user:
         {
             id: user.id,
             name: user.name,
             email: user.email
             },
              token 
            };
};

// ------------------ LOGIN ------------------

export const loginService = async ({ email, password }) => {

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid email or password");


    const token = generateToken(user.id);
    
    return { 
        user: {
             id: user.id,
             name: user.name,
             email: user.email 
            },
             token
             };
};

export const sendLoginOtpService = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    await enforceOtpCooldown(email, OtpType.LOGIN);

    const otp = generateOTP();

    await prisma.oTP.upsert({
        where: { email_type: {
             email,
              type: OtpType.LOGIN
             }
            },

        update: {
            otp: String(otp),
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            verified: false,
            attempts: 0
        },

        create: {
            email,
            otp: String(otp),
            type: OtpType.LOGIN,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            verified: false,
            attempts: 0
        }
    });

    await sendMail(email,
         "Login OTP - LMS App",
          otpTemplate({ otp }));

    return true;
};

export const verifyLoginOtpService = async (email, otp) => {

    const otpRecord = await prisma.oTP.findUnique({

        where: {
            email_type: {
                  email,
                  type: OtpType.LOGIN 
                } 
            }
    });

    if (!otpRecord) throw new Error("OTP not found");

    if (otpRecord.attempts >= 5) throw new Error("Too many invalid OTP attempts. Please request a new OTP.");

    if (new Date() > otpRecord.expiresAt) throw new Error("OTP expired");

    const userOtp = String(otp).trim().replace(/\s/g, "");
    const dbOtp = String(otpRecord.otp).trim().replace(/\s/g, "");

    if (dbOtp !== userOtp) {
        await prisma.oTP.update({
            where: { id: otpRecord.id },
            data: { attempts: { increment: 1 } }
        });

        const remainingAttempts = 5 - (otpRecord.attempts + 1);

        throw new Error(`Invalid OTP. ${remainingAttempts} attempts remaining.`);
    }

    const user = await prisma.user.findUnique({ where: {
         email 
        } 
    });
    const token = generateToken(user.id);

    await prisma.oTP.delete({ where: { email_type: { email, type: OtpType.LOGIN } } });

    return { user: {
           id: user.id,
           name: user.name,
           email: user.email },
           token };
};

// ------------------ FORGOT PASSWORD ------------------

export const forgotPasswordService = async ({ email }) => {

    const user = await prisma.user.findUnique({ where: { 
        email } 
    });
    
    if (!user) throw new Error("User not found");

    await enforceOtpCooldown(email, OtpType.RESET_PASSWORD);

    const otp = generateOTP();

    await prisma.oTP.upsert({
        where: { email_type: {
            
             email,
             type: OtpType.RESET_PASSWORD
             } },

        update: {
            otp: String(otp),
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            verified: false,
            attempts: 0
        },
        create: {
            email,
            otp: String(otp),
            type: OtpType.RESET_PASSWORD,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            verified: false,
            attempts: 0
        }
    });

    await sendMail(email, "Reset Password OTP - LMS App", otpTemplate({ otp }));

    return true;
};

export const verifyResetOtpService = async ({ email, otp }) => {
    const otpRecord = await prisma.oTP.findUnique({

        where: {
             email_type: {
                 email, type: OtpType.RESET_PASSWORD 
                } }
    });

    if (!otpRecord) throw new Error("OTP not found");

    if (otpRecord.verified) throw new Error("OTP already verified");

    if (otpRecord.attempts >= 5) throw new Error("Too many invalid OTP attempts. Please request a new OTP.");

    if (new Date() > otpRecord.expiresAt) throw new Error("OTP expired");

    const userOtp = String(otp).trim().replace(/\s/g, "");
    const dbOtp = String(otpRecord.otp).trim().replace(/\s/g, "");

    if (dbOtp !== userOtp) {
        await prisma.oTP.update({
            where: { id: otpRecord.id },
            data: { attempts: { increment: 1 } }
        });
        const remainingAttempts = 5 - (otpRecord.attempts + 1);

        throw new Error(`Invalid OTP. ${remainingAttempts} attempts remaining.`);
    }

    await prisma.oTP.update({
        where: { id: otpRecord.id },
        data: { verified: true, attempts: 0 }
    });

    return true;
};

export const resetPasswordService = async ({ email, newPassword }) => {
    const otpRecord = await prisma.oTP.findUnique({
        where: {
             email_type: { 
                email, type: OtpType.RESET_PASSWORD 
            } }
    });

    if (!otpRecord) throw new Error("OTP verification required");
    if (!otpRecord.verified) throw new Error("OTP not verified");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: {
         email },
          data: {
             password: hashedPassword
             } 
            });

    await prisma.oTP.delete({ where: { email_type: { email, type: OtpType.RESET_PASSWORD } } });

    return true;
}
