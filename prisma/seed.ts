import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data in correct dependency order
  console.log("🗑️ Clearing existing data...");
  await prisma.lesson.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.mentor.deleteMany();
  await prisma.user.deleteMany();
  console.log("🗑️ Cleared existing data");

  const hashedPassword = await bcrypt.hash("Demo@123456", 10);
  const adminPassword = await bcrypt.hash("Admin@123456", 10);

  // Create sample users
  const demoUser = await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
      password: hashedPassword,
      role: "student",
      bio: "Passionate learner exploring AI and Development",
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "admin",
      bio: "Platform administrator",
    },
  });

  console.log("✅ Created users");

  // Create mentors
  const srk = await prisma.mentor.create({
    data: {
      name: "Shah Rukh Khan",
      role: "Leadership & Communication Mentor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      bio: "Learn leadership and communication skills from the Bollywood icon.",
    }
  });
  const deepika = await prisma.mentor.create({
    data: {
      name: "Deepika Padukone",
      role: "Wellness & Mindfulness Mentor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      bio: "Master wellness and mindfulness practices.",
    }
  });
  const sundar = await prisma.mentor.create({
    data: {
      name: "Sundar Pichai",
      role: "Tech Innovation Mentor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      bio: "Learn tech innovation and leadership from Silicon Valley.",
    }
  });
  const satya = await prisma.mentor.create({
    data: {
      name: "Satya Nadella",
      role: "Cloud Computing Mentor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      bio: "Master cloud computing and enterprise leadership.",
    }
  });

  console.log("✅ Created mentors");

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive bootcamp.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      level: "Beginner",
      category: "Development",
      published: true,
      enrollmentLimit: 500,
      authorId: adminUser.id,
      mentorId: sundar.id,
    }
  });
  const course2 = await prisma.course.create({
    data: {
      title: "Python for Data Science",
      description: "Master Python programming and data science with real-world projects.",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop",
      level: "Intermediate",
      category: "Data Science",
      published: true,
      enrollmentLimit: 300,
      authorId: adminUser.id,
      mentorId: satya.id,
    }
  });
  const course3 = await prisma.course.create({
    data: {
      title: "AI & Machine Learning Fundamentals",
      description: "Start your AI journey with fundamental concepts and hands-on projects.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
      level: "Beginner",
      category: "AI & ML",
      published: true,
      enrollmentLimit: 400,
      authorId: adminUser.id,
      mentorId: sundar.id,
    }
  });
  const course4 = await prisma.course.create({
    data: {
      title: "UI/UX Design Masterclass",
      description: "Learn to design beautiful, user-friendly interfaces from scratch.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      level: "Beginner",
      category: "Design",
      published: true,
      enrollmentLimit: 350,
      authorId: adminUser.id,
      mentorId: deepika.id,
    }
  });
  const course5 = await prisma.course.create({
    data: {
      title: "Leadership & Communication Skills",
      description: "Develop essential leadership and communication skills for the modern workplace.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
      level: "Intermediate",
      category: "Career",
      published: true,
      enrollmentLimit: 200,
      authorId: adminUser.id,
      mentorId: srk.id,
    }
  });
  const course6 = await prisma.course.create({
    data: {
      title: "Cloud Architecture with AWS",
      description: "Master cloud architecture and deploy scalable applications on AWS.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
      level: "Advanced",
      category: "Cloud",
      published: true,
      enrollmentLimit: 250,
      authorId: adminUser.id,
      mentorId: satya.id,
    }
  });

  console.log("✅ Created courses");

  // Create enrollments for demo user
  await prisma.enrollment.createMany({
    data: [
      {
        userId: demoUser.id,
        courseId: course1.id,
        progress: 65,
        status: "active",
      },
      {
        userId: demoUser.id,
        courseId: course2.id,
        progress: 32,
        status: "active",
      },
      {
        userId: demoUser.id,
        courseId: course3.id,
        progress: 12,
        status: "active",
      },
    ],
  });

  console.log("✅ Created enrollments");

  // Create lessons for first course
  await prisma.lesson.createMany({
    data: [
      {
        title: "Introduction to Web Development",
        description: "Overview of web development and what you'll learn.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "12:45",
        order: 1,
        courseId: course1.id,
      },
      {
        title: "HTML Fundamentals",
        description: "Learn the building blocks of web pages.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "18:20",
        order: 2,
        courseId: course1.id,
      },
      {
        title: "CSS Styling Basics",
        description: "Master CSS for beautiful web design.",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        duration: "24:15",
        order: 3,
        courseId: course1.id,
      },
      {
        title: "JavaScript Fundamentals",
        description: "Add interactivity to your web pages.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "30:00",
        order: 4,
        courseId: course1.id,
      },
    ],
  });

  console.log("✅ Created lessons");

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });