-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `kind` ENUM('IN_PERSON', 'ONLINE') NOT NULL,
    `description` TEXT NOT NULL,
    `durationLabel` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Course_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseWeek` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `weekNumber` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `outcomes` TEXT NOT NULL,
    `vocabulary` TEXT NOT NULL,
    `activity` TEXT NOT NULL,
    `homework` TEXT NOT NULL,
    `materialUrl` VARCHAR(191) NULL,

    INDEX `CourseWeek_courseId_idx`(`courseId`),
    UNIQUE INDEX `CourseWeek_courseId_weekNumber_key`(`courseId`, `weekNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Batch` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mode` ENUM('IN_PERSON', 'ONLINE', 'HYBRID') NOT NULL DEFAULT 'IN_PERSON',
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `daysLabel` VARCHAR(191) NOT NULL DEFAULT '',
    `capacity` INTEGER NOT NULL DEFAULT 12,
    `status` ENUM('UPCOMING', 'RUNNING', 'COMPLETED') NOT NULL DEFAULT 'UPCOMING',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Batch_courseId_idx`(`courseId`),
    INDEX `Batch_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'COMPLETED', 'PAUSED', 'DROPPED') NOT NULL DEFAULT 'ACTIVE',
    `paymentNote` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `leadId` VARCHAR(191) NULL,
    `batchId` VARCHAR(191) NULL,
    `enrolledAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Student_batchId_idx`(`batchId`),
    INDEX `Student_leadId_idx`(`leadId`),
    INDEX `Student_status_idx`(`status`),
    INDEX `Student_phone_idx`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CourseWeek` ADD CONSTRAINT `CourseWeek_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Batch` ADD CONSTRAINT `Batch_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `Batch`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
