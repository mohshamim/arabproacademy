import type { Metadata, Viewport } from "next"
import { Inter, Noto_Kufi_Arabic, Noto_Naskh_Arabic, Playfair_Display } from "next/font/google"

import "./globals.css"
import { getLocale } from "@/lib/locale"
import { getTheme } from "@/lib/theme"
import { buildPageMetadata } from "@/lib/seo"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
})

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
})

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-kufi",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0d1b2a",
}

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return buildPageMetadata("home", locale)
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  const theme = await getTheme()

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-theme={theme}
      className={`${inter.variable} ${playfair.variable} ${notoNaskh.variable} ${notoKufi.variable} h-full ${theme === "light" ? "theme-light" : "theme-dark"}`}
    >
      <body className="min-h-full overflow-x-hidden font-sans antialiased">{children}</body>
    </html>
  )
}

