/*
  Warnings:

  - Made the column `userId` on table `loan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookId` on table `loan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `Loan_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `Loan_userId_fkey`;

-- DropIndex
DROP INDEX `Loan_bookId_fkey` ON `loan`;

-- DropIndex
DROP INDEX `Loan_userId_fkey` ON `loan`;

-- AlterTable
ALTER TABLE `loan` MODIFY `userId` INTEGER NOT NULL,
    MODIFY `bookId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
