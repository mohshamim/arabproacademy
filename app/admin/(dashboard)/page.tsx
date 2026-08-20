import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin, isSuperAdmin } from "@/lib/admin-auth"
import { SeedWebsiteButton } from "@/components/admin/seed-website-button"
import { AdminPageHeader, AdminStatCard } from "@/components/admin/ui"
import Link from "next/link"

export default async function AdminOverviewPage() {
  const session = await requireAdmin()

  let stats = { leadsNew: 0, leadsTotal: 0, enrolled: 0, faqs: 0 }

  if (hasDatabaseUrl()) {
    try {
      const prisma = await prismaReady()
      const [leadsNew, leadsTotal, enrolled, faqs] = await Promise.all([
        prisma.lead.count({ where: { status: "NEW" } }),
        prisma.lead.count(),
        prisma.lead.count({ where: { status: "ENROLLED" } }),
        prisma.faqItem.count({ where: { published: true } }),
      ])
      stats = { leadsNew, leadsTotal, enrolled, faqs }
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
          label="Enrolled"
          value={stats.enrolled}
          href="/admin/leads?status=ENROLLED"
        />
        <AdminStatCard label="Published FAQ" value={stats.faqs} href="/admin/faq" />
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href="/admin/leads"
          className="rounded-xl bg-[#0d1b2a] px-4 py-2 font-semibold text-white"
        >
          Open lead inbox
        </Link>
        <Link
          href="/admin/pricing"
          className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-2 font-semibold text-[#374151]"
        >
          Edit pricing
        </Link>
      </div>

      {isSuperAdmin(session.user.role) ? <SeedWebsiteButton /> : null}
    </div>
  )
}
