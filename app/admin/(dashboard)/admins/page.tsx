import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { requireSuperAdmin } from "@/lib/admin-auth"
import {
  AdminEmpty,
  AdminPageHeader,
  AdminTable,
  CheckboxField,
  adminInputClass,
} from "@/components/admin/ui"
import {
  deleteAdminUser,
  upsertAdminUser,
} from "@/app/admin/(dashboard)/actions"

export default async function AdminUsersPage() {
  await requireSuperAdmin()
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Admins" />
        <AdminEmpty message="MySQL is not configured." />
      </div>
    )
  }

  const prisma = await prismaReady()
  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "asc" },
  })

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Admins"
        description="SUPER_ADMIN can create editors."
      />
      <form action={upsertAdminUser} className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Full name" className={adminInputClass} />
          <input name="email" type="email" required placeholder="Email" className={adminInputClass} />
          <select name="role" defaultValue="EDITOR" className={adminInputClass}>
            <option value="EDITOR">EDITOR</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
          <input name="password" type="password" required placeholder="Password" className={adminInputClass} />
        </div>
        <CheckboxField label="Active" name="active" defaultChecked />
        <button type="submit" className="cursor-pointer rounded-xl bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-white">
          Create admin
        </button>
      </form>
      {users.length === 0 ? (
        <AdminEmpty message="No admin users. Run npm run db:seed." />
      ) : (
        <AdminTable headers={["Name", "Email", "Role", "Active", "Last login", ""]}>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="px-4 py-3 font-medium">{u.name}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3 text-xs font-semibold">{u.role}</td>
              <td className="px-4 py-3">{u.active ? "Yes" : "No"}</td>
              <td className="px-4 py-3 text-xs text-[#6B7280]">
                {u.lastLoginAt ? u.lastLoginAt.toLocaleString("en-GB") : "Never"}
              </td>
              <td className="px-4 py-3 text-right">
                <form action={deleteAdminUser}>
                  <input type="hidden" name="id" value={u.id} />
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
