import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminCard,
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  adminBtnClass,
  adminInputClass,
} from "@/components/admin/ui"
import { issueCertificate } from "@/app/admin/(dashboard)/lms-actions"

export default async function AdminCertificatesPage({
  searchParams,
}: {
  searchParams?: Promise<{ issued?: string }>
}) {
  await requireAdmin()
  const sp = (await searchParams) || {}

  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Certificates" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  try {
    const [certs, students] = await Promise.all([
      prisma.certificate.findMany({
        orderBy: { issuedAt: "desc" },
        include: { student: { select: { name: true, phone: true } } },
      }),
      prisma.student.findMany({
        where: { status: { in: ["ACTIVE", "COMPLETED"] } },
        orderBy: { name: "asc" },
        include: { batch: { include: { course: { select: { name: true } } } } },
      }),
    ])

    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="Certificates"
          description="Issue a completion certificate. Students (and employers) can verify at /verify/CODE."
        />

        {sp.issued ? (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Issued{" "}
            <Link href={`/verify/${sp.issued}`} className="font-semibold underline">
              {sp.issued}
            </Link>
            . Share that link or print the page.
          </p>
        ) : null}

        <AdminCard title="Issue certificate">
          <form action={issueCertificate} className="grid gap-3 sm:grid-cols-2">
            <select name="studentId" required className={adminInputClass}>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                  {s.batch ? ` · ${s.batch.course.name}` : ""}
                </option>
              ))}
            </select>
            <input
              name="courseName"
              placeholder="Course name on certificate (optional)"
              className={adminInputClass}
            />
            <div className="sm:col-span-2">
              <button type="submit" className={adminBtnClass} disabled={students.length === 0}>
                Issue
              </button>
            </div>
          </form>
        </AdminCard>

        {certs.length === 0 ? (
          <AdminEmpty message="No certificates issued yet." />
        ) : (
          <AdminTable headers={["Code", "Student", "Course", "Issued", ""]}>
            {certs.map((c) => (
              <tr key={c.id} className="hover:bg-[#fdf8ee]/60">
                <td className="px-4 py-3 font-mono text-xs font-semibold">{c.code}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/students/${c.studentId}`} className="font-medium hover:text-[#c4962a]">
                    {c.student.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-xs">{c.courseName}</td>
                <td className="px-4 py-3 text-xs text-[#6B7280]">
                  {c.issuedAt.toISOString().slice(0, 10)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/verify/${c.code}`} className="text-xs font-semibold text-[#c4962a]">
                    View
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
        <AdminPageHeader title="Certificates" />
        <AdminEmpty
          message="Certificate table is not in MySQL yet."
          hint="Import prisma/hostinger-lms-upgrade.sql in phpMyAdmin."
        />
      </div>
    )
  }
}
