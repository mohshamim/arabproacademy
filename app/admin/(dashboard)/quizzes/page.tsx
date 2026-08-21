import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminCard,
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  CheckboxField,
  StatusPill,
  adminBtnClass,
  adminInputClass,
} from "@/components/admin/ui"
import { upsertQuiz } from "@/app/admin/(dashboard)/lms-actions"

export default async function AdminQuizzesPage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Quizzes" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  let quizzes: {
    id: string
    title: string
    slug: string
    kind: string
    course: { name: string } | null
    _count: { questions: number; attempts: number }
  }[] = []
  let courses: { id: string; name: string }[] = []
  try {
    ;[quizzes, courses] = await Promise.all([
      prisma.quiz.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { questions: true, attempts: true } },
          course: { select: { name: true } },
        },
      }),
      prisma.course.findMany({ orderBy: { sortOrder: "asc" } }),
    ])
  } catch {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Quizzes" />
        <AdminEmpty
          message="Quiz tables are not in MySQL yet."
          hint="Import prisma/hostinger-lms-upgrade.sql, then Seed on Overview for the placement quiz."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quizzes"
        description="Placement (public) plus weekly vocab / listening checks. Speaking is scored on the Oral exams page."
      />

      <AdminCard title="New quiz">
        <form action={upsertQuiz} className="grid gap-3 sm:grid-cols-2">
          <input name="slug" required placeholder="slug (week-3-vocab)" className={adminInputClass} />
          <input name="title" required placeholder="Title" className={adminInputClass} />
          <select name="kind" defaultValue="WEEKLY" className={adminInputClass}>
            <option value="PLACEMENT">Placement</option>
            <option value="WEEKLY">Weekly</option>
            <option value="LISTENING">Listening</option>
          </select>
          <select name="courseId" className={adminInputClass}>
            <option value="">No course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <CheckboxField label="Published" name="published" defaultChecked />
          <div className="sm:col-span-2">
            <button type="submit" className={adminBtnClass}>
              Create quiz
            </button>
          </div>
        </form>
      </AdminCard>

      {quizzes.length === 0 ? (
        <AdminEmpty message="No quizzes. Seed content to load the public placement quiz." />
      ) : (
        <AdminTable headers={["Quiz", "Kind", "Questions", "Attempts", ""]}>
          {quizzes.map((q) => (
            <tr key={q.id} className="hover:bg-[#fdf8ee]/60">
              <td className="px-4 py-3">
                <div className="font-medium">{q.title}</div>
                <div className="text-xs text-[#6B7280]">{q.course?.name || q.slug}</div>
              </td>
              <td className="px-4 py-3">
                <StatusPill value={q.kind} />
              </td>
              <td className="px-4 py-3">{q._count.questions}</td>
              <td className="px-4 py-3">{q._count.attempts}</td>
              <td className="px-4 py-3 text-right">
                <Link href={`/admin/quizzes/${q.id}`} className="text-xs font-semibold text-[#c4962a]">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  )
}
