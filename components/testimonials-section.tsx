import { Star } from "lucide-react"

import { TESTIMONIALS } from "@/lib/content"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import type { PublicTestimonial } from "@/lib/site-data"

export function TestimonialsSection({
  testimonials = TESTIMONIALS.map((t) => ({ ...t })),
  locale = "en",
}: {
  testimonials?: PublicTestimonial[]
  locale?: Locale
}) {
  const t = getCopy(locale)
  return (
    <section className="arabic-pattern relative overflow-hidden bg-navy py-24">
      <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-teal/5 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-gold">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="mb-4 font-display text-4xl font-black text-white sm:text-5xl">
            {t.testimonials.title}
            <br />
            <span className="text-gold-gradient">{t.testimonials.titleGold}</span>
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="flex items-center justify-center gap-2 text-gray-400">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="#C4962A"
                  className="text-gold"
                />
              ))}
            </span>
            {t.testimonials.rating}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-gold/30 hover:bg-white/10"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#C4962A"
                    className="text-gold"
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-300">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 font-bold text-gold">
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
