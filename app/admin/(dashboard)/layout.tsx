import { signOut } from "@/auth"
import { requireAdmin } from "@/lib/admin-auth"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAdmin()

  async function signOutAction() {
    "use server"
    await signOut({ redirectTo: "/admin/login" })
  }

  return (
    <AdminShell
      role={session.user.role}
      email={session.user.email}
      signOutAction={signOutAction}
    >
      {children}
    </AdminShell>
  )
}
