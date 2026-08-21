import type { Metadata } from "next"
import Link from "next/link"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { getLocale } from "@/lib/locale"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const locale = await getLocale()
  const { code } = await params
  return buildPageMetadata("verify", locale, `/verify/${code.trim().toUpperCase()}`)
}

export default async function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const upper = code.trim().toUpperCase()

  let cert: {
    code: string
    courseName: string
    issuedAt: Date
    student: { name: string }
  } | null = null

  if (hasDatabaseUrl()) {
    try {
      const prisma = await prismaReady()
      cert = await prisma.certificate.findUnique({
        where: { code: upper },
        include: { student: { select: { name: true } } },
      })
    } catch {
      cert = null
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#c4962a] uppercase">
          Arab Pro Academy · Riyadh
        </p>
        {!cert ? (
          <div className="mt-8 rounded-3xl border border-rose-200 bg-white p-10 text-center">
            <h1 className="font-display text-3xl font-bold text-navy">
              Certificate not found
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Code <span className="font-mono">{upper}</span> is not in our
              records. Check the code or contact the academy.
            </p>
            <Link href="/" className="mt-6 inline-block text-sm font-semibold text-gold">
              Home
            </Link>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-3xl border-4 border-[#c4962a] bg-white shadow-xl">
            <div className="bg-[#0d1b2a] px-8 py-6 text-center">
              <p className="font-arabic text-2xl text-[#c4962a]" dir="rtl">
                أكاديمية عرب برو
              </p>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                Certificate of completion
              </p>
            </div>
            <div className="px-8 py-12 text-center">
              <p className="text-sm text-gray-500">This certifies that</p>
              <h1 className="mt-3 font-display text-4xl font-bold text-[#0d1b2a]">
                {cert.student.name}
              </h1>
              <p className="mt-6 text-sm leading-relaxed text-gray-600">
                has successfully completed
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-[#c4962a]">
                {cert.courseName}
              </p>
              <p className="mt-6 text-sm text-gray-500">
                Issued {cert.issuedAt.toISOString().slice(0, 10)} · Verify code{" "}
                <span className="font-mono font-semibold text-navy">{cert.code}</span>
              </p>
              <p className="mt-10 text-xs text-gray-400">
                Spoken Arabic · Arab Pro Academy, Riyadh
              </p>
            </div>
          </div>
        )}
        <p className="mt-6 text-center text-xs text-gray-500">
          Print this page for a PDF.{" "}
          <Link href="/" className="text-gold hover:underline">
            arabproacademy.com
          </Link>
        </p>
      </div>
    </main>
  )
}
