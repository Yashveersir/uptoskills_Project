import nodemailer from "nodemailer";

export const sendMail = async (to, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Gmail App Password
            },
        });

        const mailOptions = {
            from: `"LMS APP" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: body,
        };

        await transporter.sendMail(mailOptions);

        return true;

    } catch (error) {
        console.error("Email sending error:", error);
        throw new Error("Failed to send email");
    }
};