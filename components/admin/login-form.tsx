"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get("email") || "").trim()
    const password = String(formData.get("password") || "")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setPending(false)
        return
      }

      if (!result?.ok) {
        setError("Login did not succeed. Try again.")
        setPending(false)
        return
      }

      router.replace("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      setPending(false)
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#e5e7eb] bg-white px-3 py-3 text-base shadow-sm transition focus:border-[#c4962a] focus:outline-none focus:ring-2 focus:ring-[#c4962a]/20 sm:py-2.5 sm:text-sm"

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-semibold text-[#374151]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@arabproacademy.com"
          className={inputClass}
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-xs font-semibold text-[#374151]"
          >
            Password
          </label>
          <button
            type="button"
            className="text-[11px] font-medium text-[#6B7280] hover:text-[#c4962a]"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>
      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-[#fecaca] bg-[#fff5f5] px-3 py-2 text-sm text-[#b91c1c]"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-[#0d1b2a] text-sm font-semibold text-white transition hover:bg-[#1b2d3f] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
