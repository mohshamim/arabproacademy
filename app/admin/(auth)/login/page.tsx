import Image from "next/image"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { LoginForm } from "@/components/admin/login-form"
import { LOGO_SRC } from "@/lib/content"

export default async function AdminLoginPage() {
  const session = await auth()
  if (session?.user) {
    redirect("/admin")
  }

  return (
    <div dir="ltr" lang="en" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0d1b2a] px-4 py-10">
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src={LOGO_SRC}
            alt="Arab Pro Academy"
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-full object-contain"
            priority
          />
          <p className="mt-4 text-[11px] font-bold tracking-[0.2em] text-[#c4962a] uppercase">
            Arab Pro Academy
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-5 sm:p-8">
          <h1 className="font-display text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
            Sign in to Admin
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
            Manage leads, classes, attendance, quizzes, and certificates.
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
