/**
 * server/services/course.service.js
 * ─────────────────────────────────────────────────────────────────────
 * Course Service
 * 
 * Contains business logic for listing, searching, catalog filtering,
 * and retrieval of courses, lessons, and mentors.
 * ─────────────────────────────────────────────────────────────────────
 */
import prisma from "../db/prisma.js";
import { NotFoundError } from "../utils/errors.js";

const DEFAULT_COURSE_IMAGE =
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop";

class CourseService {
  /**
   * Safe formatter for course attributes.
   */
  formatCourse(course) {
    return {
      id: course.id,
      title: course.title,
      description: course.description || "",
      image: course.image || DEFAULT_COURSE_IMAGE,
      level: course.level || "Beginner",
      type: "Course",
      duration: "6 Hours",
      rating: 4.8,
      reviews: "1.2k",
      students: "5,000",
      teacher: course.mentor?.name || course.author?.name || "AI Mentor",
      teacherImage: course.mentor?.image || "",
      category: course.category || "Development",
      mentorId: course.mentorId,
    };
  }

  /**
   * Lists all published courses, filtering by search query if provided.
   */
  async getCourses({ search = "" }) {
    const where = { published: true };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
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
      },
      orderBy: { createdAt: "desc" },
    });

    return courses.map(this.formatCourse);
  }

  /**
   * Returns list of all available celebrity mentors.
   */
  async getMentors() {
    return prisma.mentor.findMany({
      orderBy: { name: "asc" },
    });
  }

  /**
   * Returns dynamic distinct categories parsed from live courses.
   */
  async getCategories() {
    const categories = await prisma.course.findMany({
      distinct: ["category"],
      where: {
        published: true,
        category: { not: null },
      },
      select: { category: true },
      orderBy: { category: "asc" },
    });

    return categories.length
      ? categories.map(({ category }, index) => ({
          id: index + 1,
          name: category,
          slug: category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        }))
      : [
          { id: 1, name: "Development", slug: "development" },
          { id: 2, name: "Design", slug: "design" },
          { id: 3, name: "Career", slug: "career" },
        ];
  }

  /**
   * Returns a detailed course with lessons.
   */
  async getCourseById(id) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
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
        lessons: { orderBy: { order: "asc" } },
      },
    });

    if (!course || !course.published) {
      throw new NotFoundError("Course not found");
    }

    return {
      ...this.formatCourse(course),
      lessons: course.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description || "",
        videoUrl: lesson.videoUrl || "",
        duration: lesson.duration || "",
        order: lesson.order,
      })),
    };
  }
}

export default new CourseService();
