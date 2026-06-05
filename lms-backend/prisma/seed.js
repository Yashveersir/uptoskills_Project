import prisma from "../src/config/prisma.js";
import bcrypt from "bcryptjs";

const seed = async () => {
  try {
    console.log(" Seeding database...");

   
    // CLEAR OLD DATA
    

    await prisma.progress.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();
    await prisma.mentor.deleteMany();
    await prisma.oTP.deleteMany();

    console.log("🗑 Old data cleared");

    
    // ADMIN USER
    

    const adminPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    const admin = await prisma.user.upsert({
      where: {
        email: "admin@lms.com"
      },
      update: {},
      create: {
        name: "Admin",
        email: "admin@lms.com",
        password: adminPassword,
        role: "admin",
        verified: true
      }
    });

    console.log(" Admin created");

   
    // AI MENTORS
    

    const mentor1 = await prisma.mentor.create({
      data: {
        name: "Salman Khan AI",
        image: "salman.jpg"
      }
    });

    const mentor2 = await prisma.mentor.create({
      data: {
        name: "Elon Musk AI",
        image: "elon.jpg"
      }
    });

    const mentor3 = await prisma.mentor.create({
      data: {
        name: "Shah Rukh Khan AI",
        image: "srk.jpg"
      }
    });

    console.log(" Mentors created");

    
    // COURSES
    

    const nodeCourse = await prisma.course.create({
      data: {
        title: "Node.js Masterclass",
        description:
          "Learn Node.js from beginner to advanced.",
        category: "Backend",
        level: "Intermediate",
        status: "approved"
      }
    });

    const reactCourse = await prisma.course.create({
      data: {
        title: "React.js Masterclass",
        description:
          "Learn React.js from beginner to advanced.",
        category: "Frontend",
        level: "Intermediate",
        status: "approved"
      }
    });

    console.log(" Courses created");

   
    // LESSONS
    

    await prisma.lesson.createMany({
      data: [
        {
          title: "Introduction to Node.js",
          description: "Node.js basics",
          videoUrl: "https://youtube.com/demo1",
          duration: 10,
          courseId: nodeCourse.id
        },
        {
          title: "Express.js Fundamentals",
          description: "Express.js basics",
          videoUrl: "https://youtube.com/demo2",
          duration: 20,
          courseId: nodeCourse.id
        },
        {
          title: "JWT Authentication",
          description: "Authentication using JWT",
          videoUrl: "https://youtube.com/demo3",
          duration: 25,
          courseId: nodeCourse.id
        },
        {
          title: "React Basics",
          description: "Introduction to React",
          videoUrl: "https://youtube.com/demo4",
          duration: 15,
          courseId: reactCourse.id
        },
        {
          title: "React Components",
          description: "Understanding Components",
          videoUrl: "https://youtube.com/demo5",
          duration: 18,
          courseId: reactCourse.id
        }
      ]
    });

    console.log(" Lessons created");

    
    // SAMPLE ENROLLMENT
   

    await prisma.enrollment.create({
      data: {
        userId: admin.id,
        courseId: nodeCourse.id,
        mentorId: mentor1.id
      }
    });

    
    console.log("\nAdmin Login");
    console.log("Email: admin@lms.com");
    console.log("Password: Admin@123");

  } catch (error) {
    console.error(" Seed Error:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();