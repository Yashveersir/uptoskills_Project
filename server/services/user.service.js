/**
 * server/services/user.service.js
 * ─────────────────────────────────────────────────────────────────────
 * User Management Service
 * 
 * Contains business logic for fetching/updating user profile info,
 * handling preferences, and listing course enrollments.
 * ─────────────────────────────────────────────────────────────────────
 */
import prisma from "../db/prisma.js";
import { ValidationError, NotFoundError } from "../utils/errors.js";

const DEFAULT_COURSE_IMAGE =
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop";

class UserService {
  /**
   * Safe formatter for user profiles.
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
   * Fetches user profile by primary key.
   */
  async getProfile(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return this.formatUser(user);
  }

  /**
   * Updates user name, bio, or avatar with dynamic validation.
   */
  async updateProfile(userId, { name, bio, avatar }) {
    const trimmedName = name !== undefined && typeof name === "string" ? name.trim() : name;
    const trimmedBio = bio !== undefined && typeof bio === "string" ? bio.trim() : bio;
    const trimmedAvatar = avatar !== undefined && typeof avatar === "string" ? avatar.trim() : avatar;

    if (trimmedName !== undefined) {
      if (!trimmedName || trimmedName.length < 2) {
        throw new ValidationError("Name must be at least 2 characters");
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(trimmedName !== undefined && { name: trimmedName }),
        ...(trimmedBio !== undefined && { bio: trimmedBio }),
        ...(trimmedAvatar !== undefined && { avatar: trimmedAvatar }),
      },
    });

    return this.formatUser(user);
  }

  /**
   * Updates user dashboard theme (dark/light/system).
   */
  async updateSettings(userId, { theme }) {
    // Note: theme column is not present in the current schema.prisma.
    // We return an acknowledgement directly to allow client preference tracking.
    return { settings: { theme: theme || "system" } };
  }

  /**
   * Fetches all courses current user has enrolled in.
   */
  async getEnrollments(userId) {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: { author: true, mentor: true },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    return enrollments.map((e) => ({
      id: e.id,
      courseId: e.courseId,
      title: e.course?.title || "Unknown Course",
      description: e.course?.description || "",
      image: e.course?.image || DEFAULT_COURSE_IMAGE,
      teacher: e.course?.mentor?.name || e.course?.author?.name || "AI Mentor",
      progress: e.progress || 0,
      status: e.status || "active",
      enrolledAt: e.enrolledAt,
      level: e.course?.level || "Beginner",
      category: e.course?.category || "Development",
    }));
  }
}

export default new UserService();
