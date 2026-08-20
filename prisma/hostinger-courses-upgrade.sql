-- Arab Pro Academy — add courses / syllabus / batches / students
-- phpMyAdmin → u506363420_arabpro → Import this file (does not wipe existing tables)

CREATE TABLE IF NOT EXISTS `Course` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `kind` ENUM('IN_PERSON', 'ONLINE') NOT NULL,
    `description` TEXT NOT NULL,
    `durationLabel` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `Course_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `CourseWeek` (
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

CREATE TABLE IF NOT EXISTS `Batch` (
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
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `Batch_courseId_idx`(`courseId`),
    INDEX `Batch_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Student` (
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
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `Student_batchId_idx`(`batchId`),
    INDEX `Student_leadId_idx`(`leadId`),
    INDEX `Student_status_idx`(`status`),
    INDEX `Student_phone_idx`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`)
SELECT UUID(), 'hostinger-courses-upgrade', NOW(3), '20260821010000_courses_batches_students', NULL, NULL, NOW(3), 1
WHERE NOT EXISTS (
  SELECT 1 FROM `_prisma_migrations` WHERE `migration_name` = '20260821010000_courses_batches_students'
);
