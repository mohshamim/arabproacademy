import { notFound } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import { AdminPageHeader, adminInputClass } from "@/components/admin/ui"
import {
  enrollLeadAsStudent,
  updateLeadDetails,
} from "@/app/admin/(dashboard)/actions"

const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "INTERESTED",
  "ENROLLED",
  "LOST",
  "ARCHIVED",
] as const

const SOURCES = [
  "WEBSITE",
  "WHATSAPP",
  "INSTAGRAM",
  "GOOGLE",
  "REFERRAL",
  "OTHER",
] as const

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const prisma = await prismaReady()
  const { id } = await params
  const [lead, admins] = await Promise.all([
    prisma.lead.findUnique({ where: { id } }),
    prisma.adminUser.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, email: true },
    }),
  ])
  if (!lead) notFound()

  let batches: { id: string; name: string; course: { name: string } }[] = []
  let enrolledStudents: { id: string; name: string }[] = []
  try {
    ;[batches, enrolledStudents] = await Promise.all([
      prisma.batch.findMany({
        where: { status: { in: ["UPCOMING", "RUNNING"] } },
        orderBy: { startDate: "asc" },
        include: { course: { select: { name: true } } },
      }),
      prisma.student.findMany({
        where: { leadId: id },
        select: { id: true, name: true },
      }),
    ])
  } catch {
    /* Course tables not imported yet */
  }

  const phoneDigits = (lead.phone || "").replace(/\D/g, "")
  const whatsappHref = phoneDigits
    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
        `Hi ${lead.name || ""}, this is Arab Pro Academy regarding ${lead.interest || "your enquiry"}.`,
      )}`
    : null

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={lead.name || lead.phone || "Lead"}
        description={`${lead.type} · ${lead.status} · ${lead.source}`}
      />

      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
        >
          WhatsApp this lead
        </a>
      ) : null}

      {enrolledStudents.length > 0 ? (
        <p className="text-sm text-emerald-800">
          Already enrolled as student — open from Students.
        </p>
      ) : (
        <form
          action={enrollLeadAsStudent}
          className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5"
        >
          <h2 className="text-sm font-semibold">Enroll as student</h2>
          <input type="hidden" name="leadId" value={lead.id} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              defaultValue={lead.name || ""}
              placeholder="Name"
              className={adminInputClass}
            />
            <input
              name="phone"
              defaultValue={lead.phone || ""}
              required
              placeholder="Phone"
              className={adminInputClass}
            />
            <input name="level" placeholder="Beginner / Intermediate" className={adminInputClass} />
            <input name="paymentNote" placeholder="Paid / pending" className={adminInputClass} />
            <select name="batchId" className={adminInputClass}>
              <option value="">Assign batch later</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.course.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white"
          >
            Enroll
          </button>
        </form>
      )}

      <form
        action={updateLeadDetails}
        className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5"
      >
        <input type="hidden" name="id" value={lead.id} />
        <p className="text-sm text-[#4B5563]">
          {lead.phone || "—"} · {lead.interest || "—"}
        </p>
        {lead.message ? (
          <p className="rounded-xl bg-[#f9fafb] p-3 text-sm text-[#374151]">
            {lead.message}
          </p>
        ) : null}
        <select
          name="status"
          defaultValue={lead.status}
          className={adminInputClass}
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          name="source"
          defaultValue={lead.source}
          className={adminInputClass}
        >
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          name="assigneeId"
          defaultValue={lead.assigneeId || ""}
          className={adminInputClass}
        >
          <option value="">Unassigned</option>
          {admins.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="followUpAt"
          defaultValue={
            lead.followUpAt
              ? new Date(lead.followUpAt.getTime() - lead.followUpAt.getTimezoneOffset() * 60000)
                  .toISOString()
                  .slice(0, 16)
              : ""
          }
          className={adminInputClass}
        />
        <textarea
          name="notes"
          rows={4}
          defaultValue={lead.notes || ""}
          placeholder="Internal notes"
          className={adminInputClass}
        />
        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white"
        >
          Save
        </button>
      </form>
    </div>
  )
}
