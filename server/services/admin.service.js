/**
 * server/services/admin.service.js
 * ─────────────────────────────────────────────────────────────────────
 * Admin Management Service
 * 
 * Contains business logic and database operations for platform administration
 * including system metrics, user governance, and course oversight.
 * ─────────────────────────────────────────────────────────────────────
 */

import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import { ValidationError, NotFoundError, ConflictError } from "../utils/errors.js";

const DEFAULT_COURSE_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop";

const ALLOWED_ROLES = new Set(["student", "intern", "mentor", "admin"]);

const courseInclude = {
  author: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      bio: true,
      avatar: true,
    },
  },
  mentor: true,
  _count: { select: { enrollments: true } },
};

class AdminService {
  /**
   * Safe formatter for course attributes.
   */
  formatAdminCourse(course) {
    return {
      id: course.id,
      title: course.title,
      description: course.description || "",
      image: course.image || DEFAULT_COURSE_IMAGE,
      teacher: course.mentor?.name || course.author?.name || "Admin",
      teacherId: course.mentorId ? String(course.mentorId) : "",
      students: String(course._count?.enrollments ?? 0),
      status: course.published ? "Live" : "Pending",
      category: course.category || "Development",
      level: course.level || "Beginner",
      enrollmentLimit: course.enrollmentLimit,
      rating: "4.8",
      reviews: "0",
    };
  }

  /**
   * Safe formatter for user profiles.
   */
  formatAdminUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: "Active",
      joined: user.createdAt.toISOString().split("T")[0],
      cohortSize: 0,
    };
  }

  /**
   * Validate user governances payloads.
   */
  validateUserPayload({ name, email, role, password }, { requirePassword = false } = {}) {
    if (name !== undefined && (!name || name.trim().length < 2)) {
      throw new ValidationError("Name must be at least 2 characters");
    }

    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new ValidationError("Invalid email address");
      }
    }

    if (role !== undefined && !ALLOWED_ROLES.has(role)) {
      throw new ValidationError("Invalid user role");
    }

    if ((requirePassword || password) && (!password || password.length < 8)) {
      throw new ValidationError("Password must be at least 8 characters");
    }
  }

  /**
   * Fetches platform overview metrics.
   */
  async getStats() {
    const [totalUsers, totalCourses, activeEnrollments, pendingApprovals] = await Promise.all([
      prisma.user.count(),
      prisma.course.count({ where: { published: true } }),
      prisma.enrollment.count({ where: { status: "active" } }),
      prisma.course.count({ where: { published: false } }),
    ]);

    return {
      totalUsers,
      totalCourses,
      enrollmentsThisWeek: activeEnrollments,
      completionRate: 68,
      pendingApprovals,
      systemHealth: 99.9,
    };
  }

  /**
   * Fetches platform deep analytics.
   */
  async getAnalytics() {
    const [totalCourses, activeEnrollments, coursesByCategory] = await Promise.all([
      prisma.course.count({ where: { published: true } }),
      prisma.enrollment.count({ where: { status: "active" } }),
      prisma.course.groupBy({
        by: ["category"],
        _count: true,
        where: { published: true },
      }),
    ]);

    const colors = ["bg-blue-500", "bg-orange-500", "bg-purple-500", "bg-pink-500"];
    const categories = coursesByCategory.map((category, index) => ({
      label: category.category || "Other",
      percent: totalCourses ? Math.round((category._count / totalCourses) * 100) : 0,
      color: colors[index % colors.length],
    }));

    return {
      stats: [
        { label: "Total Revenue", value: "$45,231", trend: "+12.5%", isUp: true },
        { label: "Active Students", value: activeEnrollments.toLocaleString(), trend: "+18.2%", isUp: true },
        { label: "Course Completion", value: "86%", trend: "-2.4%", isUp: false },
        { label: "Platform Rating", value: "4.9", trend: "+0.1%", isUp: true },
      ],
      enrollmentTrend: [45, 60, 35, 80, 55, 90, 70, 45, 60, 35, 80, 55],
      categories: categories.length
        ? categories
        : [
            { label: "Development", percent: 40, color: "bg-blue-500" },
            { label: "Data Science", percent: 25, color: "bg-orange-500" },
            { label: "AI & ML", percent: 20, color: "bg-purple-500" },
            { label: "Design", percent: 15, color: "bg-pink-500" },
          ],
    };
  }

  /**
   * Lists all users.
   */
  async getUsers() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return users.map(this.formatAdminUser);
  }

  /**
   * Creates a new user in the platform.
   */
  async createUser({ name, email, role, password }) {
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    this.validateUserPayload({ name: trimmedName, email: trimmedEmail, role, password }, { requirePassword: true });

    const existing = await prisma.user.findUnique({ where: { email: trimmedEmail }, select: { id: true } });
    if (existing) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        role: role || "student",
        password: hashedPassword,
      },
    });

    return this.formatAdminUser(user);
  }

  /**
   * Updates an existing user's attributes.
   */
  async updateUser(id, { name, email, role, password, cohortSize }) {
    this.validateUserPayload({ name, email, role, password });

    const updateData = {
      ...(name !== undefined && { name: name.trim() }),
      ...(email !== undefined && { email: email.trim().toLowerCase() }),
      ...(role !== undefined && { role }),
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    try {
      const user = await prisma.user.update({ where: { id }, data: updateData });
      return {
        ...this.formatAdminUser(user),
        cohortSize: cohortSize ? Number.parseInt(cohortSize, 10) || 0 : 0,
      };
    } catch (err) {
      if (err.code === "P2002") throw new ConflictError("Email already registered");
      if (err.code === "P2025") throw new NotFoundError("User not found");
      throw err;
    }
  }

  /**
   * Deletes a user profile safely.
   */
  async deleteUser(id, currentAdminId) {
    if (id === currentAdminId) {
      throw new ValidationError("You cannot delete your own account");
    }

    const authoredCourses = await prisma.course.count({ where: { authorId: id } });
    if (authoredCourses > 0) {
      throw new ConflictError("Reassign or delete this user's courses before deleting the user");
    }

    try {
      await prisma.$transaction([
        prisma.enrollment.deleteMany({ where: { userId: id } }),
        prisma.user.delete({ where: { id } }),
      ]);
    } catch (err) {
      if (err.code === "P2025") throw new NotFoundError("User not found");
      throw err;
    }
  }

  /**
   * Lists all courses.
   */
  async getCourses() {
    const courses = await prisma.course.findMany({
      include: courseInclude,
      orderBy: { createdAt: "desc" },
    });
    return courses.map(this.formatAdminCourse);
  }

  /**
   * Creates a new course under the admin.
   */
  async createCourse({ title, description, image, level, category, enrollmentLimit, mentorId }, authorId) {
    const trimmedTitle = typeof title === "string" ? title.trim() : "";
    if (!trimmedTitle || trimmedTitle.length < 3) {
      throw new ValidationError("Course title must be at least 3 characters");
    }

    const parsedMentorId = mentorId ? Number.parseInt(mentorId, 10) || null : null;

    const course = await prisma.course.create({
      data: {
        title: trimmedTitle,
        description: typeof description === "string" ? description.trim() : "",
        image: typeof image === "string" ? image.trim() : null,
        level: typeof level === "string" ? level.trim() : "Beginner",
        category: typeof category === "string" ? category.trim() : "Development",
        published: true,
        enrollmentLimit: enrollmentLimit ? Number.parseInt(enrollmentLimit, 10) || 500 : 500,
        authorId,
        mentorId: parsedMentorId,
      },
      include: courseInclude,
    });

    return this.formatAdminCourse(course);
  }

  /**
   * Updates an existing course.
   */
  async updateCourse(id, { title, description, image, level, category, enrollmentLimit, mentorId }) {
    if (title !== undefined && (!title || title.trim().length < 3)) {
      throw new ValidationError("Course title must be at least 3 characters");
    }

    if (enrollmentLimit !== undefined) {
      const parsedLimit = Number.parseInt(enrollmentLimit, 10);
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        throw new ValidationError("Enrollment limit must be a positive number");
      }
    }

    const updateData = {
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: typeof description === "string" ? description.trim() : "" }),
      ...(image !== undefined && { image: typeof image === "string" ? image.trim() : null }),
      ...(level !== undefined && { level: typeof level === "string" ? level.trim() : "Beginner" }),
      ...(category !== undefined && { category: typeof category === "string" ? category.trim() : "Development" }),
      ...(enrollmentLimit !== undefined && { enrollmentLimit: Number.parseInt(enrollmentLimit, 10) }),
      ...(mentorId !== undefined && { mentorId: mentorId ? Number.parseInt(mentorId, 10) || null : null }),
    };

    try {
      const course = await prisma.course.update({
        where: { id },
        data: updateData,
        include: courseInclude,
      });
      return this.formatAdminCourse(course);
    } catch (err) {
      if (err.code === "P2025") throw new NotFoundError("Course not found");
      throw err;
    }
  }

  /**
   * Updates course publication status.
   */
  async updateCourseStatus(id, isPublished) {
    if (typeof isPublished !== "boolean") {
      throw new ValidationError("isPublished must be a boolean");
    }

    try {
      const course = await prisma.course.update({
        where: { id },
        data: { published: isPublished },
        include: courseInclude,
      });
      return this.formatAdminCourse(course);
    } catch (err) {
      if (err.code === "P2025") throw new NotFoundError("Course not found");
      throw err;
    }
  }

  /**
   * Deletes a course safely.
   */
  async deleteCourse(id) {
    try {
      await prisma.$transaction([
        prisma.enrollment.deleteMany({ where: { courseId: id } }),
        prisma.lesson.deleteMany({ where: { courseId: id } }),
        prisma.course.delete({ where: { id } }),
      ]);
    } catch (err) {
      if (err.code === "P2025") throw new NotFoundError("Course not found");
      throw err;
    }
  }
}

export default new AdminService();
