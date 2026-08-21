import type { PublicContent } from "@/lib/site-data"
import type { Locale } from "@/lib/locale"
import { getCopy } from "@/lib/copy"
import {
  FAQS_AR,
  ONLINE_INCLUDES_AR,
  ONLINE_LEVELS_AR,
  PRICING_AR,
  STAT_LABELS_AR,
  TESTIMONIALS_AR,
} from "@/lib/content-ar"

export function localizeContent(content: PublicContent, locale: Locale): PublicContent {
  if (locale !== "ar") return content

  return {
    ...content,
    stats: content.stats.map((s, i) => ({
      ...s,
      label: STAT_LABELS_AR[i] || s.label,
    })),
    faqs: FAQS_AR.map((f) => ({ q: f.q, a: f.a })),
    testimonials: content.testimonials.map((item, i) => ({
      ...item,
      role: TESTIMONIALS_AR[i]?.role || item.role,
      text: TESTIMONIALS_AR[i]?.text || item.text,
    })),
    pricing: content.pricing.map((p, i) => ({
      ...p,
      name: PRICING_AR[i]?.name || p.name,
      period: PRICING_AR[i]?.period || p.period,
      desc: PRICING_AR[i]?.desc || p.desc,
      features: PRICING_AR[i] ? [...PRICING_AR[i].features] : p.features,
      cta: PRICING_AR[i]?.cta || p.cta,
      message: PRICING_AR[i]?.message || p.message,
    })),
    online: content.online.map((o, i) => ({
      ...o,
      level: ONLINE_LEVELS_AR[i]?.level || o.level,
      name: ONLINE_LEVELS_AR[i]?.name || o.name,
      features: ONLINE_LEVELS_AR[i] ? [...ONLINE_LEVELS_AR[i].features] : o.features,
      message: ONLINE_LEVELS_AR[i]?.message || o.message,
    })),
  }
}

export function localizedInterestOptions(
  content: PublicContent,
  locale: Locale,
) {
  const t = getCopy(locale)
  return [
    ...content.pricing.map((p) => ({
      value: p.name,
      label: `${p.name} (${p.price} ${locale === "ar" ? "ريال" : "SAR"})`,
    })),
    ...content.online.map((l) => ({
      value: l.name,
      label: `${t.contact.onlinePrefix} ${l.name} (${l.monthlyPrice} ${t.contact.perMonthShort})`,
    })),
    { value: "question", label: t.contact.question },
  ]
}

export { ONLINE_INCLUDES_AR }
