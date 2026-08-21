import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin, isSuperAdmin } from "@/lib/admin-auth"
import { SeedWebsiteButton } from "@/components/admin/seed-website-button"
import {
  AdminCard,
  AdminPageHeader,
  AdminStatCard,
  StatusPill,
} from "@/components/admin/ui"
import Link from "next/link"

export default async function AdminOverviewPage() {
  const session = await requireAdmin()

  let stats = {
    leadsNew: 0,
    leadsTotal: 0,
    students: 0,
    batches: 0,
    atRisk: 0,
    quizzes: 0,
  }
  let recentLeads: { id: string; name: string | null; interest: string | null; status: string; createdAt: Date }[] =
    []
  let runningBatches: { id: string; name: string; _count: { students: number }; capacity: number }[] =
    []

  if (hasDatabaseUrl()) {
    try {
      const prisma = await prismaReady()
      const [leadsNew, leadsTotal, students, batches, recent, running] =
        await Promise.all([
          prisma.lead.count({ where: { status: "NEW" } }),
          prisma.lead.count(),
          prisma.student.count({ where: { status: "ACTIVE" } }).catch(() => 0),
          prisma.batch.count({ where: { status: "RUNNING" } }).catch(() => 0),
          prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
              id: true,
              name: true,
              interest: true,
              status: true,
              createdAt: true,
            },
          }),
          prisma.batch
            .findMany({
              where: { status: "RUNNING" },
              include: { _count: { select: { students: true } } },
            })
            .catch(() => []),
        ])
      stats = { ...stats, leadsNew, leadsTotal, students, batches }
      recentLeads = recent
      runningBatches = running

      try {
        const absentees = await prisma.student.findMany({
          where: { status: "ACTIVE" },
          include: { attendance: { select: { status: true } } },
        })
        stats.atRisk = absentees.filter(
          (s) => s.attendance.filter((a) => a.status === "ABSENT").length >= 2,
        ).length
        stats.quizzes = await prisma.quizAttempt.count()
      } catch {
        /* LMS not imported */
      }
    } catch (err) {
      console.error("[admin overview]", err)
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Academy overview"
        description="Leads, classes, attendance, and spoken-Arabic exams. Enrollment stays on WhatsApp."
      />

      {!hasDatabaseUrl() ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          MySQL is not configured. Set MYSQL_* (or DATABASE_URL) in the
          environment — same as BIMSavvy on Hostinger.
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AdminStatCard
          label="New leads"
          value={stats.leadsNew}
          href="/admin/leads?status=NEW"
          tone="gold"
        />
        <AdminStatCard
          label="Active students"
          value={stats.students}
          href="/admin/students"
          tone="teal"
        />
        <AdminStatCard
          label="Running batches"
          value={stats.batches}
          href="/admin/batches"
        />
        <AdminStatCard
          label="Make-up needed"
          value={stats.atRisk}
          href="/admin/attendance"
          hint="2+ absences"
          tone="rose"
        />
        <AdminStatCard
          label="Quiz attempts"
          value={stats.quizzes}
          href="/admin/quizzes"
        />
        <AdminStatCard
          label="All leads"
          value={stats.leadsTotal}
          href="/admin/leads"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard title="Latest leads">
          {recentLeads.length === 0 ? (
            <p className="text-sm text-[#6B7280]">No leads yet.</p>
          ) : (
            <ul className="divide-y divide-[#f3f4f6]">
              {recentLeads.map((l) => (
                <li key={l.id} className="flex items-center justify-between py-2.5">
                  <Link href={`/admin/leads/${l.id}`} className="text-sm font-medium hover:text-[#c4962a]">
                    {l.name || "Lead"}{" "}
                    <span className="text-xs font-normal text-[#6B7280]">
                      {l.interest}
                    </span>
                  </Link>
                  <StatusPill value={l.status} />
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
        <AdminCard title="Live batches">
          {runningBatches.length === 0 ? (
            <p className="text-sm text-[#6B7280]">No running batches.</p>
          ) : (
            <ul className="divide-y divide-[#f3f4f6]">
              {runningBatches.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-2.5">
                  <Link href={`/admin/batches/${b.id}`} className="text-sm font-medium hover:text-[#c4962a]">
                    {b.name}
                  </Link>
                  <span className="text-xs text-[#6B7280]">
                    {b._count.students}/{b.capacity} seats
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <Link href="/admin/attendance" className="rounded-lg bg-[#0d1b2a] px-3 py-1.5 text-white">
              Take attendance
            </Link>
            <Link href="/admin/exams" className="rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-[#374151]">
              Score oral exam
            </Link>
          </div>
        </AdminCard>
      </div>

      {isSuperAdmin(session.user.role) ? <SeedWebsiteButton /> : null}

      <p className="text-xs text-[#6B7280]">
        New teaching tables: import{" "}
        <code className="rounded bg-white px-1">prisma/hostinger-lms-upgrade.sql</code>{" "}
        in phpMyAdmin, then Seed again for the placement quiz.
      </p>
    </div>
  )
}
