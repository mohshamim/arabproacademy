import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  CheckboxField,
  adminInputClass,
} from "@/components/admin/ui"
import { deleteFaq, upsertFaq } from "@/app/admin/(dashboard)/actions"

export default async function AdminFaqPage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="FAQ" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const items = await prisma.faqItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  })

  return (
    <div className="space-y-6">
      <AdminPageHeader title="FAQ" description="Shown on the public homepage." />
      <form
        action={upsertFaq}
        className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5"
      >
        <input
          name="question"
          required
          placeholder="Question"
          className={adminInputClass}
        />
        <textarea
          name="answer"
          required
          rows={3}
          placeholder="Answer"
          className={adminInputClass}
        />
        <input
          name="sortOrder"
          type="number"
          defaultValue={items.length}
          className={adminInputClass}
        />
        <CheckboxField label="Published" name="published" defaultChecked />
        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white"
        >
          Add
        </button>
      </form>
      {items.length === 0 ? (
        <AdminEmpty message="No FAQ items. Use Seed on Overview, or add one above." />
      ) : (
        <AdminTable headers={["Question", "Published", ""]}>
          {items.map((f) => (
            <tr key={f.id}>
              <td className="px-4 py-3">
                <form action={upsertFaq} className="space-y-2">
                  <input type="hidden" name="id" value={f.id} />
                  <input
                    name="question"
                    defaultValue={f.question}
                    className={adminInputClass}
                  />
                  <textarea
                    name="answer"
                    rows={3}
                    defaultValue={f.answer}
                    className={adminInputClass}
                  />
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={f.sortOrder}
                    className={adminInputClass}
                  />
                  <CheckboxField
                    label="Published"
                    name="published"
                    defaultChecked={f.published}
                  />
                  <button
                    type="submit"
                    className="cursor-pointer text-xs font-semibold text-blue-600"
                  >
                    Save
                  </button>
                </form>
              </td>
              <td className="px-4 py-3">{f.published ? "Yes" : "No"}</td>
              <td className="px-4 py-3 text-right">
                <form action={deleteFaq}>
                  <input type="hidden" name="id" value={f.id} />
                  <button
                    type="submit"
                    className="cursor-pointer text-xs font-semibold text-[#b91c1c]"
                  >
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
