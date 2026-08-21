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
  return buildPageMetadata("privacy", "ar")
}

export default async function ArabicPrivacyPage() {
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
        {t.footer.privacy}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        تجمع أكاديمية عرب برو (الرياض، السعودية) الاسم ورقم الجوال واهتمامك
        بالدورة عند إرسال النموذج للتواصل معك بشأن التسجيل. نحتفظ بهذه
        البيانات في قاعدة الأكاديمية وقد تصلنا أيضاً عبر واتساب إذا اخترت
        المحادثة.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        لا نبيع بياناتك. الوصول محدود لفريق القبول. يمكنك طلب الاطلاع أو
        التصحيح أو الحذف عبر البريد. هذا الإشعار وفق مبادئ نظام حماية البيانات
        الشخصية في السعودية لمعهد تدريب صغير.
      </p>
      <LanguageSwitch locale={locale} theme={theme} variant="float" />
      <ThemeToggle theme={theme} locale={locale} variant="float" />
    </main>
  )
}
