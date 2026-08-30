import Link from "next/link"
import { Check, MessageCircle } from "lucide-react"

import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { LanguageSwitch } from "@/components/language-switch"
import { Navbar } from "@/components/navbar"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import { homeHash, localizedPath } from "@/lib/paths"
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo"
import { LANDING_NAV, LANDINGS, type LandingSlug } from "@/lib/seo-landings"
import { getContactSettings } from "@/lib/site-settings"
import { getTheme } from "@/lib/theme"
import { whatsappCampaignUrl } from "@/lib/tracking"
import { cn } from "@/lib/utils"

export async function SeoLanding({
  slug,
  locale,
}: {
  slug: LandingSlug
  locale: Locale
}) {
  const theme = await getTheme()
  const contact = await getContactSettings()
  const t = getCopy(locale)
  const page = LANDINGS[slug][locale]
  const ar = locale === "ar"
  const wa = whatsappCampaignUrl(page.waMessage, slug, contact.whatsapp)
  const phoneHref = contact.phone.startsWith("tel:") ? contact.phone : `tel:${contact.phone}`
  const navLabel = LANDING_NAV.find((item) => item.slug === slug)
  const crumb = locale === "ar" ? navLabel?.ar : navLabel?.en

  return (
    <main className="min-h-screen overflow-x-hidden">
      <JsonLd
        data={[
          organizationJsonLd(),
          faqJsonLd(page.faqs),
          breadcrumbJsonLd(
            [
              { name: t.brand, path: "/" },
              { name: crumb || page.h1, path: `/${slug}` },
            ],
            locale,
          ),
        ]}
      />
      <Navbar
        phoneDisplay={contact.phoneDisplay}
        phoneHref={phoneHref}
        locale={locale}
        theme={theme}
        inner
      />

      <section className="theme-panel arabic-pattern bg-navy px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex max-w-full items-center rounded-full border border-gold/30 bg-gold/15 px-3 py-1.5 text-[11px] font-semibold text-gold-light sm:text-xs">
            {page.eyebrow}
          </p>
          <h1
            className={cn(
              "text-[1.75rem] leading-[1.15] font-black text-white sm:text-5xl",
              ar ? "font-kufi" : "font-display",
            )}
          >
            {page.h1} <span className="text-gold-gradient">{page.h1Gold}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            {page.lead}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" variant="whatsapp" className="w-full sm:w-auto">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} />
                {page.cta}
              </a>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={homeHash("#pricing", locale)}>{t.hero.ctaPricing}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-12 sm:grid-cols-3 sm:px-6 sm:py-16">
        {page.points.map((point) => (
          <div
            key={point.title}
            className="rounded-2xl border border-gold/20 bg-white p-5 shadow-sm dark:bg-navy-mid/40"
          >
            <h2 className={cn("mb-2 text-lg font-bold text-navy", ar && "font-kufi")}>
              {point.title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">{point.body}</p>
          </div>
        ))}
      </section>

      <section className="theme-panel bg-navy px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className={cn("mb-6 text-2xl font-black text-gold sm:text-3xl", ar ? "font-kufi" : "font-display")}>
            {page.whoTitle}
          </h2>
          <ul className="space-y-3">
            {page.who.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-200 sm:text-base">
                <Check size={18} className="mt-0.5 shrink-0 text-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href={localizedPath("/placement", locale)}
              className="text-sm font-semibold text-gold-light underline-offset-4 hover:underline"
            >
              {page.secondary}
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className={cn("mb-6 text-2xl font-black text-navy", ar ? "font-kufi" : "font-display")}>
          {t.faq.title} {t.faq.titleGold}
        </h2>
        <div className="space-y-4">
          {page.faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-black/5 bg-white p-5">
              <h3 className="font-semibold text-navy">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="whatsapp">
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} />
              {page.cta}
            </a>
          </Button>
          <Button asChild variant="secondary">
            <Link href={localizedPath("/", locale)}>{ar ? "العودة للرئيسية" : "Back to homepage"}</Link>
          </Button>
        </div>
      </section>

      <nav className="border-t border-black/5 px-4 py-8 sm:px-6" aria-label={ar ? "دورات أخرى" : "More courses"}>
        <div className="mx-auto flex max-w-5xl flex-wrap gap-3">
          {LANDING_NAV.filter((item) => item.slug !== slug).map((item) => (
            <Link
              key={item.slug}
              href={localizedPath(`/${item.slug}`, locale)}
              className="rounded-full border border-gold/30 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-gold/10"
            >
              {locale === "ar" ? item.ar : item.en}
            </Link>
          ))}
        </div>
      </nav>

      <Footer contact={contact} whatsappUrl={wa} phoneHref={phoneHref} locale={locale} inner />
      <WhatsAppFloat href={wa} />
      <LanguageSwitch locale={locale} theme={theme} variant="float" />
    </main>
  )
}
