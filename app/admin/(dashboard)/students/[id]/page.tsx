import { notFound } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import { AdminPageHeader, adminInputClass } from "@/components/admin/ui"
import { deleteStudent, upsertStudent } from "@/app/admin/(dashboard)/actions"

export default async function AdminStudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  const prisma = await prismaReady()
  const [student, batches] = await Promise.all([
    prisma.student.findUnique({
      where: { id },
      include: { batch: true, lead: { select: { id: true, interest: true } } },
    }),
    prisma.batch.findMany({ orderBy: { createdAt: "desc" } }),
  ])
  if (!student) notFound()

  const digits = student.phone.replace(/\D/g, "")
  const wa = digits ? `https://wa.me/${digits}` : null

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={student.name}
        description={student.batch ? student.batch.name : "Not in a batch"}
      />

      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
        >
          WhatsApp student
        </a>
      ) : null}

      <form action={upsertStudent} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <input type="hidden" name="id" value={student.id} />
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" defaultValue={student.name} className={adminInputClass} />
          <input name="phone" defaultValue={student.phone} className={adminInputClass} />
          <input name="email" defaultValue={student.email || ""} className={adminInputClass} />
          <input name="level" defaultValue={student.level || ""} className={adminInputClass} />
          <select name="status" defaultValue={student.status} className={adminInputClass}>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="COMPLETED">Completed</option>
            <option value="DROPPED">Dropped</option>
          </select>
          <select name="batchId" defaultValue={student.batchId || ""} className={adminInputClass}>
            <option value="">No batch</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <input name="paymentNote" defaultValue={student.paymentNote || ""} className={adminInputClass} />
        </div>
        <textarea name="notes" rows={3} defaultValue={student.notes || ""} className={adminInputClass} />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Save student
        </button>
      </form>

      {student.lead ? (
        <p className="text-xs text-[#6B7280]">
          From lead ({student.lead.interest || "enquiry"})
        </p>
      ) : null}

      <form action={deleteStudent}>
        <input type="hidden" name="id" value={student.id} />
        <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
          Delete student
        </button>
      </form>
    </div>
  )
}
