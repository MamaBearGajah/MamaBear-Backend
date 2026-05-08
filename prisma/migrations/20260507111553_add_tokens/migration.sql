-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExp" TIMESTAMP(3),
ADD COLUMN     "verifyToken" TEXT,
ADD COLUMN     "verifyTokenExp" TIMESTAMP(3);
