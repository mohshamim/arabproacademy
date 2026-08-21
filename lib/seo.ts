import type { Metadata } from "next"
import type { Locale } from "@/lib/locale"

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.AUTH_URL ||
  "https://arabproacademy.com"
).replace(/\/$/, "")

export const SITE_NAME = "Arab Pro Academy"
export const SITE_PHONE = "+966574915561"
export const SITE_EMAIL = "arabpacademy@gmail.com"

const TITLES: Record<Locale, string> = {
  en: "Spoken Arabic Classes in Riyadh for Expats | Arab Pro Academy",
  ar: "دورة العربية المحكية في الرياض للمقيمين | أكاديمية عرب برو",
}

const DESCRIPTIONS: Record<Locale, string> = {
  en: "Learn spoken Arabic in Riyadh or live online. Built for non-native speakers — Indian professionals, GCC expats, and beginners. 3-month conversational classes, small batches, WhatsApp enrollment.",
  ar: "تعلّم العربية المحكية في الرياض أو أونلاين مباشر. للمقيمين غير الناطقين بالعربية من الهند والخليج والمبتدئين. دورة محادثة 3 أشهر، دفعات صغيرة، التسجيل عبر واتساب.",
}

export const SEO_KEYWORDS = [
  "spoken Arabic classes Riyadh",
  "Arabic course for expats Saudi Arabia",
  "learn Arabic in Riyadh",
  "conversational Arabic for beginners",
  "Arabic speaking course GCC",
  "Arabic classes for Indians in Saudi",
  "online Arabic course UAE Qatar Kuwait",
  "Gulf Arabic for non-native speakers",
  "Arabic classes for professionals Riyadh",
  "learn spoken Arabic India online",
  "Arabic institute Riyadh expats",
  "3 month Arabic fluency course",
]

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path
  const clean = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${clean === "/" ? "" : clean}`
}

export function localizedUrl(path: string, locale: Locale) {
  const clean = !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`
  if (locale === "ar") {
    return absoluteUrl(clean === "/" ? "/ar" : `/ar${clean}`)
  }
  return absoluteUrl(clean)
}

export function languageAlternates(path = "/") {
  return {
    "en-SA": localizedUrl(path, "en"),
    "en-AE": localizedUrl(path, "en"),
    "en-IN": localizedUrl(path, "en"),
    ar: localizedUrl(path, "ar"),
    "x-default": localizedUrl(path, "en"),
  }
}

type PageKey = "home" | "placement" | "privacy" | "terms" | "verify"

const PAGE_COPY: Record<
  PageKey,
  { en: { title: string; description: string }; ar: { title: string; description: string } }
> = {
  home: {
    en: { title: TITLES.en, description: DESCRIPTIONS.en },
    ar: { title: TITLES.ar, description: DESCRIPTIONS.ar },
  },
  placement: {
    en: {
      title: "Spoken Arabic Placement Quiz for Beginners",
      description:
        "2-minute placement for non-native speakers. Find out if Beginner or Intermediate spoken Arabic in Riyadh or online fits you, then enroll on WhatsApp.",
    },
    ar: {
      title: "اختبار تحديد مستوى العربية المحكية",
      description:
        "اختبار دقيقتين لغير الناطقين بالعربية. اعرف إن كان المبتدئ أو المتوسط مناسباً — ثم سجّل عبر واتساب.",
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy",
      description:
        "How Arab Pro Academy in Riyadh collects and uses enrollment details for spoken Arabic classes.",
    },
    ar: {
      title: "سياسة الخصوصية",
      description: "كيف تجمع أكاديمية عرب برو في الرياض بيانات التسجيل لدورات العربية المحكية.",
    },
  },
  terms: {
    en: {
      title: "Terms",
      description:
        "Enrollment, fees, and fluency guarantee for spoken Arabic classes at Arab Pro Academy, Riyadh.",
    },
    ar: {
      title: "الشروط",
      description: "التسجيل والرسوم وضمان الطلاقة لدورات العربية المحكية في أكاديمية عرب برو بالرياض.",
    },
  },
  verify: {
    en: {
      title: "Verify Arabic Course Certificate",
      description:
        "Confirm a spoken Arabic certificate issued by Arab Pro Academy in Riyadh, Saudi Arabia.",
    },
    ar: {
      title: "التحقق من شهادة دورة العربية",
      description: "تأكيد شهادة العربية المحكية الصادرة عن أكاديمية عرب برو في الرياض.",
    },
  },
}

const PATH_BY_PAGE: Record<PageKey, string> = {
  home: "/",
  placement: "/placement",
  privacy: "/privacy",
  terms: "/terms",
  verify: "/verify",
}

export function buildPageMetadata(
  page: PageKey,
  locale: Locale,
  extraPath?: string,
): Metadata {
  const copy = PAGE_COPY[page][locale]
  const path = extraPath || PATH_BY_PAGE[page]
  const url = localizedUrl(path, locale)
  const ogLocale = locale === "ar" ? "ar_SA" : "en_SA"

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    keywords: SEO_KEYWORDS,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "education",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: {
      canonical: url,
      languages: languageAlternates(path === "/verify" ? "/verify" : path),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "ar" ? ["en_SA", "en_IN", "en_AE"] : ["ar_SA", "en_IN", "en_AE"],
      url,
      siteName: SITE_NAME,
      title: copy.title,
      description: copy.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Spoken Arabic classes in Riyadh for expats and non-native speakers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
    other: {
      "geo.region": "SA-01",
      "geo.placename": "Riyadh",
      "geo.position": "24.7136;46.6753",
      ICBM: "24.7136, 46.6753",
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["أكاديمية عرب برو", "Arab Pro Academy Riyadh"],
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    image: `${SITE_URL}/logo.svg`,
    logo: `${SITE_URL}/logo.svg`,
    description: DESCRIPTIONS.en,
    inLanguage: ["en", "ar"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh Province",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.7136,
      longitude: 46.6753,
    },
    areaServed: [
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "Oman" },
      { "@type": "Country", name: "India" },
    ],
    audience: {
      "@type": "Audience",
      audienceType:
        "Non-native speakers, Indian expats, GCC professionals, beginners learning spoken Arabic",
    },
    priceRange: "SAR",
    currenciesAccepted: "SAR",
    paymentAccepted: "Cash, Bank transfer, WhatsApp enrollment",
    openingHours: "Mo-Su 09:00-21:00",
  }
}

export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Spoken Arabic Course for Non-Native Speakers",
    description:
      "Conversational Arabic classes in Riyadh and live online for expats from India and the GCC. 3-month spoken-first program for beginners and working professionals.",
    url: SITE_URL,
    inLanguage: "ar",
    availableLanguage: ["en", "ar"],
    educationalLevel: "Beginner to Intermediate",
    teaches: "Spoken Saudi and Gulf Arabic conversation",
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: [
      {
        "@type": "Offer",
        name: "3-Month Spoken Arabic Package",
        price: "1899",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#pricing`,
      },
      {
        "@type": "Offer",
        name: "Monthly Spoken Arabic Package",
        price: "899",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#pricing`,
      },
    ],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: "In-person spoken Arabic — Riyadh",
        courseMode: "Onsite",
        location: {
          "@type": "Place",
          name: "Arab Pro Academy",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Riyadh",
            addressCountry: "SA",
          },
        },
      },
      {
        "@type": "CourseInstance",
        name: "Live online spoken Arabic — GCC & India",
        courseMode: "Online",
      },
    ],
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: localizedUrl(item.path, locale),
    })),
  }
}
