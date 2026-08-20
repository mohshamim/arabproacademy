import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  CheckboxField,
  adminInputClass,
} from "@/components/admin/ui"
import {
  deleteTestimonial,
  upsertTestimonial,
} from "@/app/admin/(dashboard)/actions"

export default async function AdminTestimonialsPage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Testimonials" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const items = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  })

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Testimonials" />
      <form
        action={upsertTestimonial}
        className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Name" className={adminInputClass} />
          <input name="role" required placeholder="Role / city" className={adminInputClass} />
          <input name="initial" placeholder="Initial" className={adminInputClass} />
          <input name="sortOrder" type="number" defaultValue={items.length} className={adminInputClass} />
        </div>
        <textarea name="text" required rows={3} placeholder="Quote" className={adminInputClass} />
        <CheckboxField label="Published" name="published" defaultChecked />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Add
        </button>
      </form>
      {items.length === 0 ? (
        <AdminEmpty message="No testimonials yet." />
      ) : (
        <AdminTable headers={["Student", "Published", ""]}>
          {items.map((t) => (
            <tr key={t.id}>
              <td className="px-4 py-3">
                <form action={upsertTestimonial} className="space-y-2">
                  <input type="hidden" name="id" value={t.id} />
                  <input name="name" defaultValue={t.name} className={adminInputClass} />
                  <input name="role" defaultValue={t.role} className={adminInputClass} />
                  <input name="initial" defaultValue={t.initial} className={adminInputClass} />
                  <textarea name="text" rows={3} defaultValue={t.text} className={adminInputClass} />
                  <input name="sortOrder" type="number" defaultValue={t.sortOrder} className={adminInputClass} />
                  <CheckboxField label="Published" name="published" defaultChecked={t.published} />
                  <button type="submit" className="cursor-pointer text-xs font-semibold text-blue-600">
                    Save
                  </button>
                </form>
              </td>
              <td className="px-4 py-3">{t.published ? "Yes" : "No"}</td>
              <td className="px-4 py-3 text-right">
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  )
}
