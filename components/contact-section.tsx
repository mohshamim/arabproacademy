"use client"

import { useState } from "react"
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitCallbackLead } from "@/app/actions/leads"
import type { SiteContactSettings } from "@/lib/site-settings"

export function ContactSection({
  contact,
  whatsappUrl,
  phoneHref,
  interestOptions,
}: {
  contact: SiteContactSettings
  whatsappUrl: string
  phoneHref: string
  interestOptions: { value: string; label: string }[]
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState(interestOptions[0]?.value ?? "")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    const interestLabel =
      interestOptions.find((o) => o.value === interest)?.label ?? interest
    const result = await submitCallbackLead({
      name,
      phone,
      interest: interestLabel,
    })
    setPending(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    window.open(result.whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="contact" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-teal uppercase">
            Get In Touch
          </p>
          <h2 className="mb-4 font-display text-4xl font-black text-navy sm:text-5xl">
            Start Your Arabic
            <br />
            <span className="text-gold-gradient">Journey Today</span>
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-500">
            Have a question or ready to enroll? Reach out — we respond within
            minutes during business hours.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-teal/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <MessageCircle size={22} />
              </div>
              <div>
                <div className="font-semibold text-navy">WhatsApp</div>
                <div className="text-gold">{contact.phoneDisplay}</div>
                <div className="text-sm text-gray-500">
                  Fastest response — chat with us now
                </div>
              </div>
            </a>

            <a
              href={phoneHref}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-gold/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Phone size={22} />
              </div>
              <div>
                <div className="font-semibold text-navy">Call Us</div>
                <div className="text-gold">{contact.phoneDisplay}</div>
                <div className="text-sm text-gray-500">
                  Speak with our admissions team
                </div>
              </div>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-gold/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <Mail size={22} />
              </div>
              <div>
                <div className="font-semibold text-navy">Email</div>
                <div className="break-all text-gold">{contact.email}</div>
                <div className="text-sm text-gray-500">
                  We reply within 24 hours
                </div>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream text-gold">
                <MapPin size={22} />
              </div>
              <div>
                <div className="font-semibold text-navy">Location</div>
                <div className="text-navy">{contact.location}</div>
                <div className="text-sm text-gray-500">
                  In-person & online classes available
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-navy p-8 sm:p-10">
            <h3 className="mb-2 font-display text-2xl font-bold text-white">
              Request a Callback
            </h3>
            <p className="mb-8 text-sm text-gray-400">
              Fill this form and we&apos;ll call you back with batch details and
              pricing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966..."
                  className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="interest">Interested In</Label>
                <select
                  id="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold"
                >
                  {interestOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-navy">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {error ? (
                <p className="text-sm text-red-300">{error}</p>
              ) : null}
              <Button type="submit" size="lg" className="mt-2 w-full" disabled={pending}>
                <Send size={18} />
                {pending ? "Saving…" : "Send via WhatsApp"}
              </Button>
              <p className="text-center text-xs text-gray-500">
                No spam. We only call to discuss your enrollment.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
