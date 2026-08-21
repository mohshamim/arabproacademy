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
import { createOralExam } from "@/app/admin/(dashboard)/lms-actions"

export default async function AdminExamsPage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Oral exams" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  try {
    const [exams, batches] = await Promise.all([
      prisma.oralExam.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          batch: { select: { name: true } },
          _count: { select: { results: true } },
        },
      }),
      prisma.batch.findMany({
        where: { status: { in: ["RUNNING", "UPCOMING", "COMPLETED"] } },
        orderBy: { startDate: "desc" },
      }),
    ])

    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="Oral exams"
          description="Mid and final fluency checks. Rubric: pronunciation, vocab, fluency, understanding (1–5). Pass if average is 3+."
        />

        {batches.length === 0 ? (
          <AdminEmpty message="Create a batch before scheduling an oral exam." />
        ) : (
          <AdminCard title="Schedule exam">
            <form action={createOralExam} className="grid gap-3 sm:grid-cols-2">
              <select name="batchId" required className={adminInputClass}>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <select name="kind" defaultValue="MID" className={adminInputClass}>
                <option value="MID">Mid</option>
                <option value="FINAL">Final</option>
              </select>
              <input name="title" required placeholder="Week 6 mid oral" className={adminInputClass} />
              <input name="heldOn" type="date" className={adminInputClass} />
              <div className="sm:col-span-2">
                <button type="submit" className={adminBtnClass}>
                  Open scoring sheet
                </button>
              </div>
            </form>
          </AdminCard>
        )}

        {exams.length === 0 ? (
          <AdminEmpty message="No oral exams yet." />
        ) : (
          <AdminTable headers={["Exam", "Kind", "Batch", "Scored", ""]}>
            {exams.map((e) => (
              <tr key={e.id} className="hover:bg-[#fdf8ee]/60">
                <td className="px-4 py-3 font-medium">{e.title}</td>
                <td className="px-4 py-3">
                  <StatusPill value={e.kind} />
                </td>
                <td className="px-4 py-3 text-xs">{e.batch.name}</td>
                <td className="px-4 py-3">{e._count.results}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/exams/${e.id}`} className="text-xs font-semibold text-[#c4962a]">
                    Score
                  </Link>
                </td>
              </tr>
            ))}
          </AdminTable>
        )}
      </div>
    )
  } catch {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Oral exams" />
        <AdminEmpty
          message="Exam tables are not in MySQL yet."
          hint="Import prisma/hostinger-lms-upgrade.sql in phpMyAdmin."
        />
      </div>
    )
  }
}
