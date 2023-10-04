/*
  Warnings:

  - Added the required column `terms` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `terms` BOOLEAN NOT NULL;
