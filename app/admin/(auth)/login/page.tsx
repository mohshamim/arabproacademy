import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { LoginForm } from "@/components/admin/login-form"

export default async function AdminLoginPage() {
  const session = await auth()
  if (session?.user) {
    redirect("/admin")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d1b2a] px-4 py-10">
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c4962a] text-sm font-bold text-[#0d1b2a]">
            APA
          </span>
          <p className="mt-4 text-[11px] font-bold tracking-[0.2em] text-[#c4962a] uppercase">
            Arab Pro Academy
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-[#111827]">
            Sign in to Admin
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
            Manage leads, pricing, FAQ, and site settings.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Authorized staff only
        </p>
      </div>
    </div>
  )
}
