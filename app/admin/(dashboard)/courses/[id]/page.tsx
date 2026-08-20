import { notFound } from "next/navigation"
import { prismaReady } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminPageHeader,
  CheckboxField,
  adminInputClass,
} from "@/components/admin/ui"
import {
  deleteCourse,
  deleteCourseWeek,
  upsertCourse,
  upsertCourseWeek,
} from "@/app/admin/(dashboard)/actions"

export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  const prisma = await prismaReady()
  const course = await prisma.course.findUnique({
    where: { id },
    include: { weeks: { orderBy: { weekNumber: "asc" } } },
  })
  if (!course) notFound()

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={course.name}
        description="Edit the course, then each week’s outcomes, vocab, class activity, homework, and material link."
      />

      <form action={upsertCourse} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <input type="hidden" name="id" value={course.id} />
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="slug" defaultValue={course.slug} className={adminInputClass} />
          <input name="name" defaultValue={course.name} className={adminInputClass} />
          <select name="kind" defaultValue={course.kind} className={adminInputClass}>
            <option value="IN_PERSON">In person</option>
            <option value="ONLINE">Online</option>
          </select>
          <input name="durationLabel" defaultValue={course.durationLabel} className={adminInputClass} />
          <input name="sortOrder" type="number" defaultValue={course.sortOrder} className={adminInputClass} />
        </div>
        <textarea name="description" rows={2} defaultValue={course.description} className={adminInputClass} />
        <CheckboxField label="Published" name="published" defaultChecked={course.published} />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Save course
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[#111827]">Add a week</h2>
        <form action={upsertCourseWeek} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
          <input type="hidden" name="courseId" value={course.id} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="weekNumber"
              type="number"
              required
              defaultValue={course.weeks.length + 1}
              className={adminInputClass}
            />
            <input name="title" required placeholder="Week title" className={adminInputClass} />
          </div>
          <textarea name="outcomes" required rows={2} placeholder="Speaking outcomes" className={adminInputClass} />
          <textarea name="vocabulary" required rows={3} placeholder="One vocab item per line" className={adminInputClass} />
          <textarea name="activity" required rows={2} placeholder="In-class activity / role-play" className={adminInputClass} />
          <textarea name="homework" required rows={2} placeholder="Homework (usually a voice note)" className={adminInputClass} />
          <input name="materialUrl" placeholder="PDF / Drive / audio URL (optional)" className={adminInputClass} />
          <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
            Add week
          </button>
        </form>
      </div>

      {course.weeks.map((w) => (
        <form
          key={w.id}
          action={upsertCourseWeek}
          className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5"
        >
          <input type="hidden" name="id" value={w.id} />
          <input type="hidden" name="courseId" value={course.id} />
          <p className="text-xs font-semibold tracking-wide text-[#c4962a] uppercase">
            Week {w.weekNumber}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="weekNumber" type="number" defaultValue={w.weekNumber} className={adminInputClass} />
            <input name="title" defaultValue={w.title} className={adminInputClass} />
          </div>
          <textarea name="outcomes" rows={2} defaultValue={w.outcomes} className={adminInputClass} />
          <textarea name="vocabulary" rows={4} defaultValue={w.vocabulary} className={adminInputClass} />
          <textarea name="activity" rows={2} defaultValue={w.activity} className={adminInputClass} />
          <textarea name="homework" rows={2} defaultValue={w.homework} className={adminInputClass} />
          <input name="materialUrl" defaultValue={w.materialUrl || ""} className={adminInputClass} />
          <div className="flex justify-between">
            <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
              Save week
            </button>
          </div>
        </form>
      ))}

      {course.weeks.map((w) => (
        <form key={`del-w-${w.id}`} action={deleteCourseWeek} className="text-right">
          <input type="hidden" name="id" value={w.id} />
          <input type="hidden" name="courseId" value={course.id} />
          <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
            Delete week {w.weekNumber}
          </button>
        </form>
      ))}

      <form action={deleteCourse}>
        <input type="hidden" name="id" value={course.id} />
        <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
          Delete this course
        </button>
      </form>
    </div>
  )
}
