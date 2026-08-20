import Link from "next/link"

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: { href: string; label: string }
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-bold tracking-tight text-[#111827] sm:text-[28px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex h-10 items-center rounded-xl bg-[#0d1b2a] px-4 text-sm font-semibold text-white transition hover:bg-[#1b2d3f]"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  )
}

export function AdminEmpty({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d1d5db] bg-white/80 px-6 py-14 text-center">
      <p className="text-sm text-[#6B7280]">{message}</p>
    </div>
  )
}

export function AdminStatCard({
  label,
  value,
  href,
  hint,
}: {
  label: string
  value: string | number
  href: string
  hint?: string
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-[#e8eaef] bg-white p-5 transition hover:border-[#c4962a]"
    >
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
        {label}
      </p>
      <p className="relative mt-2 font-display text-3xl font-bold tracking-tight text-[#111827]">
        {value}
      </p>
      {hint ? (
        <p className="relative mt-1 text-xs text-[#9CA3AF]">{hint}</p>
      ) : null}
    </Link>
  )
}

export function AdminTable({
  headers,
  children,
}: {
  headers: string[]
  children: React.ReactNode
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e8eaef] bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#eef0f4] bg-[#fafbfc] text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">
          <tr>
            {headers.map((h) => (
              <th key={h || "actions"} className="px-4 py-3.5 font-semibold">
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

export const adminInputClass =
  "w-full rounded-xl border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] shadow-sm transition placeholder:text-[#9CA3AF] focus:border-[#c4962a] focus:outline-none focus:ring-2 focus:ring-[#c4962a]/20"
