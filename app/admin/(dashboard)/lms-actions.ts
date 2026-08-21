"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"

function str(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim()
}

function bool(form: FormData, key: string) {
  const v = form.get(key)
  return v === "on" || v === "true" || v === "1"
}

function dateOrNull(value: string) {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function certCode() {
  const n = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `APA-${n}`
}

export async function createClassSession(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const batchId = str(formData, "batchId")
  const created = await prisma.classSession.create({
    data: {
      batchId,
      title: str(formData, "title") || "Class",
      heldOn: dateOrNull(str(formData, "heldOn")) || new Date(),
      notes: str(formData, "notes") || null,
    },
  })
  revalidatePath("/admin/attendance")
  redirect(`/admin/attendance/${created.id}`)
}

export async function deleteClassSession(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.classSession.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/attendance")
  redirect("/admin/attendance")
}

export async function saveAttendance(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const sessionId = str(formData, "sessionId")
  const studentIds = formData.getAll("studentId").map((v) => String(v))
  for (const studentId of studentIds) {
    const status = str(formData, `status_${studentId}`) as
      | "PRESENT"
      | "LATE"
      | "ABSENT"
    await prisma.attendance.upsert({
      where: { sessionId_studentId: { sessionId, studentId } },
      update: { status: status || "PRESENT" },
      create: {
        sessionId,
        studentId,
        status: status || "PRESENT",
      },
    })
  }
  revalidatePath(`/admin/attendance/${sessionId}`)
  revalidatePath("/admin/attendance")
}

export async function upsertQuiz(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    kind: str(formData, "kind") as "PLACEMENT" | "WEEKLY" | "LISTENING",
    courseId: str(formData, "courseId") || null,
    weekId: str(formData, "weekId") || null,
    published: bool(formData, "published"),
  }
  if (id) {
    await prisma.quiz.update({ where: { id }, data })
    revalidatePath("/admin/quizzes")
    revalidatePath(`/admin/quizzes/${id}`)
    return
  }
  const created = await prisma.quiz.create({ data })
  revalidatePath("/admin/quizzes")
  redirect(`/admin/quizzes/${created.id}`)
}

export async function deleteQuiz(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.quiz.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/quizzes")
  redirect("/admin/quizzes")
}

export async function upsertQuizQuestion(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const quizId = str(formData, "quizId")
  const data = {
    quizId,
    prompt: str(formData, "prompt"),
    choiceA: str(formData, "choiceA"),
    choiceB: str(formData, "choiceB"),
    choiceC: str(formData, "choiceC"),
    choiceD: str(formData, "choiceD"),
    correct: str(formData, "correct") || "A",
    sortOrder: Number(str(formData, "sortOrder") || 0),
  }
  if (id) {
    await prisma.quizQuestion.update({ where: { id }, data })
  } else {
    await prisma.quizQuestion.create({ data })
  }
  revalidatePath(`/admin/quizzes/${quizId}`)
}

export async function deleteQuizQuestion(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const quizId = str(formData, "quizId")
  await prisma.quizQuestion.delete({ where: { id: str(formData, "id") } })
  revalidatePath(`/admin/quizzes/${quizId}`)
}

export async function createOralExam(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const created = await prisma.oralExam.create({
    data: {
      batchId: str(formData, "batchId"),
      kind: str(formData, "kind") as "MID" | "FINAL",
      title: str(formData, "title"),
      heldOn: dateOrNull(str(formData, "heldOn")),
    },
  })
  revalidatePath("/admin/exams")
  redirect(`/admin/exams/${created.id}`)
}

export async function deleteOralExam(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.oralExam.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/exams")
  redirect("/admin/exams")
}

export async function saveOralExamResult(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const examId = str(formData, "examId")
  const studentId = str(formData, "studentId")
  const pronunciation = Number(str(formData, "pronunciation") || 3)
  const vocabulary = Number(str(formData, "vocabulary") || 3)
  const fluency = Number(str(formData, "fluency") || 3)
  const understanding = Number(str(formData, "understanding") || 3)
  const avg = (pronunciation + vocabulary + fluency + understanding) / 4
  const passed = bool(formData, "passed") || avg >= 3
  await prisma.oralExamResult.upsert({
    where: { examId_studentId: { examId, studentId } },
    update: {
      pronunciation,
      vocabulary,
      fluency,
      understanding,
      passed,
      notes: str(formData, "notes") || null,
    },
    create: {
      examId,
      studentId,
      pronunciation,
      vocabulary,
      fluency,
      understanding,
      passed,
      notes: str(formData, "notes") || null,
    },
  })
  revalidatePath(`/admin/exams/${examId}`)
  revalidatePath(`/admin/students/${studentId}`)
}

export async function saveHomework(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const studentId = str(formData, "studentId")
  await prisma.homeworkEntry.create({
    data: {
      studentId,
      weekId: str(formData, "weekId"),
      voiceUrl: str(formData, "voiceUrl") || null,
      notes: str(formData, "notes") || null,
      score: str(formData, "score") ? Number(str(formData, "score")) : null,
    },
  })
  revalidatePath(`/admin/students/${studentId}`)
}

export async function issueCertificate(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const studentId = str(formData, "studentId")
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { batch: { include: { course: true } } },
  })
  if (!student) return
  const courseName =
    str(formData, "courseName") ||
    student.batch?.course.name ||
    "Spoken Arabic"
  const created = await prisma.certificate.create({
    data: {
      studentId,
      courseName,
      code: certCode(),
    },
  })
  revalidatePath("/admin/certificates")
  revalidatePath(`/admin/students/${studentId}`)
  redirect(`/admin/certificates?issued=${created.code}`)
}
