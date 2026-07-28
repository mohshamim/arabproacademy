import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  EMAIL,
  ONLINE_INCLUDES,
  ONLINE_LEVELS,
  PHONE_HREF,
  WHATSAPP_URL,
  whatsappEnrollUrl,
} from "@/lib/content"
import { cn } from "@/lib/utils"

const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(WHATSAPP_URL)}`

export function OnlineLevelsSection() {
  return (
    <section id="online" className="overflow-hidden">
      {/* Banner header */}
      <div className="bg-navy px-4 py-14 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex justify-center">
          <Image
            src="/arab-academy-logo.jpg"
            alt="Arab Pro Academy"
            width={88}
            height={88}
            className="h-20 w-20 rounded-full object-cover shadow-xl shadow-gold/20 ring-4 ring-gold sm:h-24 sm:w-24"
          />
        </div>
        <h2 className="mb-3 font-display text-3xl font-black tracking-wide text-gold sm:text-5xl">
          ARAB PRO ACADEMY
        </h2>
        <p className="mb-8 text-sm text-white sm:text-base">
          Spoken Arabic Program for Expats in Saudi Arabia
        </p>
        <div className="inline-flex items-center rounded-full bg-teal px-5 py-2.5 text-[11px] font-bold tracking-wider text-white uppercase sm:text-xs">
          New Online Courses • Beginner & Intermediate Levels
        </div>
      </div>

      {/* Choose your level */}
      <div className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h3 className="mb-2 font-display text-3xl font-black text-navy sm:text-4xl">
              Choose Your Level
            </h3>
            <p className="text-sm text-navy/70 sm:text-base">
              Two brand-new 8-week online tracks — pick the one that fits you
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {ONLINE_LEVELS.map((track) => (
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
                      {track.monthlyPrice} SAR{" "}
                      <span className="text-sm font-medium text-gray-500">
                        per month
                      </span>
                    </p>
                    <p className="text-sm font-semibold text-teal">
                      {track.fullPrice} SAR{" "}
                      <span className="font-normal text-gray-500">
                        full course — 2 months (8 weeks)
                      </span>
                    </p>
                  </div>

                  <Button asChild size="lg" className="w-full">
                    <a
                      href={whatsappEnrollUrl(track.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enroll via WhatsApp
                      <ArrowUpRight size={18} />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* What's included */}
          <div className="mx-auto mt-16 max-w-4xl">
            <h3 className="mb-8 text-center font-display text-3xl font-black text-navy">
              What&apos;s Included
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {ONLINE_INCLUDES.map((item) => (
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

      {/* Contact strip */}
      <div className="bg-navy px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div>
            <h4 className="mb-5 text-sm font-bold tracking-widest text-gold uppercase">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-teal-light" />
                <a
                  href="https://arab-pro-academy-web-16nb.bolt.host"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-light hover:underline"
                >
                  arab-pro-academy-web-16nb.bolt.host
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-teal-light" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-white hover:text-gold"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-teal-light" />
                <a href={PHONE_HREF} className="text-white hover:text-gold">
                  Call / WhatsApp: +966 57 491 5561
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white p-3 shadow-lg transition-transform hover:scale-105"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={QR_SRC}
                alt="WhatsApp QR code"
                width={160}
                height={160}
                className="h-40 w-40"
              />
            </a>
            <p className="text-sm font-medium text-gold">Scan to WhatsApp us</p>
          </div>
        </div>
      </div>
    </section>
  )
}
