/*
  Warnings:

  - Added the required column `currencyId` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Place` ADD COLUMN `placeTypeId` INTEGER,
    ADD COLUMN `hostingTypeId` INTEGER,
    ADD COLUMN `isOnlyForGuest` BOOLEAN,
    ADD COLUMN `maximumGuests` INTEGER,
    ADD COLUMN `bathrooms` INTEGER,
    ADD COLUMN `availableCheckIn` DATETIME(3),
    ADD COLUMN `availableCheckout` DATETIME(3),
    ADD COLUMN `basicFee` DECIMAL(65, 30),
    ADD COLUMN `minimumFee` DECIMAL(65, 30),
    ADD COLUMN `maximumFee` DECIMAL(65, 30),
    ADD COLUMN `currencyId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `buildingDetailTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BuildingDetailType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `buildingTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BuildingType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HostingType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlaceType` ADD FOREIGN KEY (`buildingDetailTypeId`) REFERENCES `BuildingDetailType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuildingDetailType` ADD FOREIGN KEY (`buildingTypeId`) REFERENCES `BuildingType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Place` ADD FOREIGN KEY (`placeTypeId`) REFERENCES `PlaceType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Place` ADD FOREIGN KEY (`hostingTypeId`) REFERENCES `HostingType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Place` ADD FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
