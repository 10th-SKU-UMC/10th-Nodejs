/*
  Warnings:

  - Added the required column `address` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `address` VARCHAR(255) NOT NULL;

-- RenameIndex
ALTER TABLE `user_store_review` RENAME INDEX `user_store_review_store_id_fkey` TO `store_id`;

-- RenameIndex
ALTER TABLE `user_store_review` RENAME INDEX `user_store_review_user_id_fkey` TO `user_id`;
