export const forgotPasswordTemplate = ({ otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; padding:20px; color:#333;">

        <h2 style="color:#ef4444;">Password Reset Request</h2>

        <p>Hello,</p>

        <p>We received a request to reset your password for your LMS account.</p>

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

        <p><b>Important:</b> This OTP is valid for 5 minutes.</p>

        <p>If you did not request this, you can safely ignore this email.</p>

        <br/>

        <p>— LMS App Team</p>

    </div>
    `;
};