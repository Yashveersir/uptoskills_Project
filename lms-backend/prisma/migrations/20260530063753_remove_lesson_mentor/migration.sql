/*
  Warnings:

  - You are about to drop the column `mentorId` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `mentorId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `OTP` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OtpType" AS ENUM ('REGISTER', 'LOGIN', 'RESET_PASSWORD');

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_mentorId_fkey";

-- DropIndex
DROP INDEX "OTP_type_idx";

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "mentorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "mentorId";

-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "OtpType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OTP_email_type_key" ON "OTP"("email", "type");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
