import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  console.log("--- DATABASE STATE ---");
  console.log("Users:", await prisma.user.count());
  console.log("Courses:", await prisma.course.count());
  console.log("Mentors:", await prisma.mentor.count());
  console.log("Lessons:", await prisma.lesson.count());
  console.log("Enrollments:", await prisma.enrollment.count());
  
  console.log("\n--- USERS ---");
  const users = await prisma.user.findMany();
  console.log(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));

  console.log("\n--- COURSES ---");
  const courses = await prisma.course.findMany();
  console.log(courses.map(c => ({ id: c.id, title: c.title, published: c.published })));

  console.log("\n--- ENROLLMENTS ---");
  const enrollments = await prisma.enrollment.findMany();
  console.log(enrollments);
}

run()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
