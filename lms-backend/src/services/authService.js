import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { generateOTP } from "../utils/generateOtp.js";
import { sendMail } from "./sendMail.js";
import { otpTemplate } from "../templates/otpTemplates.js";
import { enforceOtpCooldown } from "../utils/otpUtils.js";
import { OtpType } from "@prisma/client";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// ------------------ REGISTER ------------------

export const registerService = async ({ email, otp }) => {
    // Normalize email
    email = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Prevent OTP spam
    await enforceOtpCooldown(
        email,
        OtpType.REGISTER
    );

    // Save OTP
    await prisma.oTP.upsert({
        where: {
            email_type: {
                email,
                type: OtpType.REGISTER
            }
        },
        update: {
            otp: String(otp),
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            ), // 5 minutes
            verified: false,
            attempts: 0
        },
        create: {
            email,
            otp: String(otp),
            type: OtpType.REGISTER,
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            ),
            verified: false,
            attempts: 0
        }
    });

    return true;
};
// ------------------ VERIFY REGISTER OTP ------------------

export const verifyOtpService = async ({
    name,
    email,
    password,
    otp
}) => {

    email = email.trim().toLowerCase();

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must contain uppercase, lowercase and number"
        );
    }

    const otpRecord = await prisma.oTP.findUnique({
        where: {
            email_type: {
                email,
                type: OtpType.REGISTER
            }
        }
    });

    if (!otpRecord) {
        throw new Error("OTP not found");
    }

    if (otpRecord.attempts >= 5) {
        throw new Error(
            "Too many invalid OTP attempts. Please request a new OTP."
        );
    }

    if (new Date() > otpRecord.expiresAt) {

        await prisma.oTP.delete({
            where: {
                email_type: {
                    email,
                    type: OtpType.REGISTER
                }
            }
        });

        throw new Error("OTP expired");
    }

    const userOtp = String(otp)
        .trim()
        .replace(/\s/g, "");

    const dbOtp = String(otpRecord.otp)
        .trim()
        .replace(/\s/g, "");

    if (dbOtp !== userOtp) {

        await prisma.oTP.update({
            where: {
                id: otpRecord.id
            },
            data: {
                attempts: {
                    increment: 1
                }
            }
        });

        const remainingAttempts =
            5 - (otpRecord.attempts + 1);

        throw new Error(
            `Invalid OTP. ${remainingAttempts} attempts remaining.`
        );
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    const result = await prisma.$transaction(
        async (tx) => {

            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    verified: true
                }
            });

            await tx.oTP.delete({
                where: {
                    email_type: {
                        email,
                        type: OtpType.REGISTER
                    }
                }
            });

            return user;
        }
    );

    const token = generateToken(result.id);

    return {
        user: {
            id: result.id,
            name: result.name,
            email: result.email
        },
        token
    };
};

// ------------------ LOGIN ------------------

export const loginService = async ({
    email,
    password
}) => {

    email = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error(
            "Invalid email or password"
        );
    }

    // OPTIONAL: Require verified account
    if (!user.verified) {
        throw new Error(
            "Please verify your account first"
        );
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error(
            "Invalid email or password"
        );
    }

    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            verified: user.verified
        },
        token
    };
};
// ------------------ SEND LOGIN OTP ------------------

export const sendLoginOtpService = async (email) => {

    email = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.verified) {
        throw new Error(
            "Please verify your account before login"
        );
    }

    await enforceOtpCooldown(
        email,
        OtpType.LOGIN
    );

    const otp = generateOTP();

    await prisma.oTP.upsert({
        where: {
            email_type: {
                email,
                type: OtpType.LOGIN
            }
        },
        update: {
            otp: String(otp),
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            ),
            verified: false,
            attempts: 0
        },
        create: {
            email,
            otp: String(otp),
            type: OtpType.LOGIN,
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            ),
            verified: false,
            attempts: 0
        }
    });

    await sendMail(
        email,
        "Login OTP - LMS App",
        otpTemplate({ otp })
    );

    return true;
};
// ------------------VERIFY  LOGIN  OTP------------------

export const verifyLoginOtpService = async (email, otp) => {

    email = email.trim().toLowerCase();

    const otpRecord = await prisma.oTP.findUnique({
        where: {
            email_type: {
                email,
                type: OtpType.LOGIN
            }
        }
    });

    if (!otpRecord) {
        throw new Error("OTP not found");
    }

    if (otpRecord.attempts >= 5) {
        throw new Error(
            "Too many invalid OTP attempts. Please request a new OTP."
        );
    }

    // Delete expired OTP
    if (new Date() > otpRecord.expiresAt) {

        await prisma.oTP.delete({
            where: {
                email_type: {
                    email,
                    type: OtpType.LOGIN
                }
            }
        });

        throw new Error("OTP expired");
    }

    const userOtp = String(otp)
        .trim()
        .replace(/\s/g, "");

    const dbOtp = String(otpRecord.otp)
        .trim()
        .replace(/\s/g, "");

    if (dbOtp !== userOtp) {

        await prisma.oTP.update({
            where: {
                id: otpRecord.id
            },
            data: {
                attempts: {
                    increment: 1
                }
            }
        });

        const remainingAttempts =
            5 - (otpRecord.attempts + 1);

        throw new Error(
            `Invalid OTP. ${remainingAttempts} attempts remaining.`
        );
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const token = generateToken(user.id);

    await prisma.$transaction([
        prisma.oTP.delete({
            where: {
                email_type: {
                    email,
                    type: OtpType.LOGIN
                }
            }
        }),
        prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                lastLoginAt: new Date()
            }
        })
    ]);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
};

// ------------------ FORGOT PASSWORD ------------------

export const forgotPasswordService = async ({ email, otp }) => {
    email = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: { email }
    });

    // Don't reveal whether account exists
    if (!user) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }

    await enforceOtpCooldown(
        email,
        OtpType.RESET_PASSWORD
    );

    await prisma.oTP.upsert({
        where: {
            email_type: {
                email,
                type: OtpType.RESET_PASSWORD
            }
        },
        update: {
            otp: String(otp),
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            ),
            verified: false,
            attempts: 0
        },
        create: {
            email,
            otp: String(otp),
            type: OtpType.RESET_PASSWORD,
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            ),
            verified: false,
            attempts: 0
        }
    });

    await sendMail(
        email,
        "Reset Password OTP - LMS App",
        otpTemplate({ otp })
    );

    return true;
};
// ------------------ Verify OTP Service ------------------

export const verifyResetOtpService = async ({ email, otp }) => {

    email = email.trim().toLowerCase();

    const otpRecord = await prisma.oTP.findUnique({
        where: {
            email_type: {
                email,
                type: OtpType.RESET_PASSWORD
            }
        }
    });

    if (!otpRecord) {
        throw new Error("OTP not found");
    }

    if (otpRecord.verified) {
        throw new Error("OTP already verified");
    }

    if (otpRecord.attempts >= 5) {
        throw new Error(
            "Too many invalid OTP attempts. Please request a new OTP."
        );
    }

    if (new Date() > otpRecord.expiresAt) {

        await prisma.oTP.delete({
            where: {
                id: otpRecord.id
            }
        });

        throw new Error("OTP expired");
    }

    const userOtp = String(otp)
        .trim()
        .replace(/\s/g, "");

    const dbOtp = String(otpRecord.otp)
        .trim()
        .replace(/\s/g, "");

    if (dbOtp !== userOtp) {

        await prisma.oTP.update({
            where: {
                id: otpRecord.id
            },
            data: {
                attempts: {
                    increment: 1
                }
            }
        });

        const remainingAttempts =
            5 - (otpRecord.attempts + 1);

        throw new Error(
            `Invalid OTP. ${remainingAttempts} attempts remaining.`
        );
    }

    await prisma.oTP.update({
        where: {
            id: otpRecord.id
        },
        data: {
            verified: true,
            attempts: 0
        }
    });

    return true;
};

// ------------------ RESTE PASSWORD ------------------

export const resetPasswordService = async ({
    email,
    newPassword
}) => {

    email = email.trim().toLowerCase();

    if (!passwordRegex.test(newPassword)) {
        throw new Error(
            "Password must contain uppercase, lowercase and number"
        );
    }

    const otpRecord = await prisma.oTP.findUnique({
        where: {
            email_type: {
                email,
                type: OtpType.RESET_PASSWORD
            }
        }
    });

    if (!otpRecord) {
        throw new Error("OTP verification required");
    }

    if (new Date() > otpRecord.expiresAt) {

        await prisma.oTP.delete({
            where: {
                id: otpRecord.id
            }
        });

        throw new Error("OTP expired");
    }

    if (!otpRecord.verified) {
        throw new Error("OTP not verified");
    }

    // GET USER
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // CHECK IF NEW PASSWORD IS SAME AS OLD PASSWORD
    const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password
    );

    if (isSamePassword) {
        throw new Error(
            "New password cannot be same as old password"
        );
    }

    // HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(
        newPassword,
        12
    );

    // UPDATE PASSWORD
    await prisma.user.update({
        where: {
            email
        },
        data: {
            password: hashedPassword
        }
    });

    // DELETE OTP AFTER SUCCESS
    await prisma.oTP.delete({
        where: {
            email_type: {
                email,
                type: OtpType.RESET_PASSWORD
            }
        }
    });

    return true;
};
