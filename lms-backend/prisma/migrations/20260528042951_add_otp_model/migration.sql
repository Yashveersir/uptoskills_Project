/*
  Warnings:

  - A unique constraint covering the columns `[email,type]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "OTP_email_idx" ON "OTP"("email");

-- CreateIndex
CREATE INDEX "OTP_type_idx" ON "OTP"("type");

-- CreateIndex
CREATE UNIQUE INDEX "OTP_email_type_key" ON "OTP"("email", "type");
