import "dotenv/config";

import express from "express";
import cors from "cors";
<<<<<<< HEAD
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
=======

import { errorMiddleware } from "./middleware/errorMiddleware.js";
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
<<<<<<< HEAD
import notificationRoutes from "./routes/notificationRoutes.js";





const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(apiLimiter);

// Swagger
app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Root Route
=======

const app = express();

app.use(cors());
app.use(express.json());

>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
app.get("/", (req, res) => {
    res.send("LMS Backend Running");
});

<<<<<<< HEAD
// Routes
=======
// ROUTES
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/upload", uploadRoutes);
<<<<<<< HEAD
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// Error Handler (always last)
=======

// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// ERROR HANDLER
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});