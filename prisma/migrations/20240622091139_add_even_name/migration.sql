/*
  Warnings:

  - You are about to drop the column `addDescription` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `eventName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Location` DROP COLUMN `addDescription`;
