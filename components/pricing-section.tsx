import { ArrowUpRight, Check, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PRICING, WHATSAPP_NUMBER, whatsappEnrollUrl } from "@/lib/content"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import { cn } from "@/lib/utils"
import type { PublicPricing } from "@/lib/site-data"

export function PricingSection({
  plans = PRICING as unknown as PublicPricing[],
  whatsappNumber = WHATSAPP_NUMBER,
  locale = "en",
}: {
  plans?: PublicPricing[]
  whatsappNumber?: string
  locale?: Locale
}) {
  const t = getCopy(locale)
  return (
    <section id="pricing" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-teal">
            {t.pricing.eyebrow}
          </p>
          <h2 className="mb-4 font-display text-4xl font-black text-navy sm:text-5xl">
            {t.pricing.title}
            <br />
            <span className="text-gold-gradient">{t.pricing.titleGold}</span>
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-500">
            {t.pricing.body}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-3xl p-8 transition-all duration-300 sm:p-10",
                plan.popular
                  ? "scale-100 border-2 border-gold bg-navy shadow-2xl shadow-gold/20 md:scale-105"
                  : "border border-gray-200 bg-white shadow-lg hover:shadow-xl"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold-light px-5 py-2 text-xs font-bold tracking-wider text-navy uppercase shadow-lg">
                  <Star size={14} /> {t.pricing.popular}
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={cn(
                    "mb-1 font-display text-xl font-bold",
                    plan.popular ? "text-white" : "text-navy"
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "text-sm",
                    plan.popular ? "text-gray-400" : "text-gray-500"
                  )}
                >
                  {plan.desc}
                </p>
              </div>

              <div className="mb-6 border-b border-gray-200/30 pb-6">
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "font-display text-5xl font-black",
                      plan.popular ? "text-gold-gradient" : "text-navy"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.popular ? "text-gray-400" : "text-gray-500"
                    )}
                  >
                    {plan.period}
                  </span>
                </div>
                {plan.popular && (
                  <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-teal">
                    {t.pricing.save}
                  </p>
                )}
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.popular ? "bg-gold/20" : "bg-teal/10"
                      )}
                    >
                      <Check
                        size={12}
                        strokeWidth={3}
                        className={plan.popular ? "text-gold" : "text-teal"}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-sm",
                        plan.popular ? "text-gray-300" : "text-gray-600"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.popular ? "default" : "secondary"}
                size="lg"
                className="w-full"
              >
                <a
                  href={whatsappEnrollUrl(plan.message, whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta}
                  <ArrowUpRight size={18} />
                </a>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          {t.pricing.footnote}
        </p>
      </div>
    </section>
  )
}
