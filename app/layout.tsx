import type { Metadata } from "next"
import { Inter, Noto_Naskh_Arabic, Playfair_Display } from "next/font/google"

import "./globals.css"

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

export const metadata: Metadata = {
  title: "Arab Pro Academy — Master Spoken Arabic in 3 Months | Riyadh",
  description:
    "Arab Pro Academy in Riyadh helps expats, students, and professionals master spoken Arabic in 3 months. Guaranteed fluency. Enroll today.",
  openGraph: {
    title: "Arab Pro Academy — Master Spoken Arabic in 3 Months",
    description:
      "Learn spoken Arabic in Riyadh. 3 months, 3 days a week, guaranteed fluency. Enroll today.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${notoNaskh.variable} h-full`}
    >
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  )
}
