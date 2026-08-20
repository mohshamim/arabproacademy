import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminEmpty,
  AdminPageHeader,
  CheckboxField,
  adminInputClass,
} from "@/components/admin/ui"
import {
  deleteOnlineLevel,
  upsertOnlineLevel,
} from "@/app/admin/(dashboard)/actions"

function featuresText(value: unknown) {
  if (Array.isArray(value)) return value.map(String).join("\n")
  return ""
}

export default async function AdminOnlinePage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Online levels" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const items = await prisma.onlineLevel.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Online levels"
        description="Beginner / intermediate tracks. One feature per line."
      />
      <form action={upsertOnlineLevel} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="slug" required placeholder="beginner" className={adminInputClass} />
          <input name="level" required placeholder="LEVEL 1" className={adminInputClass} />
          <input name="name" required placeholder="BEGINNER" className={adminInputClass} />
          <select name="badgeColor" defaultValue="teal" className={adminInputClass}>
            <option value="teal">teal</option>
            <option value="gold">gold</option>
          </select>
          <input name="monthlyPrice" required placeholder="650" className={adminInputClass} />
          <input name="fullPrice" required placeholder="1,299" className={adminInputClass} />
          <input name="sortOrder" type="number" defaultValue={items.length} className={adminInputClass} />
        </div>
        <textarea name="features" required rows={4} className={adminInputClass} />
        <textarea name="whatsappMessage" required rows={2} className={adminInputClass} />
        <CheckboxField label="Published" name="published" defaultChecked />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Add level
        </button>
      </form>

      {items.length === 0 ? (
        <AdminEmpty message="No online levels yet." />
      ) : (
        items.map((t) => (
          <form
            key={t.id}
            action={upsertOnlineLevel}
            className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5"
          >
            <input type="hidden" name="id" value={t.id} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="slug" defaultValue={t.slug} className={adminInputClass} />
              <input name="level" defaultValue={t.level} className={adminInputClass} />
              <input name="name" defaultValue={t.name} className={adminInputClass} />
              <select name="badgeColor" defaultValue={t.badgeColor} className={adminInputClass}>
                <option value="teal">teal</option>
                <option value="gold">gold</option>
              </select>
              <input name="monthlyPrice" defaultValue={t.monthlyPrice} className={adminInputClass} />
              <input name="fullPrice" defaultValue={t.fullPrice} className={adminInputClass} />
              <input name="sortOrder" type="number" defaultValue={t.sortOrder} className={adminInputClass} />
            </div>
            <textarea name="features" rows={4} defaultValue={featuresText(t.features)} className={adminInputClass} />
            <textarea name="whatsappMessage" rows={2} defaultValue={t.whatsappMessage} className={adminInputClass} />
            <CheckboxField label="Published" name="published" defaultChecked={t.published} />
            <div className="flex justify-between">
              <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
                Save
              </button>
            </div>
          </form>
        ))
      )}
      {items.map((t) => (
        <form key={`del-${t.id}`} action={deleteOnlineLevel} className="text-right">
          <input type="hidden" name="id" value={t.id} />
          <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
            Delete {t.name}
          </button>
        </form>
      ))}
    </div>
  )
}
