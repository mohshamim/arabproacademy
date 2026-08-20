import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user) {
    redirect("/admin/login")
  }
  return session
}

export async function requireSuperAdmin() {
  const session = await requireAdmin()
  if (session.user.role !== "SUPER_ADMIN") {
    redirect("/admin")
  }
  return session
}

export function isSuperAdmin(role?: string | null) {
  return role === "SUPER_ADMIN"
}

export async function requireCanDeleteLeads() {
  const session = await requireAdmin()
  if (session.user.role !== "SUPER_ADMIN") {
    throw new Error("Only Super Admin can delete leads")
  }
  return session
}
