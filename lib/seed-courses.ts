import type { PrismaClient } from "@prisma/client"
import {
  IN_PERSON_WEEKS,
  ONLINE_BEGINNER_WEEKS,
  ONLINE_INTERMEDIATE_WEEKS,
  type WeekSeed,
} from "@/lib/curriculum"

const COURSES = [
  {
    slug: "spoken-3-month",
    name: "Spoken Arabic — 3 months (in person)",
    kind: "IN_PERSON" as const,
    description:
      "Riyadh in-person program. 3 days a week from greetings to workplace conversation.",
    durationLabel: "3 months · 12 weeks",
    sortOrder: 0,
    weeks: IN_PERSON_WEEKS,
  },
  {
    slug: "online-beginner",
    name: "Online Beginner (Level 1)",
    kind: "ONLINE" as const,
    description: "8-week live online track for complete beginners.",
    durationLabel: "8 weeks",
    sortOrder: 1,
    weeks: ONLINE_BEGINNER_WEEKS,
  },
  {
    slug: "online-intermediate",
    name: "Online Intermediate (Level 2)",
    kind: "ONLINE" as const,
    description: "8-week live online track for students who already greet and shop.",
    durationLabel: "8 weeks",
    sortOrder: 2,
    weeks: ONLINE_INTERMEDIATE_WEEKS,
  },
]

async function seedWeeks(
  prisma: PrismaClient,
  courseId: string,
  weeks: WeekSeed[],
) {
  const existing = await prisma.courseWeek.count({ where: { courseId } })
  if (existing > 0) return
  await prisma.courseWeek.createMany({
    data: weeks.map((w) => ({
      courseId,
      weekNumber: w.weekNumber,
      title: w.title,
      outcomes: w.outcomes,
      vocabulary: w.vocabulary,
      activity: w.activity,
      homework: w.homework,
    })),
  })
}

export async function seedCoursesAndSyllabus(prisma: PrismaClient) {
  for (const course of COURSES) {
    const row = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: {
        slug: course.slug,
        name: course.name,
        kind: course.kind,
        description: course.description,
        durationLabel: course.durationLabel,
        published: true,
        sortOrder: course.sortOrder,
      },
    })
    await seedWeeks(prisma, row.id, course.weeks)
  }

  return {
    courses: await prisma.course.count(),
    weeks: await prisma.courseWeek.count(),
    batches: await prisma.batch.count(),
    students: await prisma.student.count(),
  }
}
