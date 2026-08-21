import { notFound } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminCard,
  AdminEmpty,
  AdminPageHeader,
  adminBtnClass,
  adminInputClass,
} from "@/components/admin/ui"
import {
  deleteOralExam,
  saveOralExamResult,
} from "@/app/admin/(dashboard)/lms-actions"

export default async function AdminExamScorePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  const prisma = await prismaReady()
  const exam = await prisma.oralExam.findUnique({
    where: { id },
    include: {
      batch: {
        include: {
          students: {
            where: { status: { in: ["ACTIVE", "COMPLETED", "PAUSED"] } },
            orderBy: { name: "asc" },
          },
        },
      },
      results: true,
    },
  })
  if (!exam) notFound()

  const byStudent = new Map(exam.results.map((r) => [r.studentId, r]))

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={exam.title}
        description={`${exam.kind} · ${exam.batch.name}. 1 = struggling, 5 = confident. Pass (free-extension) if average ≥ 3.`}
        action={{ href: "/admin/exams", label: "All exams" }}
      />

      {exam.batch.students.length === 0 ? (
        <AdminEmpty message="No students in this batch." />
      ) : (
        exam.batch.students.map((s) => {
          const r = byStudent.get(s.id)
          return (
            <AdminCard key={s.id} title={s.name}>
              <form action={saveOralExamResult} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <input type="hidden" name="examId" value={exam.id} />
                <input type="hidden" name="studentId" value={s.id} />
                <label className="text-xs text-[#6B7280]">
                  Pronunciation
                  <input
                    name="pronunciation"
                    type="number"
                    min={1}
                    max={5}
                    defaultValue={r?.pronunciation ?? 3}
                    className={`${adminInputClass} mt-1`}
                  />
                </label>
                <label className="text-xs text-[#6B7280]">
                  Vocabulary
                  <input
                    name="vocabulary"
                    type="number"
                    min={1}
                    max={5}
                    defaultValue={r?.vocabulary ?? 3}
                    className={`${adminInputClass} mt-1`}
                  />
                </label>
                <label className="text-xs text-[#6B7280]">
                  Fluency
                  <input
                    name="fluency"
                    type="number"
                    min={1}
                    max={5}
                    defaultValue={r?.fluency ?? 3}
                    className={`${adminInputClass} mt-1`}
                  />
                </label>
                <label className="text-xs text-[#6B7280]">
                  Understanding
                  <input
                    name="understanding"
                    type="number"
                    min={1}
                    max={5}
                    defaultValue={r?.understanding ?? 3}
                    className={`${adminInputClass} mt-1`}
                  />
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue={r?.notes || ""}
                  placeholder="Teacher note"
                  className={`${adminInputClass} sm:col-span-3`}
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="passed"
                    defaultChecked={r?.passed ?? true}
                    className="h-4 w-4 rounded"
                  />
                  Passed
                </label>
                <div className="sm:col-span-4">
                  <button type="submit" className={adminBtnClass}>
                    Save {s.name.split(" ")[0]}
                  </button>
                  {r ? (
                    <span className="ml-3 text-xs text-[#6B7280]">
                      Avg{" "}
                      {(
                        (r.pronunciation + r.vocabulary + r.fluency + r.understanding) /
                        4
                      ).toFixed(1)}
                    </span>
                  ) : null}
                </div>
              </form>
            </AdminCard>
          )
        })
      )}

      <form action={deleteOralExam}>
        <input type="hidden" name="id" value={exam.id} />
        <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
          Delete exam
        </button>
      </form>
    </div>
  )
}
