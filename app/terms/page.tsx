import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms — Arab Pro Academy",
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm text-teal">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-4 font-display text-4xl font-black text-navy">
        Terms of enrollment
      </h1>
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
    </main>
  )
}
