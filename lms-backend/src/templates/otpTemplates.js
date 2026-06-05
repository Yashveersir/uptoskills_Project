export const otpTemplate = ({ otp, type }) => {

    const titleMap = {
        REGISTER: "Email Verification",
        LOGIN: "Login Verification",
        RESET_PASSWORD: "Password Reset"
    };

    const messageMap = {
        REGISTER: "Thank you for registering with LMS App.",
        LOGIN: "We received a login request for your account.",
        RESET_PASSWORD: "We received a request to reset your password."
    };

    return `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
            
            <h2 style="color:#4f46e5;">
                ${titleMap[type] || "Verification"}
            </h2>

            <p>Hello,</p>

            <p>${messageMap[type] || ""}</p>

            <p>Your One-Time Password (OTP) is:</p>

            <div style="
                margin:20px 0;
                font-size:28px;
                font-weight:bold;
                letter-spacing:6px;
                text-align:center;
                background:#f3f4f6;
                padding:12px;
                border-radius:8px;
            ">
                ${otp}
            </div>

            <p><b>Note:</b> This OTP is valid for 5 minutes. Do not share it with anyone.</p>

            <hr />

            <p style="font-size:12px; color:gray;">
                If you did not request this, ignore this email.
            </p>

            <p style="font-size:12px; color:gray;">
                — LMS App Team
            </p>

        </div>
    `;
};