import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ONLINE_INCLUDES, ONLINE_LEVELS, whatsappEnrollUrl } from "@/lib/content"
import { ONLINE_INCLUDES_AR } from "@/lib/content-ar"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import type { PublicOnlineLevel } from "@/lib/site-data"
import type { SiteContactSettings } from "@/lib/site-settings"
import { cn } from "@/lib/utils"

export function OnlineLevelsSection({
  levels = ONLINE_LEVELS.map((t) => ({
    level: t.level,
    name: t.name,
    badgeColor: t.badgeColor,
    monthlyPrice: t.monthlyPrice,
    fullPrice: t.fullPrice,
    features: [...t.features],
    message: t.message,
  })),
  contact,
  whatsappUrl,
  phoneHref,
  locale = "en",
}: {
  levels?: PublicOnlineLevel[]
  contact: SiteContactSettings
  whatsappUrl: string
  phoneHref: string
  locale?: Locale
}) {
  const t = getCopy(locale)
  const includes = locale === "ar" ? ONLINE_INCLUDES_AR : ONLINE_INCLUDES
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappUrl)}`

  return (
    <section id="online" className="overflow-hidden">
      <div className="theme-panel bg-navy px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto mb-6 flex justify-center">
          <Image
            src="/logo.svg"
            alt="Arab Pro Academy"
            width={88}
            height={88}
            className="h-20 w-20 rounded-full object-cover shadow-xl shadow-gold/20 ring-4 ring-gold sm:h-24 sm:w-24"
          />
        </div>
        <h2 className="mb-3 font-display text-2xl font-black tracking-wide text-gold sm:text-5xl">
          {t.brand}
        </h2>
        <p className="mb-8 text-sm text-white sm:text-base">
          {t.online.subtitle}
        </p>
        <div className="inline-flex items-center rounded-full bg-teal px-5 py-2.5 text-[11px] font-bold text-white sm:text-xs">
          {t.online.badge}
        </div>
      </div>

      <div className="bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h3 className="mb-2 font-display text-2xl font-black text-navy sm:text-4xl">
              {t.online.choose}
            </h3>
            <p className="text-sm text-navy/70 sm:text-base">
              {t.online.chooseBody}
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {levels.map((track) => (
              <div
                key={track.name}
                className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy/10"
              >
                <div className="bg-navy px-6 py-5">
                  <span
                    className={cn(
                      "mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase",
                      track.badgeColor === "teal" ? "bg-teal" : "bg-gold text-navy"
                    )}
                  >
                    {track.level}
                  </span>
                  <h4 className="font-display text-2xl font-black tracking-wide text-white sm:text-3xl">
                    {track.name}
                  </h4>
                </div>

                <div className="p-6 sm:p-7">
                  <ul className="mb-6 space-y-3">
                    {track.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-navy"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6 space-y-1 border-t border-gray-100 pt-5">
                    <p className="font-display text-2xl font-black text-navy">
                      {track.monthlyPrice} {locale === "ar" ? "ريال" : "SAR"}{" "}
                      <span className="text-sm font-medium text-gray-500">
                        {t.online.perMonth}
                      </span>
                    </p>
                    <p className="text-sm font-semibold text-teal">
                      {track.fullPrice} {locale === "ar" ? "ريال" : "SAR"}{" "}
                      <span className="font-normal text-gray-500">
                        {t.online.fullCourse}
                      </span>
                    </p>
                  </div>

                  <Button asChild size="lg" className="w-full">
                    <a
                      href={whatsappEnrollUrl(track.message, contact.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.online.enroll}
                      <ArrowUpRight size={18} />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <h3 className="mb-8 text-center font-display text-2xl font-black text-navy sm:text-3xl">
              {t.online.included}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {includes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal">
                    <Check size={14} strokeWidth={3} className="text-white" />
                  </div>
                  <p className="text-sm leading-relaxed text-navy">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="theme-panel bg-navy px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div>
            <h4 className="mb-5 text-sm font-bold tracking-widest text-gold">
              {t.online.getInTouch}
            </h4>
            <ul className="space-y-3 text-sm">
              {contact.websiteUrl ? (
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-teal-light" />
                  <a
                    href={contact.websiteUrl}
                    className="text-teal-light hover:underline"
                  >
                    {contact.websiteUrl.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              ) : null}
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-teal-light" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white break-all hover:text-gold"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-teal-light" />
                <a href={phoneHref} className="text-white hover:text-gold">
                  {t.online.callWhatsapp} {contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white p-3 shadow-lg transition-transform hover:scale-105"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrSrc}
                alt="WhatsApp QR code"
                width={160}
                height={160}
                className="h-40 w-40"
              />
            </a>
            <p className="text-sm font-medium text-gold">{t.online.scan}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
