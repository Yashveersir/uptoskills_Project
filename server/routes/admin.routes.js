import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Guard all admin routes with authentication and role check
router.use(authenticate, requireAdmin);

router.get("/stats",             adminController.getStats);
router.get("/analytics",         adminController.getAnalytics);

router.get("/users",             adminController.getUsers);
router.post("/users",            adminController.createUser);
router.put("/users/:id",         adminController.updateUser);
router.delete("/users/:id",      adminController.deleteUser);

router.get("/courses",           adminController.getCourses);
router.post("/courses",          adminController.createCourse);
router.put("/courses/:id",       adminController.updateCourse);
router.patch("/courses/:id/status", adminController.updateCourseStatus);
router.delete("/courses/:id",    adminController.deleteCourse);

export default router;
