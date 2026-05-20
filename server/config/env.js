/**
 * server/config/env.js
 * ─────────────────────────────────────────────────────────────────────
 * Centralised environment configuration.
 * Every variable used anywhere in the server is declared here with:
 *   • its env-var name
 *   • a safe development default
 *   • a comment explaining what it does
 *
 * Usage:  import { PORT, JWT_SECRET } from "../config/env.js";
 * ─────────────────────────────────────────────────────────────────────
 */

import "dotenv/config";

export const PORT = process.env.PORT || 5000;

/** Secret key used to sign / verify JWT tokens. Change in production! */
export const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

/** JWT token expiry — 7 days by default */
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * PostgreSQL / Prisma connection string.
 */
if (!process.env.DATABASE_URL) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("FATAL: DATABASE_URL environment variable is required in production!");
  } else {
    console.warn("⚠️  WARNING: DATABASE_URL is not set. Falling back to local default.");
  }
}

export const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/ai_learning_platform";

/** Allowed CORS origin(s). Set to your frontend URL in production. */
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

/** Node environment: "development" | "production" | "test" */
export const NODE_ENV = process.env.NODE_ENV || "development";
