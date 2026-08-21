"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function SeedWebsiteButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onClick() {
    if (pending) return
    const ok = window.confirm(
      "Load website copy plus course syllabi into MySQL? Safe to run again — it will not wipe students.",
    )
    if (!ok) return

    setPending(true)
    setMessage(null)
    setError(null)

    try {
      const res = await fetch("/api/admin/seed-content", { method: "POST" })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data.message || "Seed failed")
        setPending(false)
        return
      }
      const r = data.result
      setMessage(
        `Done — courses ${r.courses ?? 0}, weeks ${r.weeks ?? 0}, quizzes ${r.quizzes ?? 0}, pricing ${r.pricing}, FAQ ${r.faqs}.`,
      )
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Seed failed")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
      <h2 className="text-sm font-semibold text-[#1F2937]">
        Seed website content
      </h2>
      <p className="mt-1 text-sm text-[#6B7280]">
        Copies pricing, FAQ, testimonials, syllabi, and the public placement
        quiz into MySQL. Does not change the public page design. Super Admin
        only.
      </p>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="mt-4 inline-flex h-9 cursor-pointer items-center justify-center rounded-lg bg-[#0d1b2a] px-3.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Seeding…" : "Seed content now"}
      </button>
      {message ? (
        <p className="mt-3 text-sm text-green-700">{message}</p>
      ) : null}
      {error ? <p className="mt-3 text-sm text-[#b91c1c]">{error}</p> : null}
    </div>
  )
}
