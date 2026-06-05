import { z } from "zod";

// REGISTER
export const registerSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters"),
  email: z.string()
    .email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, digit, and special character"
    ),
});

// LOGIN
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// VERIFY OTP
export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email format"),
  otp: z.string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

// RESEND OTP
export const resendOtpSchema = z.object({
  email: z.string().email("Invalid email format"),
  type: z.enum(["REGISTER", "LOGIN"]).default("REGISTER"),
});

// FORGOT PASSWORD
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

// RESET PASSWORD
export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, digit, and special character"
    ),
});
