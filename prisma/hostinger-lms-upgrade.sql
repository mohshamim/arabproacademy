-- LMS tables: attendance, quizzes, oral exams, homework, certificates
-- phpMyAdmin → u506363420_arabpro → Import (does not drop existing tables)

ALTER TABLE `CourseWeek` ADD COLUMN `audioUrl` TEXT NULL;
ALTER TABLE `CourseWeek` ADD COLUMN `recordingUrl` TEXT NULL;
ALTER TABLE `CourseWeek` MODIFY `materialUrl` TEXT NULL;

CREATE TABLE IF NOT EXISTS `ClassSession` (
    `id` VARCHAR(191) NOT NULL,
    `batchId` VARCHAR(191) NOT NULL,
    `heldOn` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `ClassSession_batchId_idx`(`batchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `status` ENUM('PRESENT', 'LATE', 'ABSENT') NOT NULL DEFAULT 'PRESENT',
    UNIQUE INDEX `Attendance_sessionId_studentId_key`(`sessionId`, `studentId`),
    INDEX `Attendance_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Quiz` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `kind` ENUM('PLACEMENT', 'WEEKLY', 'LISTENING') NOT NULL,
    `courseId` VARCHAR(191) NULL,
    `weekId` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `Quiz_slug_key`(`slug`),
    INDEX `Quiz_kind_idx`(`kind`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `QuizQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `prompt` TEXT NOT NULL,
    `choiceA` VARCHAR(191) NOT NULL,
    `choiceB` VARCHAR(191) NOT NULL,
    `choiceC` VARCHAR(191) NOT NULL,
    `choiceD` VARCHAR(191) NOT NULL,
    `correct` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    INDEX `QuizQuestion_quizId_idx`(`quizId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `QuizAttempt` (
    `id` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `score` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `answers` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `QuizAttempt_quizId_idx`(`quizId`),
    INDEX `QuizAttempt_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `OralExam` (
    `id` VARCHAR(191) NOT NULL,
    `batchId` VARCHAR(191) NOT NULL,
    `kind` ENUM('MID', 'FINAL') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `heldOn` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `OralExam_batchId_idx`(`batchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `OralExamResult` (
    `id` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `pronunciation` INTEGER NOT NULL,
    `vocabulary` INTEGER NOT NULL,
    `fluency` INTEGER NOT NULL,
    `understanding` INTEGER NOT NULL,
    `passed` BOOLEAN NOT NULL DEFAULT false,
    `notes` TEXT NULL,
    UNIQUE INDEX `OralExamResult_examId_studentId_key`(`examId`, `studentId`),
    INDEX `OralExamResult_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `HomeworkEntry` (
    `id` VARCHAR(191) NOT NULL,
    `weekId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `voiceUrl` TEXT NULL,
    `notes` TEXT NULL,
    `score` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `HomeworkEntry_weekId_idx`(`weekId`),
    INDEX `HomeworkEntry_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Certificate` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `issuedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `Certificate_code_key`(`code`),
    INDEX `Certificate_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `ClassSession` ADD CONSTRAINT `ClassSession_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `Batch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ClassSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_weekId_fkey` FOREIGN KEY (`weekId`) REFERENCES `CourseWeek`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `QuizQuestion` ADD CONSTRAINT `QuizQuestion_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `QuizAttempt` ADD CONSTRAINT `QuizAttempt_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `QuizAttempt` ADD CONSTRAINT `QuizAttempt_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `OralExam` ADD CONSTRAINT `OralExam_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `Batch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `OralExamResult` ADD CONSTRAINT `OralExamResult_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `OralExam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `OralExamResult` ADD CONSTRAINT `OralExamResult_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `HomeworkEntry` ADD CONSTRAINT `HomeworkEntry_weekId_fkey` FOREIGN KEY (`weekId`) REFERENCES `CourseWeek`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `HomeworkEntry` ADD CONSTRAINT `HomeworkEntry_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`)
SELECT UUID(), 'hostinger-lms-upgrade', NOW(3), '20260821060000_lms_complete', NULL, NULL, NOW(3), 1
WHERE NOT EXISTS (
  SELECT 1 FROM `_prisma_migrations` WHERE `migration_name` = '20260821060000_lms_complete'
);
