"use server"

import { createLead } from "@/lib/leads"
import { getContactSettings, whatsappDeepLink } from "@/lib/site-settings"

export async function submitCallbackLead(input: {
  name: string
  phone: string
  interest: string
}) {
  const name = input.name.trim()
  const phone = input.phone.trim()
  const interest = input.interest.trim()

  if (!name || !phone) {
    return { ok: false as const, error: "Name and phone are required." }
  }

  const message = `Hi Arab Pro Academy! My name is ${name}. Phone: ${phone}. Interested in: ${interest}. Please call me back.`

  await createLead({
    type: "CONTACT",
    source: "WEBSITE",
    name,
    phone,
    interest,
    message,
  })

  const contact = await getContactSettings()
  return {
    ok: true as const,
    whatsappUrl: whatsappDeepLink(contact.whatsapp, message),
  }
}
