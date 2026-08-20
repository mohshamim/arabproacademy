import { requireSuperAdmin } from "@/lib/admin-auth"
import { AdminPageHeader, adminInputClass } from "@/components/admin/ui"
import { getContactSettings, getStatsSettings } from "@/lib/site-settings"
import { saveContactSettings } from "@/app/admin/(dashboard)/actions"

export default async function SettingsPage() {
  await requireSuperAdmin()
  const [contact, stats] = await Promise.all([
    getContactSettings(),
    getStatsSettings(),
  ])

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Site settings"
        description="Phone, WhatsApp, email, and homepage stats."
      />
      <form
        action={saveContactSettings}
        className="space-y-4 rounded-2xl border border-[#e5e7eb] bg-white p-5"
      >
        <h2 className="text-sm font-semibold text-[#1F2937]">Contact</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="phoneDisplay" defaultValue={contact.phoneDisplay} placeholder="Display phone" className={adminInputClass} />
          <input name="phone" defaultValue={contact.phone} placeholder="+966574915561" className={adminInputClass} />
          <input name="whatsapp" defaultValue={contact.whatsapp} placeholder="966574915561" className={adminInputClass} />
          <input name="email" type="email" defaultValue={contact.email} className={adminInputClass} />
          <input name="location" defaultValue={contact.location} className={adminInputClass} />
          <input name="websiteUrl" defaultValue={contact.websiteUrl} placeholder="https://your-domain.com" className={adminInputClass} />
        </div>
        <h2 className="pt-2 text-sm font-semibold text-[#1F2937]">Hero stats</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="students" defaultValue={stats.students} placeholder="80+" className={adminInputClass} />
          <input name="successRate" defaultValue={stats.successRate} placeholder="98%" className={adminInputClass} />
          <input name="duration" defaultValue={stats.duration} placeholder="3 Months" className={adminInputClass} />
          <input name="locationLabel" defaultValue={stats.locationLabel} placeholder="Riyadh" className={adminInputClass} />
        </div>
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Save settings
        </button>
      </form>
    </div>
  )
}
