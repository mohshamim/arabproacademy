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

function dateOrNull(value: string) {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

export async function upsertCourse(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const data = {
    slug: str(formData, "slug"),
    name: str(formData, "name"),
    kind: str(formData, "kind") as "IN_PERSON" | "ONLINE",
    description: str(formData, "description"),
    durationLabel: str(formData, "durationLabel"),
    published: bool(formData, "published"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
  }
  if (id) {
    await prisma.course.update({ where: { id }, data })
    revalidatePath("/admin/courses")
    revalidatePath(`/admin/courses/${id}`)
    return
  }
  const created = await prisma.course.create({ data })
  revalidatePath("/admin/courses")
  redirect(`/admin/courses/${created.id}`)
}

export async function deleteCourse(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.course.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/courses")
  redirect("/admin/courses")
}

export async function upsertCourseWeek(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const courseId = str(formData, "courseId")
  const base = {
    courseId,
    weekNumber: Number(str(formData, "weekNumber") || 1),
    title: str(formData, "title"),
    outcomes: str(formData, "outcomes"),
    vocabulary: str(formData, "vocabulary"),
    activity: str(formData, "activity"),
    homework: str(formData, "homework"),
    materialUrl: str(formData, "materialUrl") || null,
  }
  const withMaterials = {
    ...base,
    audioUrl: str(formData, "audioUrl") || null,
    recordingUrl: str(formData, "recordingUrl") || null,
  }
  try {
    if (id) {
      await prisma.courseWeek.update({ where: { id }, data: withMaterials })
    } else {
      await prisma.courseWeek.create({ data: withMaterials })
    }
  } catch {
    if (id) {
      await prisma.courseWeek.update({ where: { id }, data: base })
    } else {
      await prisma.courseWeek.create({ data: base })
    }
  }
  revalidatePath(`/admin/courses/${courseId}`)
}

export async function deleteCourseWeek(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const courseId = str(formData, "courseId")
  await prisma.courseWeek.delete({ where: { id: str(formData, "id") } })
  revalidatePath(`/admin/courses/${courseId}`)
}

export async function upsertBatch(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const data = {
    courseId: str(formData, "courseId"),
    name: str(formData, "name"),
    mode: str(formData, "mode") as "IN_PERSON" | "ONLINE" | "HYBRID",
    startDate: dateOrNull(str(formData, "startDate")),
    endDate: dateOrNull(str(formData, "endDate")),
    daysLabel: str(formData, "daysLabel"),
    capacity: Number(str(formData, "capacity") || 12),
    status: str(formData, "status") as "UPCOMING" | "RUNNING" | "COMPLETED",
    notes: str(formData, "notes") || null,
  }
  if (id) {
    await prisma.batch.update({ where: { id }, data })
    revalidatePath("/admin/batches")
    revalidatePath(`/admin/batches/${id}`)
    return
  }
  const created = await prisma.batch.create({ data })
  revalidatePath("/admin/batches")
  redirect(`/admin/batches/${created.id}`)
}

export async function deleteBatch(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.batch.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/batches")
  redirect("/admin/batches")
}

export async function upsertStudent(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const id = str(formData, "id")
  const data = {
    name: str(formData, "name"),
    phone: str(formData, "phone"),
    email: str(formData, "email") || null,
    level: str(formData, "level") || null,
    status: str(formData, "status") as
      | "ACTIVE"
      | "COMPLETED"
      | "PAUSED"
      | "DROPPED",
    paymentNote: str(formData, "paymentNote") || null,
    notes: str(formData, "notes") || null,
    batchId: str(formData, "batchId") || null,
  }
  if (id) {
    await prisma.student.update({ where: { id }, data })
    revalidatePath("/admin/students")
    revalidatePath(`/admin/students/${id}`)
    revalidatePath("/admin/batches")
    return
  }
  const created = await prisma.student.create({ data })
  revalidatePath("/admin/students")
  redirect(`/admin/students/${created.id}`)
}

export async function deleteStudent(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  await prisma.student.delete({ where: { id: str(formData, "id") } })
  revalidatePath("/admin/students")
  redirect("/admin/students")
}

export async function enrollLeadAsStudent(formData: FormData) {
  await requireAdmin()
  const prisma = await prismaReady()
  const leadId = str(formData, "leadId")
  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  if (!lead) return
  const name = str(formData, "name") || lead.name || "Student"
  const phone = str(formData, "phone") || lead.phone || ""
  if (!phone) {
    throw new Error("Phone is required to enroll")
  }
  const student = await prisma.student.create({
    data: {
      name,
      phone,
      email: lead.email,
      level: str(formData, "level") || null,
      paymentNote: str(formData, "paymentNote") || null,
      batchId: str(formData, "batchId") || null,
      leadId,
      notes: lead.interest ? `From lead: ${lead.interest}` : null,
    },
  })
  await prisma.lead.update({
    where: { id: leadId },
    data: { status: "ENROLLED" },
  })
  revalidatePath("/admin/leads")
  revalidatePath(`/admin/leads/${leadId}`)
  revalidatePath("/admin/students")
  revalidatePath("/admin")
  redirect(`/admin/students/${student.id}`)
}
