import type { Metadata } from "next"
import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WHATSAPP_URL, PHONE_HREF, whatsappEnrollUrl } from "@/lib/content"
import { DEFAULT_CONTACT } from "@/lib/site-settings"
import { submitPlacementQuiz } from "@/app/placement/actions"

export const metadata: Metadata = {
  title: "Placement quiz — Arab Pro Academy",
  description: "2-minute spoken Arabic placement. Beginner or intermediate — then enroll on WhatsApp.",
}

export default async function PlacementPage({
  searchParams,
}: {
  searchParams?: Promise<{
    score?: string
    total?: string
    level?: string
    name?: string
    error?: string
  }>
}) {
  const sp = (await searchParams) || {}

  let questions: {
    id: string
    prompt: string
    choiceA: string
    choiceB: string
    choiceC: string
    choiceD: string
  }[] = []

  if (hasDatabaseUrl() && !sp.score) {
    try {
      const prisma = await prismaReady()
      const quiz = await prisma.quiz.findFirst({
        where: { slug: "placement", published: true },
        include: { questions: { orderBy: { sortOrder: "asc" } } },
      })
      questions = quiz?.questions ?? []
    } catch {
      questions = []
    }
  }

  const score = Number(sp.score || 0)
  const total = Number(sp.total || 0)
  const level = sp.level === "intermediate" ? "intermediate" : "beginner"
  const wa = whatsappEnrollUrl(
    `Hi, I took the placement quiz (${score}/${total}) and was placed at ${level}. I want to enroll.`,
  )

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-16">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
          2-minute check
        </p>
        <h1 className="mt-2 font-display text-4xl font-black text-navy">
          Spoken Arabic placement
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          No grammar exam. This tells us whether Beginner or Intermediate fits
          you. After you finish, WhatsApp us to enroll — we do not use a long
          checkout.
        </p>

        {sp.error === "unavailable" || (!sp.score && questions.length === 0) ? (
          <div className="mt-8 rounded-2xl border border-gold/30 bg-white p-6">
            <p className="text-sm text-gray-700">
              The quiz is not live yet. Message us and we will place you in
              class.
            </p>
            <a
              href={WHATSAPP_URL}
              className="mt-4 inline-flex rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
            >
              WhatsApp the academy
            </a>
          </div>
        ) : null}

        {sp.score ? (
          <div className="mt-8 rounded-3xl border border-gold/25 bg-white p-8 text-center shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">
              Your result
            </p>
            <p className="mt-3 font-display text-5xl font-bold text-navy">
              {score}/{total}
            </p>
            <p className="mt-4 text-lg font-semibold text-navy">
              Recommended:{" "}
              {level === "intermediate" ? "Online Intermediate" : "Beginner / 3-month spoken"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              The teacher will confirm on a short WhatsApp voice chat.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={wa}
                className="inline-flex rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Enroll on WhatsApp
              </a>
              <Link
                href="/#pricing"
                className="inline-flex rounded-xl border border-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy"
              >
                See pricing
              </Link>
            </div>
          </div>
        ) : questions.length > 0 ? (
          <form action={submitPlacementQuiz} className="mt-8 space-y-6">
            <div className="grid gap-3 rounded-2xl border border-navy/10 bg-white p-5 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder="Your name"
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
              />
              <input
                name="phone"
                required
                placeholder="WhatsApp number"
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
              />
            </div>
            {questions.map((q, i) => (
              <fieldset
                key={q.id}
                className="rounded-2xl border border-navy/10 bg-white p-5"
              >
                <legend className="text-sm font-semibold text-navy">
                  {i + 1}. {q.prompt}
                </legend>
                <div className="mt-3 space-y-2 text-sm">
                  {(
                    [
                      ["A", q.choiceA],
                      ["B", q.choiceB],
                      ["C", q.choiceC],
                      ["D", q.choiceD],
                    ] as const
                  ).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex cursor-pointer items-start gap-2 rounded-xl px-2 py-1.5 hover:bg-cream"
                    >
                      <input
                        type="radio"
                        name={`q_${q.id}`}
                        value={key}
                        required
                        className="mt-1"
                      />
                      <span>
                        <span className="font-semibold text-gold">{key}.</span>{" "}
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <button
              type="submit"
              className="w-full rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white"
            >
              See my level
            </button>
          </form>
        ) : null}

        <p className="mt-10 text-center text-xs text-gray-500">
          <Link href="/" className="hover:text-gold">
            ← Back to Arab Pro Academy
          </Link>
        </p>
      </main>
      <Footer
        contact={DEFAULT_CONTACT}
        whatsappUrl={WHATSAPP_URL}
        phoneHref={PHONE_HREF}
      />
    </div>
  )
}
