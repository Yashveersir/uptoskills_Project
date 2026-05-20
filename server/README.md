# AI Learning Platform API

The backend is built with Express and Prisma, following an MVC-inspired router architecture.

## 📂 Folder Structure

```
server/
├── config/
│   └── env.js              # Centralised environment variables
├── db/
│   └── prisma.js           # Shared Prisma client instance
├── middleware/
│   └── auth.js             # JWT verification and role checking
├── routes/                 # Feature-specific route handlers
│   ├── auth.routes.js
│   ├── courses.routes.js
│   ├── enrollment.routes.js
│   ├── users.routes.js
│   └── admin.routes.js
├── utils/
│   └── response.js         # Standardised sendSuccess/sendError helpers
└── index.js                # App entry point (mounts routes)
```

## 🔌 API Endpoints

All endpoints are prefixed with `/api`.

### 1. Authentication (`/api/auth`)
* `POST /login` - Login with email/password
* `POST /register` - Create a new student account

### 2. Users (`/api/users`) - Requires Auth
* `GET /me` - Get current user profile
* `PUT /me` - Update current user profile
* `PUT /me/settings` - Update user settings
* `GET /me/enrollments` - Get current user's enrollments

### 3. Courses (`/api/courses`) - Public
* `GET /` - List all published courses
* `GET /:id` - Get single course details
* `GET /categories` - List course categories
* `GET /mentors` - List all mentors

### 4. Enrollments (`/api/enrollments`) - Requires Auth
* `POST /:courseId` - Enroll in a course
* `GET /:courseId/status` - Check if enrolled in a course

### 5. Admin (`/api/admin`) - Requires Auth + Admin Role
* `GET /stats` - Dashboard statistics
* `GET /analytics` - Detailed analytics
* `GET /users` - List all users
* `PUT /users/:id` - Update a user
* `DELETE /users/:id` - Delete a user
* `GET /courses` - List all courses (including unpublished)
* `POST /courses` - Create a course
* `PUT /courses/:id` - Update a course
* `PATCH /courses/:id/status` - Toggle course publish status
* `DELETE /courses/:id` - Delete a course

## 🛡️ Response Format

The API standardises all responses using the `sendSuccess` and `sendError` utilities:

**Success (2xx):**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": "Human readable error message"
}
```
