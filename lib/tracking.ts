import { WHATSAPP_NUMBER, whatsappEnrollUrl } from "@/lib/content"

export function trackingIds() {
  return {
    gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "",
    googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
  }
}

export function whatsappCampaignUrl(
  message: string,
  campaign: string,
  number = WHATSAPP_NUMBER,
) {
  const tagged = `${message}\n\n[from:${campaign}]`
  return whatsappEnrollUrl(tagged, number)
}
