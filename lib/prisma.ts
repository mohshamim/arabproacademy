import { PrismaClient } from "@prisma/client"
import {
  getMysqlHostCandidates,
  hasDatabaseConfig,
  resolveDatabaseUrl,
} from "@/lib/database-url"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaUrl: string | undefined
  prismaVerified: boolean | undefined
}

function createClient(url?: string) {
  return new PrismaClient({
    datasources: url ? { db: { url } } : undefined,
    log:
      process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })
}

/**
 * Pick first host that accepts MySQL auth (Hostinger Node often
 * fails on "localhost" but works on 127.0.0.1).
 */
async function resolveWorkingUrl(): Promise<string | undefined> {
  const candidates = getMysqlHostCandidates()
  for (const host of candidates) {
    const url = resolveDatabaseUrl(host)
    if (!url) continue
    const probe = createClient(url)
    try {
      await probe.$queryRaw`SELECT 1`
      await probe.$disconnect().catch(() => undefined)
      process.env.DATABASE_URL = url
      process.env.MYSQL_HOST = host
      return url
    } catch {
      await probe.$disconnect().catch(() => undefined)
    }
  }
  return resolveDatabaseUrl()
}

let initPromise: Promise<PrismaClient> | null = null

async function getPrisma(): Promise<PrismaClient> {
  if (globalForPrisma.prisma && globalForPrisma.prismaVerified) {
    return globalForPrisma.prisma
  }

  if (!initPromise) {
    initPromise = (async () => {
      const url = await resolveWorkingUrl()

      if (
        globalForPrisma.prisma &&
        globalForPrisma.prismaUrl &&
        url &&
        globalForPrisma.prismaUrl !== url
      ) {
        await globalForPrisma.prisma.$disconnect().catch(() => undefined)
        globalForPrisma.prisma = undefined
      }

      if (globalForPrisma.prisma && globalForPrisma.prismaVerified) {
        return globalForPrisma.prisma
      }

      if (globalForPrisma.prisma) {
        await globalForPrisma.prisma.$disconnect().catch(() => undefined)
      }

      const client = createClient(url)
      try {
        await client.$queryRaw`SELECT 1`
        globalForPrisma.prismaVerified = true
      } catch (err) {
        globalForPrisma.prismaVerified = false
        console.error("[prisma] working URL still failed SELECT 1", err)
      }

      globalForPrisma.prisma = client
      globalForPrisma.prismaUrl = url
      return client
    })().finally(() => {
      if (!globalForPrisma.prismaVerified) {
        initPromise = null
      }
    })
  }

  return initPromise
}

const databaseUrl = resolveDatabaseUrl()
export const prisma = globalForPrisma.prisma ?? createClient(databaseUrl)
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
  globalForPrisma.prismaUrl = databaseUrl
  globalForPrisma.prismaVerified = false
}

/** Prefer this anywhere login / mutations need a live MySQL connection */
export async function prismaReady() {
  return getPrisma()
}

export function hasDatabaseUrl() {
  return hasDatabaseConfig()
}
