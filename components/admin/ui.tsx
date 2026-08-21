import type { ReactNode } from "react"
import Link from "next/link"

export function AdminPageHeader({
  title,
  description,
  action,
  actions,
}: {
  title: string
  description?: string
  action?: { href: string; label: string }
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
      <div className="max-w-2xl">
        <h1 className="text-xl font-semibold tracking-tight text-[#0d1b2a] sm:text-[26px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
        {actions}
        {action ? (
          <Link
            href={action.href}
            className="inline-flex h-9 items-center rounded-lg bg-[#0d1b2a] px-3.5 text-sm font-semibold text-white transition hover:bg-[#1b2d3f]"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export function AdminEmpty({
  message,
  hint,
}: {
  message: string
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-[#d6c7a4] bg-[#faf8f4] px-6 py-12 text-center">
      <p className="text-sm font-medium text-[#374151]">{message}</p>
      {hint ? <p className="mt-1.5 text-xs text-[#9CA3AF]">{hint}</p> : null}
    </div>
  )
}

export function AdminStatCard({
  label,
  value,
  href,
  hint,
  tone = "navy",
}: {
  label: string
  value: string | number
  href: string
  hint?: string
  tone?: "navy" | "gold" | "teal" | "rose"
}) {
  const accent =
    tone === "gold"
      ? "from-[#c4962a]/15"
      : tone === "teal"
        ? "from-[#2d7d67]/12"
        : tone === "rose"
          ? "from-[#b91c1c]/10"
          : "from-[#0d1b2a]/8"
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition hover:border-[#c4962a]"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} to-transparent opacity-80`}
      />
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
        {label}
      </p>
      <p className="relative mt-2 text-2xl font-semibold tracking-tight text-[#0d1b2a]">
        {value}
      </p>
      {hint ? (
        <p className="relative mt-1 text-xs text-[#9CA3AF]">{hint}</p>
      ) : null}
    </Link>
  )
}

export function AdminCard({
  title,
  children,
  className = "",
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-4 shadow-sm ${className}`}
    >
      {title ? (
        <h2 className="mb-4 text-sm font-semibold tracking-tight text-[#0d1b2a]">
          {title}
        </h2>
      ) : null}
      {children}
    </div>
  )
}

export function AdminTable({
  headers,
  children,
}: {
  headers: string[]
  children: ReactNode
}) {
  return (
    <div className="-mx-4 overflow-x-auto border-y border-border sm:mx-0 sm:rounded-xl sm:border sm:bg-card sm:shadow-sm">
      <table className="min-w-[36rem] w-full text-left text-sm">
        <thead className="border-b border-border bg-[#faf8f4] text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <tr>
            {headers.map((h) => (
              <th key={h || "actions"} className="whitespace-nowrap px-3 py-3 font-semibold sm:px-4 sm:py-3.5">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f3f4f6]">{children}</tbody>
      </table>
    </div>
  )
}

export function StatusPill({
  value,
}: {
  value: string
}) {
  const map: Record<string, string> = {
    NEW: "bg-[#fdf8ee] text-[#c4962a] ring-[#f5e6c8]",
    CONTACTED: "bg-amber-50 text-amber-800 ring-amber-100",
    INTERESTED: "bg-violet-50 text-violet-700 ring-violet-100",
    ENROLLED: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    LOST: "bg-gray-100 text-gray-600 ring-gray-200",
    ARCHIVED: "bg-gray-100 text-gray-600 ring-gray-200",
    ACTIVE: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    COMPLETED: "bg-[#0d1b2a]/8 text-[#0d1b2a] ring-[#0d1b2a]/10",
    PAUSED: "bg-amber-50 text-amber-800 ring-amber-100",
    DROPPED: "bg-rose-50 text-rose-700 ring-rose-100",
    UPCOMING: "bg-sky-50 text-sky-800 ring-sky-100",
    RUNNING: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    PRESENT: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    LATE: "bg-amber-50 text-amber-800 ring-amber-100",
    ABSENT: "bg-rose-50 text-rose-700 ring-rose-100",
    IN_PERSON: "bg-[#fdf8ee] text-[#c4962a] ring-[#f5e6c8]",
    ONLINE: "bg-teal-50 text-teal-800 ring-teal-100",
    HYBRID: "bg-violet-50 text-violet-700 ring-violet-100",
    PLACEMENT: "bg-[#fdf8ee] text-[#c4962a] ring-[#f5e6c8]",
    WEEKLY: "bg-sky-50 text-sky-800 ring-sky-100",
    LISTENING: "bg-teal-50 text-teal-800 ring-teal-100",
    MID: "bg-amber-50 text-amber-800 ring-amber-100",
    FINAL: "bg-[#0d1b2a] text-[#c4962a] ring-[#0d1b2a]",
  }
  const cls = map[value] || "bg-gray-100 text-gray-700 ring-gray-200"
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ring-1 ${cls}`}
    >
      {value.replaceAll("_", " ")}
    </span>
  )
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string
  name: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#1F2937]">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-[#d1d5db] text-[#c4962a] focus:ring-[#c4962a]"
      />
      {label}
    </label>
  )
}

export const adminBtnClass =
  "inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#0d1b2a] px-3.5 text-sm font-semibold text-white transition hover:bg-[#1b2d3f] disabled:opacity-60 sm:h-9 sm:w-auto"

export const adminGhostBtnClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-border bg-white px-3.5 text-sm font-semibold text-[#374151] transition hover:border-[#c4962a] hover:text-[#c4962a] sm:h-9 sm:w-auto"

export const adminInputClass =
  "w-full rounded-lg border border-input bg-white px-3 py-2.5 text-base text-[#111827] shadow-sm transition placeholder:text-muted-foreground focus:border-[#c4962a] focus:outline-none focus:ring-2 focus:ring-[#c4962a]/20 sm:py-2 sm:text-sm"
