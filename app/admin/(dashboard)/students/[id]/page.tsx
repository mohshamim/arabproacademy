import Link from "next/link"
import { notFound } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminCard,
  AdminPageHeader,
  StatusPill,
  adminBtnClass,
  adminInputClass,
} from "@/components/admin/ui"
import { deleteStudent, upsertStudent } from "@/app/admin/(dashboard)/actions"
import {
  issueCertificate,
  saveHomework,
} from "@/app/admin/(dashboard)/lms-actions"

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
      include: { batch: { include: { course: true } }, lead: { select: { id: true, interest: true } } },
    }),
    prisma.batch.findMany({ orderBy: { createdAt: "desc" } }),
  ])
  if (!student) notFound()

  let attendance: { status: string }[] = []
  let homework: {
    id: string
    score: number | null
    voiceUrl: string | null
    notes: string | null
    createdAt: Date
    week: { weekNumber: number; title: string }
  }[] = []
  let examResults: {
    id: string
    passed: boolean
    pronunciation: number
    vocabulary: number
    fluency: number
    understanding: number
    exam: { title: string; kind: string }
  }[] = []
  let certificates: { id: string; code: string; courseName: string; issuedAt: Date }[] = []
  let weeks: { id: string; weekNumber: number; title: string }[] = []

  try {
    ;[attendance, homework, examResults, certificates] = await Promise.all([
      prisma.attendance.findMany({ where: { studentId: student.id } }),
      prisma.homeworkEntry.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: "desc" },
        include: { week: { select: { weekNumber: true, title: true } } },
      }),
      prisma.oralExamResult.findMany({
        where: { studentId: student.id },
        include: { exam: { select: { title: true, kind: true } } },
      }),
      prisma.certificate.findMany({
        where: { studentId: student.id },
        orderBy: { issuedAt: "desc" },
      }),
    ])
    if (student.batchId) {
      weeks = await prisma.courseWeek.findMany({
        where: { courseId: student.batch?.courseId },
        orderBy: { weekNumber: "asc" },
        select: { id: true, weekNumber: true, title: true },
      })
    }
  } catch {
    /* LMS tables not imported yet */
  }

  const present = attendance.filter((a) => a.status === "PRESENT").length
  const late = attendance.filter((a) => a.status === "LATE").length
  const absent = attendance.filter((a) => a.status === "ABSENT").length
  const digits = student.phone.replace(/\D/g, "")
  const wa = digits ? `https://wa.me/${digits}` : null

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={student.name}
        description={student.batch ? student.batch.name : "Not in a batch"}
        actions={<StatusPill value={student.status} />}
      />

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-[#e8eaef] bg-white p-4">
          <p className="text-[10px] font-semibold tracking-widest text-[#9CA3AF] uppercase">Present</p>
          <p className="mt-1 text-2xl font-semibold text-[#2d7d67]">{present}</p>
        </div>
        <div className="rounded-2xl border border-[#e8eaef] bg-white p-4">
          <p className="text-[10px] font-semibold tracking-widest text-[#9CA3AF] uppercase">Late</p>
          <p className="mt-1 text-2xl font-semibold text-[#c4962a]">{late}</p>
        </div>
        <div className="rounded-2xl border border-[#e8eaef] bg-white p-4">
          <p className="text-[10px] font-semibold tracking-widest text-[#9CA3AF] uppercase">Absent</p>
          <p className="mt-1 text-2xl font-semibold text-[#b91c1c]">{absent}</p>
        </div>
        <div className="rounded-2xl border border-[#e8eaef] bg-white p-4">
          <p className="text-[10px] font-semibold tracking-widest text-[#9CA3AF] uppercase">Certificates</p>
          <p className="mt-1 text-2xl font-semibold text-[#0d1b2a]">{certificates.length}</p>
        </div>
      </div>

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

      {absent >= 2 ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          Make-up needed — {absent} absences. Offer a recording or extra session.
        </p>
      ) : null}

      <AdminCard title="Profile">
        <form action={upsertStudent} className="space-y-3">
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
          <button type="submit" className={adminBtnClass}>
            Save student
          </button>
        </form>
      </AdminCard>

      {weeks.length > 0 ? (
        <AdminCard title="Voice-note homework">
          <form action={saveHomework} className="grid gap-3 sm:grid-cols-2">
            <input type="hidden" name="studentId" value={student.id} />
            <select name="weekId" required className={adminInputClass}>
              {weeks.map((w) => (
                <option key={w.id} value={w.id}>
                  Week {w.weekNumber} · {w.title}
                </option>
              ))}
            </select>
            <input name="score" type="number" min={1} max={5} placeholder="Score 1–5" className={adminInputClass} />
            <input name="voiceUrl" placeholder="WhatsApp voice / Drive URL" className={`${adminInputClass} sm:col-span-2`} />
            <textarea name="notes" rows={2} placeholder="Teacher note" className={`${adminInputClass} sm:col-span-2`} />
            <button type="submit" className={adminBtnClass}>
              Log homework
            </button>
          </form>
          {homework.length > 0 ? (
            <ul className="mt-4 divide-y divide-[#f3f4f6] text-sm">
              {homework.map((h) => (
                <li key={h.id} className="flex justify-between py-2">
                  <span>
                    Week {h.week.weekNumber} · {h.week.title}
                    {h.voiceUrl ? (
                      <a href={h.voiceUrl} className="ml-2 text-xs text-[#c4962a]" target="_blank" rel="noreferrer">
                        audio
                      </a>
                    ) : null}
                  </span>
                  <span className="text-xs text-[#6B7280]">{h.score ? `${h.score}/5` : "—"}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </AdminCard>
      ) : null}

      {examResults.length > 0 ? (
        <AdminCard title="Oral exams">
          <ul className="space-y-2 text-sm">
            {examResults.map((r) => (
              <li key={r.id} className="flex items-center justify-between">
                <span>
                  {r.exam.title} ({r.exam.kind})
                </span>
                <span>
                  {((r.pronunciation + r.vocabulary + r.fluency + r.understanding) / 4).toFixed(1)}
                  {" · "}
                  {r.passed ? "Pass" : "Needs extra speaking time"}
                </span>
              </li>
            ))}
          </ul>
        </AdminCard>
      ) : null}

      <AdminCard title="Certificate">
        {certificates.map((c) => (
          <p key={c.id} className="mb-2 text-sm">
            <Link href={`/verify/${c.code}`} className="font-mono font-semibold text-[#c4962a]">
              {c.code}
            </Link>{" "}
            · {c.courseName}
          </p>
        ))}
        <form action={issueCertificate} className="mt-3 flex flex-wrap gap-2">
          <input type="hidden" name="studentId" value={student.id} />
          <input
            name="courseName"
            defaultValue={student.batch?.course.name || "Spoken Arabic"}
            className={`${adminInputClass} max-w-xs`}
          />
          <button type="submit" className={adminBtnClass}>
            Issue certificate
          </button>
        </form>
      </AdminCard>

      {student.lead ? (
        <p className="text-xs text-[#6B7280]">
          From lead{" "}
          <Link href={`/admin/leads/${student.lead.id}`} className="text-[#c4962a]">
            ({student.lead.interest || "enquiry"})
          </Link>
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
