import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Arab Pro Academy",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm text-teal">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-4 font-display text-4xl font-black text-navy">
        Privacy Policy
      </h1>
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
    </main>
  )
}
