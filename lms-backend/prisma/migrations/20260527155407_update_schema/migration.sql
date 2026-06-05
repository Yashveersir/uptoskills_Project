-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "rejectionMessage" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE INDEX "Course_title_idx" ON "Course"("title");

-- CreateIndex
CREATE INDEX "Course_category_idx" ON "Course"("category");

-- CreateIndex
CREATE INDEX "Course_level_idx" ON "Course"("level");

-- CreateIndex
CREATE INDEX "Lesson_title_idx" ON "Lesson"("title");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
