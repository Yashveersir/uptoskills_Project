/**
 * server/db/prisma.js
 * ─────────────────────────────────────────────────────────────────────
 * Shared Prisma Client instance.
 *
 * Import this wherever you need DB access — never create a new
 * PrismaClient in a route file. One client = one connection pool.
 *
 * Usage:  import prisma from "../db/prisma.js";
 * ─────────────────────────────────────────────────────────────────────
 */

import { PrismaClient } from "../../generated/prisma/index.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../config/env.js";

const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;
