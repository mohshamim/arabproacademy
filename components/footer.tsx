import Image from "next/image"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import type { SiteContactSettings } from "@/lib/site-settings"

export function Footer({
  contact,
  whatsappUrl,
  phoneHref,
  locale = "en",
}: {
  contact: SiteContactSettings
  whatsappUrl: string
  phoneHref: string
  locale?: Locale
}) {
  const t = getCopy(locale)
  const links = [
    { href: "#why", label: t.footer.why },
    { href: "#courses", label: t.footer.courseDetails },
    { href: "#online", label: t.footer.onlineLevels },
    { href: "#pricing", label: t.nav.pricing },
    { href: "/placement", label: t.nav.placement },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ]
  return (
    <footer className="border-t border-white/10 bg-navy pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Arab Pro Academy"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-gold"
              />
              <div>
                <div
                  className={
                    locale === "ar"
                      ? "font-kufi text-lg font-bold text-white"
                      : "font-display text-lg font-bold text-white"
                  }
                >
                  {t.brand}
                </div>
                <div className="text-xs tracking-widest text-gold uppercase">
                  Riyadh, KSA
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              {t.footer.blurb}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">{t.footer.links}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-gray-400 transition-colors hover:text-gold"
                >
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm text-gray-400 transition-colors hover:text-gold"
                >
                  {t.footer.terms}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold"
                >
                  <MessageCircle size={14} className="text-teal" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={phoneHref}
                  className="flex items-center gap-2 hover:text-gold"
                >
                  <Phone size={14} className="text-gold" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 hover:text-gold"
                >
                  <Mail size={14} className="text-gold" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                {contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </p>
          <p className="font-kufi text-sm text-gold/40" dir="rtl">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
