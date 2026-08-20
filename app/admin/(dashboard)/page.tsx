import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin, isSuperAdmin } from "@/lib/admin-auth"
import { SeedWebsiteButton } from "@/components/admin/seed-website-button"
import { AdminPageHeader, AdminStatCard } from "@/components/admin/ui"
import Link from "next/link"

export default async function AdminOverviewPage() {
  const session = await requireAdmin()

  let stats = {
    leadsNew: 0,
    leadsTotal: 0,
    students: 0,
    batches: 0,
  }

  if (hasDatabaseUrl()) {
    try {
      const prisma = await prismaReady()
      const [leadsNew, leadsTotal, students, batches] = await Promise.all([
        prisma.lead.count({ where: { status: "NEW" } }),
        prisma.lead.count(),
        prisma.student.count({ where: { status: "ACTIVE" } }).catch(() => 0),
        prisma.batch.count({ where: { status: "RUNNING" } }).catch(() => 0),
      ])
      stats = { leadsNew, leadsTotal, students, batches }
    } catch (err) {
      console.error("[admin overview]", err)
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Overview"
        description="Leads and content for Arab Pro Academy."
      />

      {!hasDatabaseUrl() ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          MySQL is not configured. Set MYSQL_* (or DATABASE_URL) in the
          environment — same as BIMSavvy on Hostinger.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="New leads"
          value={stats.leadsNew}
          href="/admin/leads?status=NEW"
        />
        <AdminStatCard
          label="All leads"
          value={stats.leadsTotal}
          href="/admin/leads"
        />
        <AdminStatCard
          label="Active students"
          value={stats.students}
          href="/admin/students"
        />
        <AdminStatCard
          label="Running batches"
          value={stats.batches}
          href="/admin/batches"
        />
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href="/admin/leads"
          className="rounded-xl bg-[#0d1b2a] px-4 py-2 font-semibold text-white"
        >
          Open lead inbox
        </Link>
        <Link
          href="/admin/courses"
          className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-2 font-semibold text-[#374151]"
        >
          Courses & syllabus
        </Link>
      </div>

      {isSuperAdmin(session.user.role) ? <SeedWebsiteButton /> : null}

      <p className="text-xs text-[#6B7280]">
        New courses tables: import{" "}
        <code>prisma/hostinger-courses-upgrade.sql</code> in phpMyAdmin, then
        Seed again to load the 12-week and 8-week syllabi.
      </p>
    </div>
  )
}
