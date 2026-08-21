import { notFound } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminCard,
  AdminEmpty,
  AdminPageHeader,
  adminBtnClass,
} from "@/components/admin/ui"
import {
  deleteClassSession,
  saveAttendance,
} from "@/app/admin/(dashboard)/lms-actions"

export default async function AdminRollCallPage({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  await requireAdmin()
  const { sessionId } = await params
  const prisma = await prismaReady()
  const session = await prisma.classSession.findUnique({
    where: { id: sessionId },
    include: {
      batch: {
        include: {
          students: {
            where: { status: { in: ["ACTIVE", "PAUSED"] } },
            orderBy: { name: "asc" },
          },
        },
      },
      attendance: true,
    },
  })
  if (!session) notFound()

  const byStudent = new Map(session.attendance.map((a) => [a.studentId, a.status]))

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={session.title}
        description={`${session.batch.name} · ${session.heldOn.toISOString().slice(0, 10)}`}
        action={{ href: "/admin/attendance", label: "All sessions" }}
      />

      {session.batch.students.length === 0 ? (
        <AdminEmpty message="This batch has no students to mark." />
      ) : (
        <AdminCard>
          <form action={saveAttendance} className="space-y-1">
            <input type="hidden" name="sessionId" value={session.id} />
            {session.batch.students.map((s) => {
              const current = byStudent.get(s.id) || "PRESENT"
              return (
                <div
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3f4f6] py-3 last:border-0"
                >
                  <input type="hidden" name="studentId" value={s.id} />
                  <div>
                    <p className="text-sm font-medium text-[#0d1b2a]">{s.name}</p>
                    <p className="text-xs text-[#6B7280]">{s.phone}</p>
                  </div>
                  <div className="flex gap-1 rounded-xl bg-[#f4f0e8] p-1 text-xs font-semibold">
                    {(["PRESENT", "LATE", "ABSENT"] as const).map((st) => (
                      <label
                        key={st}
                        className="cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`status_${s.id}`}
                          value={st}
                          defaultChecked={current === st}
                          className="peer sr-only"
                        />
                        <span
                          className={`inline-flex rounded-lg px-3 py-1.5 peer-checked:text-white ${
                            st === "PRESENT"
                              ? "peer-checked:bg-[#2d7d67]"
                              : st === "LATE"
                                ? "peer-checked:bg-[#c4962a]"
                                : "peer-checked:bg-[#b91c1c]"
                          }`}
                        >
                          {st === "PRESENT" ? "Present" : st === "LATE" ? "Late" : "Absent"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
            <button type="submit" className={`${adminBtnClass} mt-4`}>
              Save attendance
            </button>
          </form>
        </AdminCard>
      )}

      <form action={deleteClassSession}>
        <input type="hidden" name="id" value={session.id} />
        <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
          Delete this session
        </button>
      </form>
    </div>
  )
}
