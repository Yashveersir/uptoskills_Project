import { PrismaClient } from "../generated/prisma/index.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://ef3dcd5e1c20ec6facace6dc0437f6ebcb6c15a42b52559ccd46ca8080d255df:sk_mmBQFVCSWnE-xjFdau6dS@db.prisma.io:5432/postgres?sslmode=require";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Clear existing data (order matters for foreign keys) ──────────────────
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.mentor.deleteMany();
  await prisma.user.deleteMany();
  console.log("🗑️  Cleared existing data");

  // ── Mentors ───────────────────────────────────────────────────────────────
  const mentors = await Promise.all([
    prisma.mentor.create({
      data: {
        name: "Shah Rukh Khan",
        role: "Business & Charisma",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg",
        bio: "The King of Bollywood teaches business ethics and communication.",
      },
    }),
    prisma.mentor.create({
      data: {
        name: "Deepika Padukone",
        role: "Visual Arts & Wellness",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Deepika_Padukone_2025_%281%29.png/500px-Deepika_Padukone_2025_%281%29.png",
        bio: "Deepika guides you through design and mindfulness.",
      },
    }),
    prisma.mentor.create({
      data: {
        name: "Akshay Kumar",
        role: "Discipline & Full-Stack Dev",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Akshay_Kumar_National_Award_for_Padman_%28cropped%29.jpg",
        bio: "Akshay's legendary discipline guides you through Full-Stack development.",
      },
    }),
    prisma.mentor.create({
      data: {
        name: "Alia Bhatt",
        role: "Modern Tech & Innovation",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Alia_Bhatt_at_Berlinale_2022_Ausschnitt.jpg/960px-Alia_Bhatt_at_Berlinale_2022_Ausschnitt.jpg",
        bio: "Alia brings a fresh perspective to tech and innovation.",
      },
    }),
  ]);
  console.log("✅ Mentors created");

  // ── Users ─────────────────────────────────────────────────────────────────
  const demoHash  = await bcrypt.hash("Demo@123456", 10);
  const adminHash = await bcrypt.hash("Admin@123456", 10);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: adminHash,
      name: "Admin User",
      role: "admin",
      bio: "Platform Administrator",
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      email: "demo@example.com",
      password: demoHash,
      name: "Demo User",
      role: "student",
      bio: "Passionate learner exploring AI and Development.",
    },
  });
  console.log("✅ Users created");
  console.log("   Admin → admin@example.com / Admin@123456");
  console.log("   Demo  → demo@example.com  / Demo@123456");

  // ── Courses ───────────────────────────────────────────────────────────────
  const coursesData = [
    {
      title: "CSS Mastery: Modern Layouts and Animations",
      description: "Master modern CSS techniques including Flexbox, Grid, and advanced animations to build stunning, responsive UIs.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
      level: "Intermediate",
      category: "Design",
      published: true,
      enrollmentLimit: 500,
      authorId: adminUser.id,
      mentorId: mentors[0].id,
    },
    {
      title: "Python for Data Science: From Zero to Hero",
      description: "Deep dive into Python programming with a focus on data analysis and visualization using real-world datasets.",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop",
      level: "Beginner",
      category: "Development",
      published: true,
      enrollmentLimit: 500,
      authorId: adminUser.id,
      mentorId: mentors[3].id,
    },
    {
      title: "Full-Stack MERN: Build Real World Apps",
      description: "Comprehensive guide to MongoDB, Express, React, and Node.js. Build production-ready applications from scratch.",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop",
      level: "Advanced",
      category: "Development",
      published: true,
      enrollmentLimit: 500,
      authorId: adminUser.id,
      mentorId: mentors[2].id,
    },
    {
      title: "React Advanced: Patterns and Performance",
      description: "Optimize your React applications with advanced patterns, code splitting, and performance best practices.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
      level: "Advanced",
      category: "Development",
      published: true,
      enrollmentLimit: 500,
      authorId: adminUser.id,
      mentorId: mentors[0].id,
    },
    {
      title: "JavaScript Pro: Mastering the Core Engine",
      description: "Deep dive into JavaScript closures, prototypes, event loop and async patterns that every senior dev must know.",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop",
      level: "Intermediate",
      category: "Development",
      published: true,
      enrollmentLimit: 500,
      authorId: adminUser.id,
      mentorId: mentors[0].id,
    },
    {
      title: "UI/UX Design: Principles and Prototyping",
      description: "Design modern, user-centric interfaces using Figma. Learn UX research, wireframing, and prototyping.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      level: "Beginner",
      category: "Design",
      published: true,
      enrollmentLimit: 500,
      authorId: adminUser.id,
      mentorId: mentors[1].id,
    },
    {
      title: "AI & Machine Learning Fundamentals",
      description: "Learn the core concepts of machine learning, neural networks, and AI-driven applications with hands-on projects.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
      level: "Intermediate",
      category: "AI & ML",
      published: true,
      enrollmentLimit: 500,
      authorId: adminUser.id,
      mentorId: mentors[3].id,
    },
  ];

  const courses = await Promise.all(
    coursesData.map((c) => prisma.course.create({ data: c }))
  );
  console.log(`✅ ${courses.length} courses created`);

  // ── Lessons for first course ──────────────────────────────────────────────
  await Promise.all([
    prisma.lesson.create({ data: { title: "Introduction to CSS Mastery", description: "Opening lesson introducing core CSS concepts.", duration: "12:45", order: 1, courseId: courses[0].id } }),
    prisma.lesson.create({ data: { title: "Flexbox Deep Dive", description: "Master Flexbox layout with real examples.", duration: "18:20", order: 2, courseId: courses[0].id } }),
    prisma.lesson.create({ data: { title: "CSS Grid Systems", description: "Build complex layouts with CSS Grid.", duration: "24:15", order: 3, courseId: courses[0].id } }),
    prisma.lesson.create({ data: { title: "Animations & Transitions", description: "Add life to your UI with keyframes and transitions.", duration: "32:10", order: 4, courseId: courses[0].id } }),
  ]);
  console.log("✅ Lessons created");

  // ── Demo enrollment ───────────────────────────────────────────────────────
  await prisma.enrollment.create({
    data: {
      userId: demoUser.id,
      courseId: courses[0].id,
      status: "active",
      progress: 35,
    },
  });
  await prisma.enrollment.create({
    data: {
      userId: demoUser.id,
      courseId: courses[1].id,
      status: "active",
      progress: 70,
    },
  });
  console.log("✅ Demo enrollments created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("─────────────────────────────────────────");
  console.log("  Admin:   admin@example.com / Admin@123456");
  console.log("  Student: demo@example.com  / Demo@123456");
  console.log("─────────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });