"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type NavItem = {
  href: string
  label: string
  superOnly?: boolean
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Workspace",
    items: [
      { href: "/admin", label: "Overview" },
      { href: "/admin/leads", label: "Leads" },
    ],
  },
  {
    title: "Teach",
    items: [
      { href: "/admin/courses", label: "Courses" },
      { href: "/admin/batches", label: "Batches" },
      { href: "/admin/students", label: "Students" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/pricing", label: "Pricing" },
      { href: "/admin/online", label: "Online levels" },
      { href: "/admin/testimonials", label: "Testimonials" },
      { href: "/admin/faq", label: "FAQ" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/settings", label: "Settings", superOnly: true },
      { href: "/admin/admins", label: "Admins", superOnly: true },
    ],
  },
]

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLinks({
  role,
  pathname,
  onNavigate,
}: {
  role: string
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <div className="space-y-6">
      {NAV_GROUPS.map((group) => {
        const items = group.items.filter(
          (item) => !item.superOnly || role === "SUPER_ADMIN",
        )
        if (items.length === 0) return null
        return (
          <div key={group.title}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#0d1b2a] text-white"
                          : "text-[#4B5563] hover:bg-[#f5f0e8] hover:text-[#c4962a]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export function AdminShell({
  role,
  email,
  children,
  signOutAction,
}: {
  role: string
  email?: string | null
  children: React.ReactNode
  signOutAction: () => Promise<void>
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <header className="sticky top-0 z-40 border-b border-[#e8eaef]/90 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#1F2937] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-4 rounded bg-current" />
                <span className="block h-0.5 w-4 rounded bg-current" />
                <span className="block h-0.5 w-4 rounded bg-current" />
              </span>
            </button>
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0d1b2a] text-xs font-bold text-[#c4962a]">
                APA
              </span>
              <span className="font-display text-sm font-bold tracking-tight text-[#111827]">
                Arab Pro
                <span className="ml-1 font-semibold text-[#c4962a]">Admin</span>
              </span>
            </Link>
            <span className="hidden rounded-full border border-[#f5e6c8] bg-[#fdf8ee] px-2.5 py-0.5 text-[10px] font-semibold text-[#c4962a] sm:inline">
              {role === "SUPER_ADMIN" ? "Super Admin" : "Editor"}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {email ? (
              <span className="hidden max-w-[200px] truncate text-xs text-[#6B7280] md:inline">
                {email}
              </span>
            ) : null}
            <Link
              href="/"
              className="rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#4B5563] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]"
            >
              View site
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-[#0d1b2a] px-3 py-1.5 text-xs font-semibold text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#0f172a]/45"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute top-0 left-0 flex h-full w-[min(88vw,300px)] flex-col border-r border-[#e5e7eb] bg-white">
            <div className="flex items-center justify-between border-b border-[#f3f4f6] px-4 py-3">
              <p className="text-sm font-semibold text-[#111827]">Navigation</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm text-[#6B7280]"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <NavLinks
                role={role}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </aside>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-[1440px] gap-0 px-0 lg:gap-8 lg:px-8 lg:py-8">
        <aside className="sticky top-[4.25rem] hidden h-[calc(100vh-5.5rem)] w-60 shrink-0 overflow-y-auto rounded-2xl border border-[#e8eaef] bg-white/90 p-4 lg:block">
          <NavLinks role={role} pathname={pathname} />
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-0 lg:py-0">
          <div className="mx-auto max-w-5xl pb-16">{children}</div>
        </main>
      </div>
    </div>
  )
}
