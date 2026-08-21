import { notFound } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminCard,
  AdminPageHeader,
  AdminTable,
  CheckboxField,
  adminBtnClass,
  adminInputClass,
} from "@/components/admin/ui"
import {
  deleteQuiz,
  deleteQuizQuestion,
  upsertQuiz,
  upsertQuizQuestion,
} from "@/app/admin/(dashboard)/lms-actions"

export default async function AdminQuizDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  const prisma = await prismaReady()
  const [quiz, courses] = await Promise.all([
    prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: { orderBy: { sortOrder: "asc" } },
        attempts: { orderBy: { createdAt: "desc" }, take: 40 },
      },
    }),
    prisma.course.findMany({ orderBy: { sortOrder: "asc" } }),
  ])
  if (!quiz) notFound()

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={quiz.title}
        description={
          quiz.kind === "PLACEMENT"
            ? "Public at /placement — used to recommend beginner vs intermediate."
            : "Weekly check. Score speaking separately on Oral exams."
        }
      />

      <AdminCard title="Quiz settings">
        <form action={upsertQuiz} className="grid gap-3 sm:grid-cols-2">
          <input type="hidden" name="id" value={quiz.id} />
          <input name="slug" defaultValue={quiz.slug} className={adminInputClass} />
          <input name="title" defaultValue={quiz.title} className={adminInputClass} />
          <select name="kind" defaultValue={quiz.kind} className={adminInputClass}>
            <option value="PLACEMENT">Placement</option>
            <option value="WEEKLY">Weekly</option>
            <option value="LISTENING">Listening</option>
          </select>
          <select name="courseId" defaultValue={quiz.courseId || ""} className={adminInputClass}>
            <option value="">No course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <CheckboxField label="Published" name="published" defaultChecked={quiz.published} />
          <div>
            <button type="submit" className={adminBtnClass}>
              Save quiz
            </button>
          </div>
        </form>
      </AdminCard>

      <AdminCard title="Add question">
        <form action={upsertQuizQuestion} className="space-y-3">
          <input type="hidden" name="quizId" value={quiz.id} />
          <input
            name="sortOrder"
            type="number"
            defaultValue={quiz.questions.length}
            className={adminInputClass}
          />
          <textarea name="prompt" required rows={2} placeholder="Question" className={adminInputClass} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="choiceA" required placeholder="A" className={adminInputClass} />
            <input name="choiceB" required placeholder="B" className={adminInputClass} />
            <input name="choiceC" required placeholder="C" className={adminInputClass} />
            <input name="choiceD" required placeholder="D" className={adminInputClass} />
          </div>
          <select name="correct" defaultValue="A" className={adminInputClass}>
            <option value="A">Correct: A</option>
            <option value="B">Correct: B</option>
            <option value="C">Correct: C</option>
            <option value="D">Correct: D</option>
          </select>
          <button type="submit" className={adminBtnClass}>
            Add question
          </button>
        </form>
      </AdminCard>

      {quiz.questions.map((q) => (
        <AdminCard key={q.id} title={`Q${q.sortOrder + 1}`}>
          <form action={upsertQuizQuestion} className="space-y-3">
            <input type="hidden" name="id" value={q.id} />
            <input type="hidden" name="quizId" value={quiz.id} />
            <input name="sortOrder" type="number" defaultValue={q.sortOrder} className={adminInputClass} />
            <textarea name="prompt" rows={2} defaultValue={q.prompt} className={adminInputClass} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="choiceA" defaultValue={q.choiceA} className={adminInputClass} />
              <input name="choiceB" defaultValue={q.choiceB} className={adminInputClass} />
              <input name="choiceC" defaultValue={q.choiceC} className={adminInputClass} />
              <input name="choiceD" defaultValue={q.choiceD} className={adminInputClass} />
            </div>
            <select name="correct" defaultValue={q.correct} className={adminInputClass}>
              <option value="A">Correct: A</option>
              <option value="B">Correct: B</option>
              <option value="C">Correct: C</option>
              <option value="D">Correct: D</option>
            </select>
            <button type="submit" className={adminBtnClass}>
              Save question
            </button>
          </form>
          <form action={deleteQuizQuestion} className="mt-2">
            <input type="hidden" name="id" value={q.id} />
            <input type="hidden" name="quizId" value={quiz.id} />
            <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
              Delete question
            </button>
          </form>
        </AdminCard>
      ))}

      <AdminCard title="Recent attempts">
        {quiz.attempts.length === 0 ? (
          <p className="text-sm text-[#6B7280]">None yet.</p>
        ) : (
          <AdminTable headers={["Who", "Score", "When"]}>
            {quiz.attempts.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 text-sm">
                  {a.name || "Anonymous"}{" "}
                  <span className="text-xs text-[#6B7280]">{a.phone}</span>
                </td>
                <td className="px-4 py-3 font-medium">
                  {a.score}/{a.total}
                </td>
                <td className="px-4 py-3 text-xs text-[#6B7280]">
                  {a.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                </td>
              </tr>
            ))}
          </AdminTable>
        )}
      </AdminCard>

      <form action={deleteQuiz}>
        <input type="hidden" name="id" value={quiz.id} />
        <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
          Delete quiz
        </button>
      </form>
    </div>
  )
}
