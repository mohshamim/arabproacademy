import {
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPinned,
  MessageCircle,
  Route,
  Users,
  type LucideIcon,
} from "lucide-react"

import { COURSE_FEATURES, JOURNEY } from "@/lib/content"
import { COURSE_FEATURES_AR, JOURNEY_AR } from "@/lib/content-ar"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"

const ICONS: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  route: Route,
  message: MessageCircle,
  users: Users,
  map: MapPinned,
  building: Building2,
}

export function CoursesSection({ locale = "en" }: { locale?: Locale }) {
  const t = getCopy(locale)
  const features = locale === "ar" ? COURSE_FEATURES_AR : COURSE_FEATURES
  const journey = locale === "ar" ? JOURNEY_AR : JOURNEY

  return (
    <section id="courses" className="arabic-pattern bg-navy py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-gold">
            {t.courses.eyebrow}
          </p>
          <h2 className="mb-4 font-display text-4xl font-black text-white sm:text-5xl">
            {t.courses.title}
            <br />
            <span className="text-gold-gradient">{t.courses.titleGold}</span>
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-400">
            {t.courses.body}
          </p>
        </div>

        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-gold/40 hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15">
                    <Icon className="text-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/20 px-4 py-2 text-xs font-semibold text-teal-light">
            <Route size={14} /> {t.courses.pathBadge}
          </div>
          <h3 className="font-display text-3xl font-black text-white">
            {t.courses.pathTitle}
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {journey.map((step, index) => (
            <div key={step.month} className="relative">
              <div className="h-full rounded-2xl border border-gold/20 bg-gradient-to-br from-navy-mid to-navy p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold tracking-wider text-gold">
                    {step.month}
                  </span>
                  <span className="font-display text-5xl font-black text-white/5">
                    0{index + 1}
                  </span>
                </div>
                <h4 className="mb-3 font-display text-xl font-bold text-white">
                  {step.title}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-gray-400">
                  {step.desc}
                </p>
                <div className="flex items-center gap-2 text-teal">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-semibold">
                    {t.courses.guaranteed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
