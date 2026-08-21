import type { Metadata } from "next"
import Link from "next/link"
import { getCopy } from "@/lib/copy"
import { getTheme } from "@/lib/theme"
import { LanguageSwitch } from "@/components/language-switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { localizedPath } from "@/lib/paths"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("terms", "ar")
}

export default async function ArabicTermsPage() {
  const locale = "ar" as const
  const theme = await getTheme()
  const t = getCopy(locale)

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]">
      <p className="text-sm text-teal">
        <Link href={localizedPath("/", locale)} className="hover:underline">
          الرئيسية ←
        </Link>
      </p>
      <h1 className="mt-4 font-display text-3xl font-black text-navy sm:text-4xl">
        {t.footer.terms}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        رسوم الدورة ومواعيد الدفعات ونوع الحصص (حضوري في الرياض أو أونلاين
        مباشر) تُؤكد عبر واتساب أو الهاتف قبل الدفع. ضمان الطلاقة في باقة 3
        أشهر يعني تمديداً مجانياً للحصص إذا أكملت البرنامج مع حضور منتظم ولم
        تستطع إدارة محادثات يومية بالعربية المحكية. الحصص الفائتة تُغطى
        بالتسجيلات عند توفرها.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        إرسال نموذج الموقع طلب تواصل، وليس تسجيلاً ملزماً حتى يتم الدفع
        وتأكيد الدفعة.
      </p>
      <LanguageSwitch locale={locale} theme={theme} variant="float" />
      <ThemeToggle theme={theme} locale={locale} variant="float" />
    </main>
  )
}
