import Link from "next/link"
import { notFound } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import { AdminPageHeader, adminInputClass } from "@/components/admin/ui"
import { deleteBatch, upsertBatch } from "@/app/admin/(dashboard)/actions"

function ymd(d: Date | null) {
  if (!d) return ""
  return d.toISOString().slice(0, 10)
}

export default async function AdminBatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  const prisma = await prismaReady()
  const [batch, courses] = await Promise.all([
    prisma.batch.findUnique({
      where: { id },
      include: {
        course: true,
        students: { orderBy: { name: "asc" } },
      },
    }),
    prisma.course.findMany({ orderBy: { sortOrder: "asc" } }),
  ])
  if (!batch) notFound()

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={batch.name}
        description={`${batch.course.name} · ${batch.students.length}/${batch.capacity} students`}
      />

      <form action={upsertBatch} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <input type="hidden" name="id" value={batch.id} />
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" defaultValue={batch.name} className={adminInputClass} />
          <select name="courseId" defaultValue={batch.courseId} className={adminInputClass}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select name="mode" defaultValue={batch.mode} className={adminInputClass}>
            <option value="IN_PERSON">In person</option>
            <option value="ONLINE">Online</option>
            <option value="HYBRID">Hybrid</option>
          </select>
          <select name="status" defaultValue={batch.status} className={adminInputClass}>
            <option value="UPCOMING">Upcoming</option>
            <option value="RUNNING">Running</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <input name="startDate" type="date" defaultValue={ymd(batch.startDate)} className={adminInputClass} />
          <input name="endDate" type="date" defaultValue={ymd(batch.endDate)} className={adminInputClass} />
          <input name="daysLabel" defaultValue={batch.daysLabel} className={adminInputClass} />
          <input name="capacity" type="number" defaultValue={batch.capacity} className={adminInputClass} />
        </div>
        <textarea name="notes" rows={2} defaultValue={batch.notes || ""} className={adminInputClass} />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Save batch
        </button>
      </form>

      <div>
        <h2 className="mb-3 text-sm font-semibold">Students in this batch</h2>
        {batch.students.length === 0 ? (
          <p className="text-sm text-[#6B7280]">None yet. Enroll from Leads or add under Students.</p>
        ) : (
          <ul className="divide-y divide-[#f3f4f6] rounded-2xl border border-[#e5e7eb] bg-white">
            {batch.students.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>
                  {s.name}{" "}
                  <span className="text-xs text-[#6B7280]">{s.phone}</span>
                </span>
                <Link href={`/admin/students/${s.id}`} className="text-xs font-semibold text-blue-600">
                  Open
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form action={deleteBatch}>
        <input type="hidden" name="id" value={batch.id} />
        <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
          Delete batch (students are unassigned, not deleted)
        </button>
      </form>
    </div>
  )
}
