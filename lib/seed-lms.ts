import type { PrismaClient } from "@prisma/client"

const PLACEMENT_QUESTIONS = [
  {
    prompt: "How do you greet someone in the morning in spoken Gulf Arabic?",
    choiceA: "Sabah al-khair",
    choiceB: "Good night only",
    choiceC: "See you later",
    choiceD: "How much is this?",
    correct: "A",
  },
  {
    prompt: "What is the most useful first phrase at a shop?",
    choiceA: "I disagree",
    choiceB: "Bikam hatha? (how much is this?)",
    choiceC: "Call me back",
    choiceD: "I finished the report",
    correct: "B",
  },
  {
    prompt: "If you do not understand, you should say:",
    choiceA: "Nothing — switch to English",
    choiceB: "The bill please",
    choiceC: "Law samaht, a’id (please repeat)",
    choiceD: "I am the manager",
    correct: "C",
  },
  {
    prompt: "Numbers 1–3 in order are closest to:",
    choiceA: "wahid, ithnain, thalatha",
    choiceB: "ashara, ishreen, thalathoon",
    choiceC: "imsi, al-youm, bokra",
    choiceD: "yameen, yasar, sid",
    correct: "A",
  },
  {
    prompt: "You are 10 minutes late to class. Best spoken move:",
    choiceA: "Stay silent",
    choiceB: "Hang up",
    choiceC: "Say you are sorry and you will arrive soon",
    choiceD: "Argue about the time",
    correct: "C",
  },
  {
    prompt: "In a meeting, a polite disagreement starts with:",
    choiceA: "You are wrong",
    choiceB: "I think… / in my opinion…",
    choiceC: "Never",
    choiceD: "How much?",
    correct: "B",
  },
  {
    prompt: "Left / right / straight are used mainly for:",
    choiceA: "Ordering coffee",
    choiceB: "Giving directions",
    choiceC: "Talking about family",
    choiceD: "Phone voicemail",
    correct: "B",
  },
  {
    prompt: "Can you already hold a 2-minute chat about work in Arabic?",
    choiceA: "Yes, comfortably",
    choiceB: "Only greetings",
    choiceC: "I understand but cannot speak",
    choiceD: "Not at all — complete beginner",
    correct: "A",
  },
]

export async function seedLmsContent(prisma: PrismaClient) {
  const existing = await prisma.quiz.findUnique({ where: { slug: "placement" } })
  if (!existing) {
    await prisma.quiz.create({
      data: {
        slug: "placement",
        title: "Spoken Arabic placement",
        kind: "PLACEMENT",
        published: true,
        questions: {
          create: PLACEMENT_QUESTIONS.map((q, i) => ({
            ...q,
            sortOrder: i,
          })),
        },
      },
    })
  }

  return {
    quizzes: await prisma.quiz.count(),
    questions: await prisma.quizQuestion.count(),
  }
}
