import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  CheckboxField,
  adminInputClass,
} from "@/components/admin/ui"
import { upsertCourse } from "@/app/admin/(dashboard)/actions"

export default async function AdminCoursesPage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Courses" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const courses = await prisma.course.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { weeks: true, batches: true } } },
  })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Courses"
        description="Spoken tracks the teacher actually teaches. Click a course to edit the week-by-week syllabus."
      />
      <form
        action={upsertCourse}
        className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5"
      >
        <h2 className="text-sm font-semibold">Add course</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="slug" required placeholder="slug (spoken-3-month)" className={adminInputClass} />
          <input name="name" required placeholder="Course name" className={adminInputClass} />
          <select name="kind" defaultValue="IN_PERSON" className={adminInputClass}>
            <option value="IN_PERSON">In person</option>
            <option value="ONLINE">Online</option>
          </select>
          <input name="durationLabel" required placeholder="3 months · 12 weeks" className={adminInputClass} />
          <input name="sortOrder" type="number" defaultValue={courses.length} className={adminInputClass} />
        </div>
        <textarea name="description" required rows={2} placeholder="Short description" className={adminInputClass} />
        <CheckboxField label="Published" name="published" defaultChecked />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Create course
        </button>
      </form>

      {courses.length === 0 ? (
        <AdminEmpty message="No courses yet. Import hostinger-courses-upgrade.sql, then click Seed on Overview." />
      ) : (
        <AdminTable headers={["Course", "Kind", "Weeks", "Batches", ""]}>
          {courses.map((c) => (
            <tr key={c.id}>
              <td className="px-4 py-3">
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-[#6B7280]">{c.durationLabel}</div>
              </td>
              <td className="px-4 py-3 text-xs">{c.kind}</td>
              <td className="px-4 py-3">{c._count.weeks}</td>
              <td className="px-4 py-3">{c._count.batches}</td>
              <td className="px-4 py-3 text-right">
                <Link href={`/admin/courses/${c.id}`} className="text-xs font-semibold text-blue-600">
                  Syllabus
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  )
}
