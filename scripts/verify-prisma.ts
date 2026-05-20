import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL not set");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verify() {
  try {
    // Test read - count users
    const userCount = await prisma.user.count();
    console.log(`✅ Connected! Found ${userCount} users.`);
    
    // Test read - get courses
    const courses = await prisma.course.findMany({ take: 3 });
    console.log(`✅ Found ${courses.length} courses.`);
    
    console.log("\n✅ Prisma Postgres setup verified successfully!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();