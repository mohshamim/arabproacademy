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

const ICONS: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  globe: Globe,
  rocket: Rocket,
  heart: Heart,
  users: Users,
  award: Award,
}

export function WhySection() {
  return (
    <section id="why" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-teal uppercase">
            Why Learn Arabic
          </p>
          <h2 className="mb-4 font-display text-4xl font-black text-navy sm:text-5xl">
            Your Career Deserves
            <br />
            <span className="text-gold-gradient">This Advantage</span>
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-500">
            In the competitive Gulf job market, spoken Arabic separates
            professionals who thrive from those who plateau. Here&apos;s why our
            students invest in fluency.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map((item) => {
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
