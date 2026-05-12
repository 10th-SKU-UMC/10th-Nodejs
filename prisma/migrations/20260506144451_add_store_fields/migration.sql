/*
  Warnings:

  - Added the required column `category` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `category` VARCHAR(100) NOT NULL,
    ADD COLUMN `region` VARCHAR(100) NOT NULL;
