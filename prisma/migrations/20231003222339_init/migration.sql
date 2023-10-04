/*
  Warnings:

  - Made the column `date` on table `reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `reservation` MODIFY `date` DATETIME(3) NOT NULL;
