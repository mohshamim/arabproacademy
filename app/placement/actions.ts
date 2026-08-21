"use server"

import { redirect } from "next/navigation"
import { prismaReady } from "@/lib/prisma"

function str(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim()
}

export async function submitPlacementQuiz(formData: FormData) {
  const prisma = await prismaReady()
  const quiz = await prisma.quiz.findFirst({
    where: { slug: "placement", published: true },
    include: { questions: true },
  })
  if (!quiz || quiz.questions.length === 0) {
    redirect("/placement?error=unavailable")
  }

  let score = 0
  const answers: Record<string, string> = {}
  for (const q of quiz.questions) {
    const picked = str(formData, `q_${q.id}`).toUpperCase()
    answers[q.id] = picked
    if (picked && picked === q.correct.toUpperCase()) score += 1
  }

  const total = quiz.questions.length
  const name = str(formData, "name")
  const phone = str(formData, "phone")
  await prisma.quizAttempt.create({
    data: {
      quizId: quiz.id,
      name: name || null,
      phone: phone || null,
      score,
      total,
      answers,
    },
  })

  const pct = total ? score / total : 0
  const level = pct >= 0.7 ? "intermediate" : "beginner"
  redirect(
    `/placement?score=${score}&total=${total}&level=${level}&name=${encodeURIComponent(name)}`,
  )
}
