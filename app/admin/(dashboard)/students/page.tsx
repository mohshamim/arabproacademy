import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  adminInputClass,
} from "@/components/admin/ui"
import { upsertStudent } from "@/app/admin/(dashboard)/actions"

export default async function AdminStudentsPage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Students" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const [students, batches] = await Promise.all([
    prisma.student.findMany({
      orderBy: { createdAt: "desc" },
      include: { batch: { select: { name: true } } },
    }),
    prisma.batch.findMany({
      where: { status: { in: ["UPCOMING", "RUNNING"] } },
      orderBy: { startDate: "asc" },
    }),
  ])

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Students"
        description="Enrolled learners. Create here or convert a lead from the lead page."
      />

      <form action={upsertStudent} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <h2 className="text-sm font-semibold">Add student</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Full name" className={adminInputClass} />
          <input name="phone" required placeholder="Phone / WhatsApp" className={adminInputClass} />
          <input name="email" type="email" placeholder="Email (optional)" className={adminInputClass} />
          <input name="level" placeholder="Beginner / Intermediate" className={adminInputClass} />
          <select name="status" defaultValue="ACTIVE" className={adminInputClass}>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="COMPLETED">Completed</option>
            <option value="DROPPED">Dropped</option>
          </select>
          <select name="batchId" className={adminInputClass}>
            <option value="">No batch yet</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <input name="paymentNote" placeholder="Paid / 899 SAR monthly" className={adminInputClass} />
        </div>
        <textarea name="notes" rows={2} placeholder="Notes" className={adminInputClass} />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Save student
        </button>
      </form>

      {students.length === 0 ? (
        <AdminEmpty message="No students yet. Enroll a lead or add one above." />
      ) : (
        <AdminTable headers={["Name", "Phone", "Batch", "Status", ""]}>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="px-4 py-3 font-medium">{s.name}</td>
              <td className="px-4 py-3 text-xs">{s.phone}</td>
              <td className="px-4 py-3 text-xs">{s.batch?.name || "—"}</td>
              <td className="px-4 py-3 text-xs">{s.status}</td>
              <td className="px-4 py-3 text-right">
                <Link href={`/admin/students/${s.id}`} className="text-xs font-semibold text-blue-600">
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
