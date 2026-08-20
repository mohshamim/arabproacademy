import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-auth"
import {
  AdminEmpty,
  AdminPageHeader,
  CheckboxField,
  adminInputClass,
} from "@/components/admin/ui"
import { deletePricing, upsertPricing } from "@/app/admin/(dashboard)/actions"

function featuresText(value: unknown) {
  if (Array.isArray(value)) return value.map(String).join("\n")
  return ""
}

export default async function AdminPricingPage() {
  await requireAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Pricing" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const items = await prisma.pricingPackage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Pricing"
        description="In-person packages. One feature per line."
      />
      <form action={upsertPricing} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="slug" required placeholder="slug (monthly)" className={adminInputClass} />
          <input name="name" required placeholder="Name" className={adminInputClass} />
          <input name="price" required placeholder="1899" className={adminInputClass} />
          <input name="period" required placeholder="SAR / 3 months" className={adminInputClass} />
          <input name="cta" required placeholder="Enroll" className={adminInputClass} />
          <input name="sortOrder" type="number" defaultValue={items.length} className={adminInputClass} />
        </div>
        <input name="description" required placeholder="Short description" className={adminInputClass} />
        <textarea name="features" required rows={5} placeholder={"One feature per line"} className={adminInputClass} />
        <textarea name="whatsappMessage" required rows={2} placeholder="WhatsApp enroll message" className={adminInputClass} />
        <CheckboxField label="Most popular" name="popular" />
        <CheckboxField label="Published" name="published" defaultChecked />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Add package
        </button>
      </form>

      {items.length === 0 ? (
        <AdminEmpty message="No packages. Seed from Overview or add one above." />
      ) : (
        items.map((p) => (
          <form
            key={p.id}
            action={upsertPricing}
            className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5"
          >
            <input type="hidden" name="id" value={p.id} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="slug" defaultValue={p.slug} className={adminInputClass} />
              <input name="name" defaultValue={p.name} className={adminInputClass} />
              <input name="price" defaultValue={p.price} className={adminInputClass} />
              <input name="period" defaultValue={p.period} className={adminInputClass} />
              <input name="cta" defaultValue={p.cta} className={adminInputClass} />
              <input name="sortOrder" type="number" defaultValue={p.sortOrder} className={adminInputClass} />
            </div>
            <input name="description" defaultValue={p.description} className={adminInputClass} />
            <textarea name="features" rows={5} defaultValue={featuresText(p.features)} className={adminInputClass} />
            <textarea name="whatsappMessage" rows={2} defaultValue={p.whatsappMessage} className={adminInputClass} />
            <CheckboxField label="Most popular" name="popular" defaultChecked={p.popular} />
            <CheckboxField label="Published" name="published" defaultChecked={p.published} />
            <div className="flex gap-3">
              <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
                Save
              </button>
            </div>
          </form>
        ))
      )}

      {items.map((p) => (
        <form key={`del-${p.id}`} action={deletePricing} className="text-right">
          <input type="hidden" name="id" value={p.id} />
          <button type="submit" className="cursor-pointer text-xs font-semibold text-[#b91c1c]">
            Delete {p.name}
          </button>
        </form>
      ))}
    </div>
  )
}
