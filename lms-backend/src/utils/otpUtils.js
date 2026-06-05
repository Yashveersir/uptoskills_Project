import prisma from "../config/prisma.js";
import { OtpType } from "@prisma/client";


export async function enforceOtpCooldown(email, type, cooldownSeconds = 60) {
    const existingOtp = await prisma.oTP.findUnique({
        where: {
            email_type: { email, type }
        }
    });

    if (existingOtp) {
        const diff = Date.now() - new Date(existingOtp.createdAt).getTime();
        if (diff < cooldownSeconds * 1000) {
            throw new Error(`Please wait ${cooldownSeconds} seconds before requesting new OTP`);
        }
    }
}
