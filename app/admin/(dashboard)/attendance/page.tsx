import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminCard,
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  StatusPill,
  adminBtnClass,
  adminInputClass,
} from "@/components/admin/ui"
import { createClassSession } from "@/app/admin/(dashboard)/lms-actions"

export default async function AdminAttendancePage({
  searchParams,
}: {
  searchParams?: Promise<{ batch?: string }>
}) {
  await requireAdmin()
  const sp = (await searchParams) || {}

  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Attendance" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  let batches: {
    id: string
    name: string
    _count: { students: number }
  }[] = []
  let sessions: {
    id: string
    title: string
    heldOn: Date
    batch: { name: string }
    _count: { attendance: number }
  }[] = []
  try {
    batches = await prisma.batch.findMany({
      orderBy: [{ status: "asc" }, { startDate: "desc" }],
      include: { course: { select: { name: true } }, _count: { select: { students: true } } },
    })
    sessions = await prisma.classSession.findMany({
      where: sp.batch ? { batchId: sp.batch } : undefined,
      orderBy: { heldOn: "desc" },
      take: 80,
      include: {
        batch: { select: { name: true } },
        _count: { select: { attendance: true } },
      },
    })
  } catch {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Attendance" />
        <AdminEmpty
          message="Attendance tables are not in MySQL yet."
          hint="Import prisma/hostinger-lms-upgrade.sql in phpMyAdmin, then Seed on Overview."
        />
      </div>
    )
  }

  const selected = batches.find((b) => b.id === sp.batch)
  let atRisk: { id: string; name: string; phone: string; absences: number }[] = []
  if (selected) {
    const students = await prisma.student.findMany({
      where: { batchId: selected.id, status: "ACTIVE" },
      include: { attendance: { select: { status: true } } },
    })
    atRisk = students
      .map((s) => ({
        id: s.id,
        name: s.name,
        phone: s.phone,
        absences: s.attendance.filter((a) => a.status === "ABSENT").length,
      }))
      .filter((s) => s.absences >= 2)
      .sort((a, b) => b.absences - a.absences)
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Attendance"
        description="Mark present / late / absent per class. Students with 2+ absences appear on the make-up list."
      />

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/attendance"
          className={`rounded-full px-3 py-1 text-xs font-semibold ${!sp.batch ? "bg-[#0d1b2a] text-white" : "bg-white text-[#4B5563] ring-1 ring-[#e5e7eb]"}`}
        >
          All sessions
        </Link>
        {batches.map((b) => (
          <Link
            key={b.id}
            href={`/admin/attendance?batch=${b.id}`}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${sp.batch === b.id ? "bg-[#0d1b2a] text-white" : "bg-white text-[#4B5563] ring-1 ring-[#e5e7eb]"}`}
          >
            {b.name}
          </Link>
        ))}
      </div>

      {batches.length === 0 ? (
        <AdminEmpty message="Create a batch first, then take attendance." />
      ) : (
        <AdminCard title="New class session">
          <form action={createClassSession} className="grid gap-3 sm:grid-cols-2">
            <select name="batchId" defaultValue={sp.batch || batches[0]?.id} className={adminInputClass}>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b._count.students} students)
                </option>
              ))}
            </select>
            <input name="heldOn" type="date" required className={adminInputClass} />
            <input name="title" placeholder="Week 3 · Greetings review" className={adminInputClass} />
            <input name="notes" placeholder="Notes (optional)" className={adminInputClass} />
            <div className="sm:col-span-2">
              <button type="submit" className={adminBtnClass}>
                Open roll call
              </button>
            </div>
          </form>
        </AdminCard>
      )}

      {selected && atRisk.length > 0 ? (
        <AdminCard title="Make-up list (2+ absences)">
          <ul className="divide-y divide-[#f3f4f6] text-sm">
            {atRisk.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-2">
                <span>
                  <Link href={`/admin/students/${s.id}`} className="font-medium text-[#0d1b2a] hover:text-[#c4962a]">
                    {s.name}
                  </Link>
                  <span className="ml-2 text-xs text-[#6B7280]">{s.phone}</span>
                </span>
                <StatusPill value="ABSENT" />
                <span className="text-xs font-semibold text-rose-700">{s.absences} absences</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      ) : null}

      {sessions.length === 0 ? (
        <AdminEmpty message="No sessions yet." hint="Create one above to take roll." />
      ) : (
        <AdminTable headers={["When", "Session", "Batch", "Marked", ""]}>
          {sessions.map((s) => (
            <tr key={s.id} className="hover:bg-[#fdf8ee]/60">
              <td className="px-4 py-3 text-xs text-[#6B7280]">
                {s.heldOn.toISOString().slice(0, 10)}
              </td>
              <td className="px-4 py-3 font-medium">{s.title}</td>
              <td className="px-4 py-3 text-xs">{s.batch.name}</td>
              <td className="px-4 py-3 text-xs">{s._count.attendance}</td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/attendance/${s.id}`}
                  className="text-xs font-semibold text-[#c4962a]"
                >
                  Mark
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  )
}
