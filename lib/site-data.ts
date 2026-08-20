import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import {
  FAQS,
  ONLINE_LEVELS,
  PRICING,
  STATS,
  TESTIMONIALS,
} from "@/lib/content"
import {
  getContactSettings,
  getStatsSettings,
  whatsappDeepLink,
  type SiteContactSettings,
} from "@/lib/site-settings"

export type PublicFaq = { q: string; a: string }
export type PublicTestimonial = {
  name: string
  role: string
  initial: string
  text: string
}
export type PublicPricing = {
  name: string
  price: string
  period: string
  desc: string
  features: string[]
  cta: string
  message: string
  popular: boolean
}
export type PublicOnlineLevel = {
  level: string
  name: string
  badgeColor: "teal" | "gold"
  monthlyPrice: string
  fullPrice: string
  features: string[]
  message: string
}

function asStringArray(value: unknown, fallback: readonly string[]): string[] {
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
    return value
  }
  return [...fallback]
}

export async function getPublicContent() {
  const contact = await getContactSettings()
  const statsSettings = await getStatsSettings()

  const stats = [
    { value: statsSettings.students, label: "Students Enrolled" },
    { value: statsSettings.successRate, label: "Success Rate" },
    { value: statsSettings.duration, label: "To Fluency" },
    { value: statsSettings.locationLabel, label: "Based in KSA" },
  ]

  let faqs: PublicFaq[] = FAQS.map((f) => ({ q: f.q, a: f.a }))
  let testimonials: PublicTestimonial[] = TESTIMONIALS.map((t) => ({ ...t }))
  let pricing: PublicPricing[] = PRICING.map((p) => ({
    name: p.name,
    price: p.price,
    period: p.period,
    desc: p.desc,
    features: [...p.features],
    cta: p.cta,
    message: p.message,
    popular: p.popular,
  }))
  let online: PublicOnlineLevel[] = ONLINE_LEVELS.map((t) => ({
    level: t.level,
    name: t.name,
    badgeColor: t.badgeColor,
    monthlyPrice: t.monthlyPrice,
    fullPrice: t.fullPrice,
    features: [...t.features],
    message: t.message,
  }))

  if (hasDatabaseUrl()) {
    try {
      const prisma = await prismaReady()
      const [dbFaqs, dbTestimonials, dbPricing, dbOnline] = await Promise.all([
        prisma.faqItem.findMany({
          where: { published: true },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        }),
        prisma.testimonial.findMany({
          where: { published: true },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        }),
        prisma.pricingPackage.findMany({
          where: { published: true },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        }),
        prisma.onlineLevel.findMany({
          where: { published: true },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        }),
      ])

      if (dbFaqs.length) {
        faqs = dbFaqs.map((f) => ({ q: f.question, a: f.answer }))
      }
      if (dbTestimonials.length) {
        testimonials = dbTestimonials.map((t) => ({
          name: t.name,
          role: t.role,
          initial: t.initial,
          text: t.text,
        }))
      }
      if (dbPricing.length) {
        pricing = dbPricing.map((p, i) => ({
          name: p.name,
          price: p.price,
          period: p.period,
          desc: p.description,
          features: asStringArray(p.features, PRICING[i]?.features ?? []),
          cta: p.cta,
          message: p.whatsappMessage,
          popular: p.popular,
        }))
      }
      if (dbOnline.length) {
        online = dbOnline.map((t, i) => ({
          level: t.level,
          name: t.name,
          badgeColor: t.badgeColor === "gold" ? "gold" : "teal",
          monthlyPrice: t.monthlyPrice,
          fullPrice: t.fullPrice,
          features: asStringArray(t.features, ONLINE_LEVELS[i]?.features ?? []),
          message: t.whatsappMessage,
        }))
      }
    } catch (err) {
      console.error("[public-content] using static fallback", err)
    }
  }

  const whatsappUrl = whatsappDeepLink(contact.whatsapp)
  const phoneHref = contact.phone.startsWith("tel:")
    ? contact.phone
    : `tel:${contact.phone}`

  return {
    contact,
    stats: stats.length ? stats : [...STATS],
    faqs,
    testimonials,
    pricing,
    online,
    whatsappUrl,
    phoneHref,
  }
}

export type PublicContent = Awaited<ReturnType<typeof getPublicContent>>
export type { SiteContactSettings }
