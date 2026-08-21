import type { Metadata } from "next"
import Link from "next/link"
import { getCopy } from "@/lib/copy"
import { getLocale } from "@/lib/locale"
import { LanguageSwitch } from "@/components/language-switch"

export const metadata: Metadata = {
  title: "Terms — Arab Pro Academy",
}

export default async function TermsPage() {
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
        {t.footer.terms}
      </h1>
      {locale === "ar" ? (
        <>
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
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Course fees, batch dates, and class format (in-person in Riyadh or live
            online) are confirmed on WhatsApp or by phone before payment. The
            fluency guarantee on the 3-month package means a free extension of
            classes if, after completing the full program with regular attendance,
            you cannot hold everyday spoken Arabic conversations. Missed classes
            are covered by recordings where available.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Submitting the website form is a request for contact, not a binding
            enrollment until payment and batch confirmation.
          </p>
        </>
      )}
      <LanguageSwitch locale={locale} variant="float" />
    </main>
  )
}
