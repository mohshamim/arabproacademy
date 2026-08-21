import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageSwitch } from "@/components/language-switch"
import { WHATSAPP_URL, PHONE_HREF, whatsappEnrollUrl } from "@/lib/content"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import { getTheme } from "@/lib/theme"
import { localizedPath } from "@/lib/paths"
import { breadcrumbJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { DEFAULT_CONTACT } from "@/lib/site-settings"
import { submitPlacementQuiz } from "@/app/placement/actions"

export async function PlacementScreen({
  locale,
  searchParams,
}: {
  locale: Locale
  searchParams?: Promise<{
    score?: string
    total?: string
    level?: string
    name?: string
    error?: string
  }>
}) {
  const theme = await getTheme()
  const t = getCopy(locale)
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
    t.placement.waMessage(
      score,
      total,
      level === "intermediate" ? t.placement.intermediate : t.placement.beginner,
    ),
  )

  return (
    <div className="min-h-screen bg-cream">
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.brand, path: "/" },
            { name: t.placement.title, path: "/placement" },
          ],
          locale,
        )}
      />
      <Navbar locale={locale} theme={theme} />
      <main className="mx-auto max-w-3xl px-4 pt-24 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:pt-28">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold">
          {t.placement.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl font-black text-navy sm:text-4xl">
          {t.placement.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {t.placement.body}
        </p>

        {sp.error === "unavailable" || (!sp.score && questions.length === 0) ? (
          <div className="mt-8 rounded-2xl border border-gold/30 bg-white p-6">
            <p className="text-sm text-gray-700">{t.placement.unavailable}</p>
            <a
              href={WHATSAPP_URL}
              className="mt-4 inline-flex rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
            >
              {t.placement.whatsapp}
            </a>
          </div>
        ) : null}

        {sp.score ? (
          <div className="mt-8 rounded-3xl border border-gold/25 bg-white p-8 text-center shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-gold">
              {t.placement.result}
            </p>
            <p className="mt-3 font-display text-5xl font-bold text-navy">
              {score}/{total}
            </p>
            <p className="mt-4 text-lg font-semibold text-navy">
              {t.placement.recommended}{" "}
              {level === "intermediate" ? t.placement.intermediate : t.placement.beginner}
            </p>
            <p className="mt-2 text-sm text-gray-600">{t.placement.confirm}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={wa}
                className="inline-flex rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
              >
                {t.placement.enroll}
              </a>
              <Link
                href={localizedPath("/", locale) + "#pricing"}
                className="inline-flex rounded-xl border border-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy"
              >
                {t.placement.pricing}
              </Link>
            </div>
          </div>
        ) : questions.length > 0 ? (
          <form action={submitPlacementQuiz} className="mt-8 space-y-6">
            <div className="grid gap-3 rounded-2xl border border-navy/10 bg-white p-5 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder={t.placement.name}
                className="min-h-12 rounded-xl border border-gray-200 px-3 py-2.5 text-base sm:text-sm"
              />
              <input
                name="phone"
                required
                placeholder={t.placement.phone}
                className="min-h-12 rounded-xl border border-gray-200 px-3 py-2.5 text-base sm:text-sm"
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
                      className="flex min-h-11 cursor-pointer items-start gap-2 rounded-xl px-2 py-2.5 hover:bg-cream"
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
              className="min-h-12 w-full rounded-xl bg-navy px-4 py-3 text-base font-semibold text-white sm:text-sm"
            >
              {t.placement.submit}
            </button>
          </form>
        ) : null}

        <p className="mt-10 text-center text-xs text-gray-500">
          <Link href={localizedPath("/", locale)} className="hover:text-gold">
            {t.placement.back}
          </Link>
        </p>
      </main>
      <Footer
        contact={DEFAULT_CONTACT}
        whatsappUrl={WHATSAPP_URL}
        phoneHref={PHONE_HREF}
        locale={locale}
      />
      <LanguageSwitch locale={locale} theme={theme} variant="float" />
    </div>
  )
}
