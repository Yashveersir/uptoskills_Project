/**
 * server/services/auth.service.js
 * ─────────────────────────────────────────────────────────────────────
 * Authentication Service
 * 
 * Contains business logic for user registration, user login, token
 * issuance, and password security.
 * ─────────────────────────────────────────────────────────────────────
 */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import { ValidationError, ConflictError, UnauthorizedError } from "../utils/errors.js";

class AuthService {
  /**
   * Signs a JWT token for the given user.
   * @param {object} user 
   * @returns {string} jwt token
   */
  signToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  /**
   * Formats the user record to return only safe/public attributes.
   * @param {object} user 
   * @returns {object} formatted user object
   */
  formatUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio || "",
      avatar: user.avatar || "",
    };
  }

  /**
   * Registers a new student account in the platform.
   */
  async register({ name, email, password }) {
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!trimmedName || !trimmedEmail || !password) {
      throw new ValidationError("Name, email, and password are required");
    }

    if (trimmedName.length < 2) {
      throw new ValidationError("Name must be at least 2 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new ValidationError("Invalid email address format");
    }

    if (typeof password !== "string" || password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters");
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecial) {
      throw new ValidationError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (existing) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name: trimmedName, email: trimmedEmail, password: hashedPassword, role: "student" },
    });

    const token = this.signToken(user);
    return { token, user: this.formatUser(user) };
  }

  /**
   * Authenticates user credentials and returns user metadata and a JWT.
   */
  async login({ email, password }) {
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!trimmedEmail || !password) {
      throw new ValidationError("Email and password are required");
    }

    const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = this.signToken(user);
    return { token, user: this.formatUser(user) };
  }
}

export default new AuthService();
