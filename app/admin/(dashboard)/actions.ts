"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import type { AdminRole, LeadSource, LeadStatus } from "@prisma/client"
import { prismaReady } from "@/lib/prisma"
import {
  requireAdmin,
  requireCanDeleteLeads,
  requireSuperAdmin,
} from "@/lib/admin-auth"
import { logActivity } from "@/lib/activity-log"
import { upsertSetting } from "@/lib/site-settings"

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim()
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true"
}

function jsonFeatures(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const status = str(formData, "status") as LeadStatus
  await prisma.lead.update({ where: { id }, data: { status } })
  revalidatePath("/admin/leads")
  revalidatePath("/admin")
}

export async function deleteLead(formData: FormData) {
  await requireCanDeleteLeads()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  await prisma.lead.delete({ where: { id } })
  revalidatePath("/admin/leads")
  revalidatePath("/admin")
}

export async function updateLeadDetails(formData: FormData) {
  const session = await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  await prisma.lead.update({
    where: { id },
    data: {
      notes: str(formData, "notes") || null,
      status: str(formData, "status") as LeadStatus,
      source: (str(formData, "source") || "WEBSITE") as LeadSource,
      assigneeId: str(formData, "assigneeId") || null,
      followUpAt: str(formData, "followUpAt")
        ? new Date(str(formData, "followUpAt"))
        : null,
    },
  })
  await logActivity({
    actorEmail: session.user.email || "",
    actorId: session.user.id,
    action: "update",
    entityType: "Lead",
    entityId: id,
    summary: `Updated lead ${id}`,
  })
  revalidatePath("/admin/leads")
  revalidatePath(`/admin/leads/${id}`)
  revalidatePath("/admin")
  redirect(`/admin/leads/${id}`)
}

export async function upsertFaq(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const data = {
    question: str(formData, "question"),
    answer: str(formData, "answer"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
    published: bool(formData, "published"),
  }
  if (id) {
    await prisma.faqItem.update({ where: { id }, data })
  } else {
    await prisma.faqItem.create({ data })
  }
  revalidatePath("/admin/faq")
  revalidatePath("/")
}

export async function deleteFaq(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.faqItem.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/faq")
  revalidatePath("/")
}

export async function upsertTestimonial(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const name = str(formData, "name")
  const data = {
    name,
    role: str(formData, "role"),
    initial: str(formData, "initial") || name.slice(0, 1).toUpperCase(),
    text: str(formData, "text"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
    published: bool(formData, "published"),
  }
  if (id) {
    await prisma.testimonial.update({ where: { id }, data })
  } else {
    await prisma.testimonial.create({ data })
  }
  revalidatePath("/admin/testimonials")
  revalidatePath("/")
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.testimonial.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/testimonials")
  revalidatePath("/")
}

export async function upsertPricing(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const slug = str(formData, "slug")
  const data = {
    slug,
    name: str(formData, "name"),
    price: str(formData, "price"),
    period: str(formData, "period"),
    description: str(formData, "description"),
    features: jsonFeatures(str(formData, "features")),
    cta: str(formData, "cta"),
    whatsappMessage: str(formData, "whatsappMessage"),
    popular: bool(formData, "popular"),
    published: bool(formData, "published"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
  }
  if (id) {
    await prisma.pricingPackage.update({ where: { id }, data })
  } else {
    await prisma.pricingPackage.create({ data })
  }
  revalidatePath("/admin/pricing")
  revalidatePath("/")
}

export async function deletePricing(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.pricingPackage.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/pricing")
  revalidatePath("/")
}

export async function upsertOnlineLevel(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const data = {
    slug: str(formData, "slug"),
    level: str(formData, "level"),
    name: str(formData, "name"),
    badgeColor: str(formData, "badgeColor") || "teal",
    monthlyPrice: str(formData, "monthlyPrice"),
    fullPrice: str(formData, "fullPrice"),
    features: jsonFeatures(str(formData, "features")),
    whatsappMessage: str(formData, "whatsappMessage"),
    published: bool(formData, "published"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
  }
  if (id) {
    await prisma.onlineLevel.update({ where: { id }, data })
  } else {
    await prisma.onlineLevel.create({ data })
  }
  revalidatePath("/admin/online")
  revalidatePath("/")
}

export async function deleteOnlineLevel(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.onlineLevel.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/online")
  revalidatePath("/")
}

export async function saveContactSettings(formData: FormData) {
  await requireSuperAdmin()
  await upsertSetting("contact", {
    phone: str(formData, "phone"),
    phoneDisplay: str(formData, "phoneDisplay"),
    email: str(formData, "email"),
    whatsapp: str(formData, "whatsapp").replace(/\D/g, ""),
    location: str(formData, "location"),
    websiteUrl: str(formData, "websiteUrl"),
  })
  await upsertSetting("stats", {
    students: str(formData, "students"),
    successRate: str(formData, "successRate"),
    duration: str(formData, "duration"),
    locationLabel: str(formData, "locationLabel"),
  })
  revalidatePath("/admin/settings")
  revalidatePath("/")
}

export async function upsertAdminUser(formData: FormData) {
  await requireSuperAdmin()
  const prisma = await prismaReady()
  const email = str(formData, "email").toLowerCase()
  const password = str(formData, "password")
  const data = {
    name: str(formData, "name"),
    email,
    role: str(formData, "role") as AdminRole,
    active: bool(formData, "active"),
    passwordHash: await bcrypt.hash(password, 12),
  }
  await prisma.adminUser.upsert({
    where: { email },
    update: {
      name: data.name,
      role: data.role,
      active: data.active,
      ...(password ? { passwordHash: data.passwordHash } : {}),
    },
    create: data,
  })
  revalidatePath("/admin/admins")
}

export async function deleteAdminUser(formData: FormData) {
  const session = await requireSuperAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  if (id === session.user.id) {
    throw new Error("You cannot delete your own account")
  }
  await prisma.adminUser.delete({ where: { id } })
  revalidatePath("/admin/admins")
}
