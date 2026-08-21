import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Admin — Arab Pro Academy",
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
