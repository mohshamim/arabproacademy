"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Award,
  BookOpen,
  BookText,
  ChevronRight,
  ClipboardCheck,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Mic,
  MonitorPlay,
  PanelLeft,
  Quote,
  Settings,
  Shield,
  Tag,
  Users,
  UsersRound,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  icon: typeof LayoutDashboard
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
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/leads", label: "Leads", icon: Inbox },
      { href: "/admin/guide", label: "How to use", icon: BookText },
    ],
  },
  {
    title: "Academy",
    items: [
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/batches", label: "Batches", icon: UsersRound },
      { href: "/admin/students", label: "Students", icon: Users },
      { href: "/admin/attendance", label: "Attendance", icon: ClipboardCheck },
      { href: "/admin/quizzes", label: "Quizzes", icon: HelpCircle },
      { href: "/admin/exams", label: "Oral exams", icon: Mic },
      { href: "/admin/certificates", label: "Certificates", icon: Award },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/pricing", label: "Pricing", icon: Tag },
      { href: "/admin/online", label: "Online levels", icon: MonitorPlay },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings, superOnly: true },
      { href: "/admin/admins", label: "Admins", icon: Shield, superOnly: true },
    ],
  },
]

const CRUMB_LABELS: Record<string, string> = {
  admin: "Overview",
  leads: "Leads",
  courses: "Courses",
  batches: "Batches",
  students: "Students",
  attendance: "Attendance",
  quizzes: "Quizzes",
  exams: "Oral exams",
  certificates: "Certificates",
  pricing: "Pricing",
  online: "Online levels",
  testimonials: "Testimonials",
  faq: "FAQ",
  settings: "Settings",
  admins: "Admins",
  guide: "How to use",
}

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function crumbsFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean)
  const crumbs: { href: string; label: string }[] = []
  let acc = ""
  for (const part of parts) {
    acc += `/${part}`
    const known = CRUMB_LABELS[part]
    const label =
      known ||
      (part.length > 16 ? "Detail" : part.replaceAll("-", " "))
    crumbs.push({ href: acc === "/admin" ? "/admin" : acc, label })
  }
  return crumbs
}

function NavLinks({
  role,
  pathname,
  collapsed,
  onNavigate,
}: {
  role: string
  pathname: string
  collapsed: boolean
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
            {!collapsed ? (
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                {group.title}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {items.map((item) => {
                const active = isActive(pathname, item.href)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      onClick={onNavigate}
                      className={cn(
                        "flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        collapsed && "justify-center px-0",
                        active
                          ? "bg-[#c4962a] text-[#0d1b2a] shadow-sm"
                          : "text-white/75 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <Icon size={16} strokeWidth={1.8} className="shrink-0" />
                      {!collapsed ? <span>{item.label}</span> : null}
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
  const crumbs = crumbsFromPath(pathname)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("apa-admin-sidebar") === "1")
    } catch {
      /* ignore */
    }
  }, [])

  function toggleCollapsed() {
    setCollapsed((v) => {
      const next = !v
      try {
        localStorage.setItem("apa-admin-sidebar", next ? "1" : "0")
      } catch {
        /* ignore */
      }
      return next
    })
  }

  const sidebarWidth = collapsed ? "w-[72px]" : "w-[260px]"

  return (
    <div className="admin-app flex min-h-svh bg-[#ebe6dc]">
      <aside
        className={cn(
          "sticky top-0 hidden h-svh shrink-0 flex-col bg-[#0d1b2a] transition-[width] duration-200 lg:flex",
          sidebarWidth,
        )}
      >
        <div
          className={cn(
            "flex h-14 items-center gap-2.5 border-b border-white/10 px-3",
            collapsed && "justify-center",
          )}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c4962a] text-[11px] font-bold text-[#0d1b2a]">
            APA
          </span>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Arab Pro</p>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-[#c4962a] uppercase">
                Academy
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <NavLinks role={role} pathname={pathname} collapsed={collapsed} />
        </div>
        <div className={cn("border-t border-white/10 p-3", collapsed && "px-2")}>
          {!collapsed ? (
            <>
              <p className="truncate text-xs text-white/50">{email}</p>
              <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-[#c4962a]">
                {role === "SUPER_ADMIN" ? "Super Admin" : "Editor"}
              </p>
            </>
          ) : (
            <p className="text-center text-[10px] font-bold text-[#c4962a]">
              {role === "SUPER_ADMIN" ? "SA" : "ED"}
            </p>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-h-14 items-center gap-2 border-b border-[#ddd6c8] bg-[#f7f4ee]/90 px-3 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md sm:px-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#e5e7eb] bg-white text-[#0d1b2a] lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <PanelLeft size={18} />
          </button>
          <button
            type="button"
            className="hidden h-8 w-8 items-center justify-center rounded-md border border-[#e5e7eb] bg-white text-[#0d1b2a] lg:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={toggleCollapsed}
          >
            <PanelLeft size={16} />
          </button>
          <Separator orientation="vertical" className="hidden bg-[#ddd6c8] sm:block" />
          <p className="min-w-0 truncate text-sm font-semibold text-[#0d1b2a] sm:hidden">
            {crumbs[crumbs.length - 1]?.label ?? "Admin"}
          </p>
          <nav className="hidden min-w-0 items-center gap-1 text-sm sm:flex">
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex min-w-0 items-center gap-1">
                {i > 0 ? (
                  <ChevronRight size={14} className="shrink-0 text-[#9CA3AF]" />
                ) : null}
                {i === crumbs.length - 1 ? (
                  <span className="truncate font-medium text-[#0d1b2a]">{c.label}</span>
                ) : (
                  <Link
                    href={c.href}
                    className="truncate text-[#6B7280] hover:text-[#c4962a]"
                  >
                    {c.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/"
              className="rounded-md px-2 py-2 text-xs font-semibold text-[#4B5563] hover:bg-white sm:px-2.5 sm:py-1.5"
            >
              Site
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-[#0d1b2a] px-2.5 py-2 text-xs font-semibold text-white sm:px-3 sm:py-1.5"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-0 sm:p-4 lg:p-5">
          <div className="mx-auto max-w-6xl rounded-none border-0 bg-white p-4 shadow-none sm:rounded-xl sm:border sm:border-[#e4ddd0] sm:p-6 sm:shadow-sm">
            {children}
          </div>
        </main>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#0f172a]/45"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute top-0 left-0 flex h-full w-[min(88vw,300px)] flex-col bg-[#0d1b2a] pt-[env(safe-area-inset-top,0px)]">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
              <p className="text-sm font-semibold text-white">Menu</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 items-center px-2 text-sm text-white/60"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <NavLinks
                role={role}
                pathname={pathname}
                collapsed={false}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
            <div className="border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              <p className="truncate text-xs text-white/50">{email}</p>
              <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-[#c4962a]">
                {role === "SUPER_ADMIN" ? "Super Admin" : "Editor"}
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  href="/"
                  className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-white"
                >
                  View site
                </Link>
                <form action={signOutAction} className="flex-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-[#c4962a] text-xs font-semibold text-[#0d1b2a]"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  )
}
