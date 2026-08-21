import {
  Award,
  Briefcase,
  Globe,
  Heart,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react"

import { WHY_ITEMS } from "@/lib/content"
import { WHY_ITEMS_AR } from "@/lib/content-ar"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"

const ICONS: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  globe: Globe,
  rocket: Rocket,
  heart: Heart,
  users: Users,
  award: Award,
}

export function WhySection({ locale = "en" }: { locale?: Locale }) {
  const t = getCopy(locale)
  const items = locale === "ar" ? WHY_ITEMS_AR : WHY_ITEMS

  return (
    <section id="why" className="bg-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold tracking-widest text-teal">
            {t.why.eyebrow}
          </p>
          <h2 className="mb-4 font-display text-3xl font-black text-navy sm:text-5xl">
            {t.why.title}
            <br />
            <span className="text-gold-gradient">{t.why.titleGold}</span>
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-500">
            {t.why.body}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-cream/60 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy transition-colors duration-300 group-hover:bg-gold">
                  <Icon
                    className="text-white transition-colors group-hover:text-navy"
                    size={22}
                  />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-navy">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
