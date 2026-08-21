import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import { AdminEmpty, AdminPageHeader, AdminTable } from "@/components/admin/ui"
import {
  deleteLead,
  updateLeadStatus,
} from "@/app/admin/(dashboard)/actions"

const STATUS_CLASS: Record<string, string> = {
  NEW: "bg-[#fdf8ee] text-[#c4962a]",
  CONTACTED: "bg-amber-50 text-amber-800",
  INTERESTED: "bg-violet-50 text-violet-700",
  ENROLLED: "bg-emerald-50 text-emerald-700",
  LOST: "bg-gray-100 text-gray-600",
  ARCHIVED: "bg-gray-100 text-gray-600",
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string; status?: string }>
}) {
  await requireAdmin()
  const sp = (await searchParams) || {}

  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Leads" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const leads = await prisma.lead.findMany({
    where: {
      ...(sp.type
        ? { type: sp.type as "CONTACT" | "ENROLL" }
        : {}),
      ...(sp.status
        ? {
            status: sp.status as
              | "NEW"
              | "CONTACTED"
              | "INTERESTED"
              | "ENROLLED"
              | "LOST"
              | "ARCHIVED",
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <AdminPageHeader
          title="Leads"
          description="Callback requests from the website form. Open WhatsApp, update pipeline status."
        />
        <a
          href="/api/admin/leads/export"
          className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-2 text-xs font-semibold text-[#374151]"
        >
          Export CSV
        </a>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { href: "/admin/leads", label: "All" },
          { href: "/admin/leads?status=NEW", label: "New" },
          { href: "/admin/leads?status=CONTACTED", label: "Contacted" },
          { href: "/admin/leads?status=INTERESTED", label: "Interested" },
          { href: "/admin/leads?status=ENROLLED", label: "Enrolled" },
          { href: "/admin/leads?status=LOST", label: "Lost" },
        ].map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="rounded-full border border-[#e5e7eb] bg-white px-3 py-1 font-medium text-[#4B5563] hover:border-[#c4962a] hover:text-[#c4962a]"
          >
            {f.label}
          </Link>
        ))}
      </div>

      {leads.length === 0 ? (
        <AdminEmpty message="No leads yet. Submissions from the homepage form appear here." />
      ) : (
        <AdminTable
          headers={["Interest", "Contact", "Status", "Date", "Actions"]}
        >
          {leads.map((lead) => {
            const digits = (lead.phone || "").replace(/\D/g, "")
            return (
              <tr key={lead.id} className="align-top">
                <td className="px-4 py-3 font-medium text-[#1F2937]">
                  {lead.interest || lead.type}
                </td>
                <td className="px-4 py-3 text-[#4B5563]">
                  <div>{lead.name || "—"}</div>
                  <div className="text-xs">{lead.phone || ""}</div>
                  {digits ? (
                    <a
                      href={`https://wa.me/${digits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-[#25D366]"
                    >
                      WhatsApp
                    </a>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      STATUS_CLASS[lead.status] || STATUS_CLASS.ARCHIVED
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[#6B7280]">
                  {lead.createdAt.toLocaleString("en-GB")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="text-xs font-semibold text-[#c4962a]"
                    >
                      Open
                    </Link>
                    <form action={updateLeadStatus}>
                      <input type="hidden" name="id" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="rounded-lg border border-[#e5e7eb] px-2 py-1 text-xs"
                      >
                        {Object.keys(STATUS_CLASS).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="ml-1 cursor-pointer text-xs font-semibold text-[#0d1b2a]"
                      >
                        Save
                      </button>
                    </form>
                    <form action={deleteLead}>
                      <input type="hidden" name="id" value={lead.id} />
                      <button
                        type="submit"
                        className="cursor-pointer text-xs font-semibold text-[#b91c1c]"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            )
          })}
        </AdminTable>
      )}
    </div>
  )
}
