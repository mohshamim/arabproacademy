import type { Metadata } from "next"
import Link from "next/link"
import { getCopy } from "@/lib/copy"
import { getLocale } from "@/lib/locale"
import { LanguageSwitch } from "@/components/language-switch"

export const metadata: Metadata = {
  title: "Privacy Policy — Arab Pro Academy",
}

export default async function PrivacyPage() {
  const locale = await getLocale()
  const t = getCopy(locale)

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm text-teal">
        <Link href="/" className="hover:underline">
          {locale === "ar" ? "الرئيسية ←" : "← Home"}
        </Link>
      </p>
      <h1 className="mt-4 font-display text-4xl font-black text-navy">
        {t.footer.privacy}
      </h1>
      {locale === "ar" ? (
        <>
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
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Arab Pro Academy (Riyadh, Saudi Arabia) collects the name, phone number,
            and course interest you submit on this website so we can contact you
            about enrollment. We store these details in our academy database and may
            also receive them via WhatsApp when you choose to chat with us.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            We do not sell your personal data. Access is limited to admissions staff.
            You may request access, correction, or deletion by emailing us. This
            notice is provided in line with Saudi Personal Data Protection Law
            (PDPL) principles for a small training academy.
          </p>
        </>
      )}
      <LanguageSwitch locale={locale} variant="float" />
    </main>
  )
}
