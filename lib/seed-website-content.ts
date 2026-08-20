import type { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import {
  FAQS,
  ONLINE_LEVELS,
  PRICING,
  TESTIMONIALS,
} from "@/lib/content"
import { DEFAULT_CONTACT, DEFAULT_STATS } from "@/lib/site-settings"
import { seedCoursesAndSyllabus } from "@/lib/seed-courses"

export type SeedResult = {
  pricing: number
  online: number
  testimonials: number
  faqs: number
  courses: number
  weeks: number
  adminUpserted: boolean
}

type SeedOptions = {
  skipAdmin?: boolean
}

export async function seedWebsiteContent(
  prisma: PrismaClient,
  options: SeedOptions = {},
): Promise<SeedResult> {
  let adminUpserted = false

  if (!options.skipAdmin) {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@arabproacademy.com")
      .trim()
      .toLowerCase()
    const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!"
    const adminName = process.env.ADMIN_NAME || "Arab Pro Academy Admin"
    const passwordHash = await bcrypt.hash(adminPassword, 12)
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: {
        name: adminName,
        passwordHash,
        role: "SUPER_ADMIN",
        active: true,
      },
      create: {
        email: adminEmail,
        name: adminName,
        passwordHash,
        role: "SUPER_ADMIN",
        active: true,
      },
    })
    adminUpserted = true
  }

  await prisma.siteSetting.upsert({
    where: { key: "contact" },
    update: {},
    create: { key: "contact", value: DEFAULT_CONTACT },
  })
  await prisma.siteSetting.upsert({
    where: { key: "stats" },
    update: {},
    create: { key: "stats", value: DEFAULT_STATS },
  })

  const pricingSlugs = ["monthly", "three-month"]
  for (const [index, plan] of PRICING.entries()) {
    const slug = pricingSlugs[index] || `plan-${index + 1}`
    await prisma.pricingPackage.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: plan.name,
        price: plan.price,
        period: plan.period,
        description: plan.desc,
        features: [...plan.features],
        cta: plan.cta,
        whatsappMessage: plan.message,
        popular: plan.popular,
        published: true,
        sortOrder: index,
      },
    })
  }

  const onlineSlugs = ["beginner", "intermediate"]
  for (const [index, track] of ONLINE_LEVELS.entries()) {
    const slug = onlineSlugs[index] || `level-${index + 1}`
    await prisma.onlineLevel.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        level: track.level,
        name: track.name,
        badgeColor: track.badgeColor,
        monthlyPrice: track.monthlyPrice,
        fullPrice: track.fullPrice,
        features: [...track.features],
        whatsappMessage: track.message,
        published: true,
        sortOrder: index,
      },
    })
  }

  const existingFaqs = await prisma.faqItem.count()
  if (existingFaqs === 0) {
    await prisma.faqItem.createMany({
      data: FAQS.map((faq, index) => ({
        question: faq.q,
        answer: faq.a,
        published: true,
        sortOrder: index,
      })),
    })
  }

  const existingTestimonials = await prisma.testimonial.count()
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({
      data: TESTIMONIALS.map((t, index) => ({
        name: t.name,
        role: t.role,
        initial: t.initial,
        text: t.text,
        published: true,
        sortOrder: index,
      })),
    })
  }

  let courses = 0
  let weeks = 0
  try {
    const taught = await seedCoursesAndSyllabus(prisma)
    courses = taught.courses
    weeks = taught.weeks
  } catch (err) {
    console.error("[seed] courses/syllabus skipped (import hostinger-courses-upgrade.sql)", err)
  }

  return {
    pricing: await prisma.pricingPackage.count(),
    online: await prisma.onlineLevel.count(),
    testimonials: await prisma.testimonial.count(),
    faqs: await prisma.faqItem.count(),
    courses,
    weeks,
    adminUpserted,
  }
}
