import { LeadSource, LeadStatus, LeadType, Prisma } from "@prisma/client"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"

export type CreateLeadInput = {
  type: LeadType
  name?: string | null
  email?: string | null
  phone?: string | null
  interest?: string | null
  message?: string | null
  source?: LeadSource | string | null
  payload?: Prisma.InputJsonValue
}

function parseSource(s?: string | null): LeadSource {
  const v = (s || "WEBSITE").toUpperCase()
  const allowed: LeadSource[] = [
    "WEBSITE",
    "WHATSAPP",
    "INSTAGRAM",
    "GOOGLE",
    "REFERRAL",
    "OTHER",
  ]
  return (allowed.includes(v as LeadSource) ? v : "WEBSITE") as LeadSource
}

export async function createLead(input: CreateLeadInput) {
  if (!hasDatabaseUrl()) {
    console.warn("DATABASE_URL missing; skip lead persistence")
    return null
  }

  try {
    const prisma = await prismaReady()
    return await prisma.lead.create({
      data: {
        type: input.type,
        source: parseSource(input.source as string),
        name: input.name || null,
        email: input.email || null,
        phone: input.phone || null,
        interest: input.interest || null,
        message: input.message || null,
        payload: input.payload ?? undefined,
        status: LeadStatus.NEW,
      },
    })
  } catch (error) {
    console.error("Failed to persist lead", error)
    return null
  }
}
