import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"

export async function logActivity(input: {
  actorEmail: string
  actorId?: string | null
  action: string
  entityType: string
  entityId?: string | null
  summary: string
  meta?: Record<string, unknown>
}) {
  if (!hasDatabaseUrl()) return
  try {
    const prisma = await prismaReady()
    await prisma.activityLog.create({
      data: {
        actorEmail: input.actorEmail,
        actorId: input.actorId || null,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId || null,
        summary: input.summary,
        meta: (input.meta as object) ?? undefined,
      },
    })
  } catch (err) {
    console.error("[activity-log]", err)
  }
}
