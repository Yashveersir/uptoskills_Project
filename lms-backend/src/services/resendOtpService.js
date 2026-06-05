import prisma from "../config/prisma.js";

export const resendOtpService = async ({ email, otp }) => {

    const existingOtp = await prisma.oTP.findUnique({
        where: {
            email_type: {
                email,
                type: "REGISTER"
            }
        }
    });

    const now = new Date();

    // If OTP exists, check cooldown (60 sec rule)
    if (existingOtp) {
        const diff = now - existingOtp.createdAt;

        if (diff < 60 * 1000) {
            throw new Error("Please wait 60 seconds before requesting a new OTP");
        }

        // update OTP
        await prisma.oTP.update({
            where: {
                email_type: {
                    email,
                    type: "REGISTER"
                }
            },
            data: {
                otp,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
                verified: false,
                createdAt: now
            }
        });

    } else {
        // create new OTP
        await prisma.oTP.create({
            data: {
                email,
                otp,
                type: "REGISTER",
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
                verified: false
            }
        });
    }

    return true;
};