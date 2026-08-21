import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  StatusPill,
  adminInputClass,
} from "@/components/admin/ui"
import { upsertBatch } from "@/app/admin/(dashboard)/actions"

export default async function AdminBatchesPage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Batches" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const [batches, courses] = await Promise.all([
    prisma.batch.findMany({
      orderBy: [{ startDate: "desc" }, { createdAt: "desc" }],
      include: {
        course: { select: { name: true } },
        _count: { select: { students: true } },
      },
    }),
    prisma.course.findMany({ orderBy: { sortOrder: "asc" } }),
  ])

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Batches"
        description="A named group with dates and seats. Enroll students into a running or upcoming batch."
      />

      {courses.length === 0 ? (
        <AdminEmpty message="Create or seed a course before adding a batch." />
      ) : (
        <form action={upsertBatch} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
          <h2 className="text-sm font-semibold">New batch</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="name" required placeholder="Riyadh evening — Sep 2026" className={adminInputClass} />
            <select name="courseId" required className={adminInputClass}>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select name="mode" defaultValue="IN_PERSON" className={adminInputClass}>
              <option value="IN_PERSON">In person</option>
              <option value="ONLINE">Online</option>
              <option value="HYBRID">Hybrid</option>
            </select>
            <select name="status" defaultValue="UPCOMING" className={adminInputClass}>
              <option value="UPCOMING">Upcoming</option>
              <option value="RUNNING">Running</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <input name="startDate" type="date" className={adminInputClass} />
            <input name="endDate" type="date" className={adminInputClass} />
            <input name="daysLabel" placeholder="Sat / Mon / Wed 7pm" className={adminInputClass} />
            <input name="capacity" type="number" defaultValue={12} className={adminInputClass} />
          </div>
          <textarea name="notes" rows={2} placeholder="Classroom / Zoom link (internal)" className={adminInputClass} />
          <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
            Create batch
          </button>
        </form>
      )}

      {batches.length === 0 ? (
        <AdminEmpty message="No batches yet." />
      ) : (
        <AdminTable headers={["Batch", "Course", "Status", "Seats", ""]}>
          {batches.map((b) => (
            <tr key={b.id}>
              <td className="px-4 py-3">
                <div className="font-medium">{b.name}</div>
                <div className="text-xs text-[#6B7280]">{b.daysLabel || b.mode}</div>
              </td>
              <td className="px-4 py-3 text-xs">{b.course.name}</td>
              <td className="px-4 py-3">
                <StatusPill value={b.status} />
              </td>
              <td className="px-4 py-3">
                {b._count.students}/{b.capacity}
              </td>
              <td className="px-4 py-3 text-right">
                <Link href={`/admin/batches/${b.id}`} className="text-xs font-semibold text-[#c4962a]">
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  )
}
