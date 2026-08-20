import Image from "next/image"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { NAV_LINKS } from "@/lib/content"
import type { SiteContactSettings } from "@/lib/site-settings"

export function Footer({
  contact,
  whatsappUrl,
  phoneHref,
}: {
  contact: SiteContactSettings
  whatsappUrl: string
  phoneHref: string
}) {
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
                <div className="font-display text-lg font-bold text-white">
                  Arab Pro Academy
                </div>
                <div className="text-xs tracking-widest text-gold uppercase">
                  Riyadh, KSA
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Helping expats, students, and professionals master spoken Arabic
              and accelerate their careers across Saudi Arabia and the Gulf.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-gold"
                  >
                    {link.label === "About"
                      ? "Why Learn Arabic"
                      : link.label === "Courses"
                        ? "Course Details"
                        : link.label === "Online"
                          ? "Online Levels"
                          : link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-gray-400 transition-colors hover:text-gold"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm text-gray-400 transition-colors hover:text-gold"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
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
            © {new Date().getFullYear()} Arab Pro Academy. All rights reserved.
          </p>
          <p className="font-arabic text-sm text-gold/40" dir="rtl">
            أكاديمية العرب برو — تعلم العربية بثقة
          </p>
        </div>
      </div>
    </footer>
  )
}
