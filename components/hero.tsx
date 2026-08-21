import Image from "next/image"
import { ChevronDown, MessageCircle, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { STATS } from "@/lib/content"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import { cn } from "@/lib/utils"

export function Hero({
  stats = STATS,
  whatsappUrl,
  locale = "en",
}: {
  stats?: readonly { value: string; label: string }[]
  whatsappUrl: string
  locale?: Locale
}) {
  const t = getCopy(locale)
  const ar = locale === "ar"

  return (
    <section className="arabic-pattern relative flex min-h-screen items-center justify-center overflow-hidden bg-navy">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/2 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-up mb-8 flex justify-center">
          <div className="relative">
            <Image
              src="/logo.svg"
              alt={t.brand}
              width={112}
              height={112}
              className="h-28 w-28 rounded-full object-cover shadow-2xl shadow-gold/20 ring-4 ring-gold"
              priority
            />
            <div className="absolute -right-2 -bottom-2 flex items-center gap-1 rounded-full bg-teal px-2 py-1">
              <Star size={10} fill="#E8C66B" className="text-gold-light" />
              <span className="text-[10px] font-semibold text-white">
                {t.hero.certified}
              </span>
            </div>
          </div>
        </div>

        <div className="animate-fade-up delay-100 mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/15 px-4 py-2 text-xs font-semibold text-gold-light">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
          {t.hero.badge}
        </div>

        <h1
          className={cn(
            "animate-fade-up delay-200 mb-6 text-4xl leading-tight font-black text-white sm:text-5xl lg:text-7xl",
            ar ? "font-kufi" : "font-display",
          )}
        >
          {t.hero.titleLead}{" "}
          <span className="text-gold-gradient">{t.hero.titleGold}</span>
          <br />
          <span className="text-3xl font-semibold text-gray-300 sm:text-4xl lg:text-5xl">
            {t.hero.titleRest}
          </span>
        </h1>

        <p className="animate-fade-up delay-300 mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
          {t.hero.body}
        </p>

        {!ar ? (
          <p
            className="font-arabic animate-fade-up delay-300 mb-10 text-2xl font-medium tracking-wider text-gold"
            dir="rtl"
          >
            {t.hero.tagline}
          </p>
        ) : (
          <div className="mb-10" />
        )}

        <div className="animate-fade-up delay-400 mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#pricing">{t.hero.ctaPricing}</a>
          </Button>
          <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} />
              {t.hero.ctaWhatsapp}
            </a>
          </Button>
        </div>
        <a
          href="/placement"
          className="animate-fade-up delay-400 mb-10 inline-flex text-sm font-semibold text-gold-light underline-offset-4 hover:underline"
        >
          {t.hero.placement}
        </a>

        <div className="animate-fade-up delay-500 flex flex-wrap items-center justify-center gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                className={cn(
                  "text-2xl font-black text-gold",
                  ar ? "font-kufi" : "font-display",
                )}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#why"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-600 transition-colors hover:text-gold"
        aria-label="Scroll to about"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
