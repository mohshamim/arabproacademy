/** Hostinger Node MySQL often rejects "localhost" (socket) but accepts 127.0.0.1. */
export function normalizeMysqlHost(host: string | undefined | null): string {
  const h = (host || "").trim()
  if (!h || h === "localhost") return "127.0.0.1"
  return h
}

/**
 * Build / normalize MySQL connection URL for Hostinger.
 * Prefer MYSQL_* parts (never use a stale DATABASE_URL if parts exist).
 */
export function resolveDatabaseUrl(hostOverride?: string): string | undefined {
  const user = process.env.MYSQL_USER?.trim()
  const password = (process.env.MYSQL_PASSWORD ?? "").trim()
  const host = normalizeMysqlHost(
    hostOverride || process.env.MYSQL_HOST || "127.0.0.1",
  )
  const port = (process.env.MYSQL_PORT || "3306").trim()
  const database = process.env.MYSQL_DATABASE?.trim()

  if (user && database) {
    const url = `mysql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${encodeURIComponent(database)}`
    process.env.DATABASE_URL = url
    return url
  }

  const existing = process.env.DATABASE_URL?.trim()
  return existing || undefined
}

export function getMysqlHostCandidates(): string[] {
  const primary = normalizeMysqlHost(process.env.MYSQL_HOST)
  const extras = [
    "127.0.0.1",
    process.env.MYSQL_REMOTE_HOST?.trim(),
  ].filter(Boolean) as string[]

  return Array.from(new Set([primary, ...extras]))
}

export function hasDatabaseConfig() {
  return Boolean(resolveDatabaseUrl())
}
