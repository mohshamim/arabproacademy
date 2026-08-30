import type { Metadata } from "next"
import type { Locale } from "@/lib/locale"
import { trackingIds } from "@/lib/tracking"

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.AUTH_URL ||
  "https://arabproacademy.com"
).replace(/\/$/, "")

export const SITE_NAME = "Arab Pro Academy"
export const SITE_PHONE = "+966574915561"
export const SITE_EMAIL = "arabpacademy@gmail.com"

const TITLES: Record<Locale, string> = {
  en: "Spoken Arabic Crash Course in Riyadh for Expats | Arab Pro Academy",
  ar: "دورة عربية محكية مكثفة في الرياض للمقيمين | أكاديمية عرب برو",
}

const DESCRIPTIONS: Record<Locale, string> = {
  en: "Crash-course spoken Arabic in Riyadh for Indian, Filipino, and Pakistani expats. Learn conversation fast — 3 days a week, 3-month intensive, or live online across Saudi and the GCC. Enroll on WhatsApp.",
  ar: "دورة عربية محكية مكثفة في الرياض للمقيمين من الهند والفلبين وباكستان. تعلّم المحادثة بسرعة — 3 أيام أسبوعياً، مسار 3 أشهر، أو أونلاين مباشر في السعودية والخليج. التسجيل عبر واتساب.",
}

export const SEO_KEYWORDS = [
  "spoken Arabic classes Riyadh",
  "Arabic crash course Riyadh",
  "learn Arabic fast Saudi",
  "conversational Arabic for expats Riyadh",
  "Arabic course for Indians in Riyadh",
  "quick spoken Arabic course Saudi Arabia",
  "intensive Arabic classes Riyadh",
  "Arabic classes for Filipino expats Riyadh",
  "online spoken Arabic Jeddah Dammam",
  "live online Arabic UAE Qatar Kuwait",
  "3 month Arabic crash course",
  "Arabic institute Riyadh expats",
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

type PageKey =
  | "home"
  | "placement"
  | "privacy"
  | "terms"
  | "verify"
  | "spokenArabicRiyadh"
  | "crashCourse"
  | "learnFast"
  | "expatsRiyadh"
  | "onlineGcc"

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
  spokenArabicRiyadh: {
    en: {
      title: "Spoken Arabic Classes in Riyadh for Expats",
      description:
        "Conversational Arabic in Riyadh for Indian, Filipino, and Pakistani expats. Small batches, spoken-first, WhatsApp enrollment. In-person or live online.",
    },
    ar: {
      title: "دورة العربية المحكية في الرياض للمقيمين",
      description:
        "عربية محادثة في الرياض للمقيمين من الهند والفلبين وباكستان. دفعات صغيرة، محادثة أولاً، التسجيل عبر واتساب. حضوري أو أونلاين مباشر.",
    },
  },
  crashCourse: {
    en: {
      title: "Arabic Crash Course in Riyadh | 3-Month Intensive",
      description:
        "Intensive spoken Arabic crash course in Riyadh. 3 days a week for 3 months. Built for expats who need conversation fast. Enroll on WhatsApp.",
    },
    ar: {
      title: "دورة عربية مكثفة في الرياض | 3 أشهر",
      description:
        "دورة عربية محكية مكثفة في الرياض. 3 أيام أسبوعياً لمدة 3 أشهر. للمقيمين الذين يحتاجون المحادثة بسرعة. التسجيل عبر واتساب.",
    },
  },
  learnFast: {
    en: {
      title: "Learn Arabic Fast in Saudi Arabia | Quick Spoken Course",
      description:
        "Learn spoken Arabic fast in Saudi Arabia. Beginner-friendly 3-month path in Riyadh or live online. Greetings to workplace talk. WhatsApp to start.",
    },
    ar: {
      title: "تعلّم العربية بسرعة في السعودية | دورة محكية",
      description:
        "تعلّم العربية المحكية بسرعة في السعودية. مسار 3 أشهر للمبتدئين في الرياض أو أونلاين مباشر. من التحية إلى حديث العمل. ابدأ عبر واتساب.",
    },
  },
  expatsRiyadh: {
    en: {
      title: "Arabic Classes for Indian Expats in Riyadh",
      description:
        "English-friendly spoken Arabic for Indian, Filipino, and Pakistani expats in Riyadh. Daily life, clinic, and office conversation. Enroll on WhatsApp.",
    },
    ar: {
      title: "دورة عربية للمقيمين الهنود في الرياض",
      description:
        "عربية محكية مريحة للإنجليزية للمقيمين من الهند والفلبين وباكستان في الرياض. حياة يومية وعيادة ومكتب. التسجيل عبر واتساب.",
    },
  },
  onlineGcc: {
    en: {
      title: "Online Spoken Arabic Classes in Saudi & GCC",
      description:
        "Live online spoken Arabic from Riyadh teachers. For Jeddah, Dammam, UAE, Qatar, Kuwait, and India. Beginner and intermediate tracks. WhatsApp enroll.",
    },
    ar: {
      title: "دورة عربية محكية أونلاين في السعودية والخليج",
      description:
        "عربية محكية أونلاين مباشر مع معلمي الرياض. لجدة والدمام والإمارات وقطر والكويت والهند. مبتدئ ومتوسط. التسجيل عبر واتساب.",
    },
  },
}

const PATH_BY_PAGE: Record<PageKey, string> = {
  home: "/",
  placement: "/placement",
  privacy: "/privacy",
  terms: "/terms",
  verify: "/verify",
  spokenArabicRiyadh: "/spoken-arabic-riyadh",
  crashCourse: "/arabic-crash-course-riyadh",
  learnFast: "/learn-arabic-fast",
  expatsRiyadh: "/arabic-for-expats-riyadh",
  onlineGcc: "/online-arabic-saudi-gcc",
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
    verification: trackingIds().googleVerification
      ? { google: trackingIds().googleVerification }
      : undefined,
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
          alt: "Spoken Arabic crash course in Riyadh for Indian and GCC expats",
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
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    description: DESCRIPTIONS.en,
    inLanguage: ["en", "ar"],
    knowsAbout: [
      "Spoken Arabic crash course",
      "Conversational Arabic for expats",
      "Arabic classes in Riyadh",
      "Live online Arabic Saudi GCC",
    ],
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
      { "@type": "City", name: "Riyadh" },
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
        "Indian, Filipino, and Pakistani expats in Riyadh; non-native speakers learning spoken Arabic",
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
    name: "Spoken Arabic Crash Course for Expats in Riyadh",
    description:
      "3-month intensive spoken Arabic in Riyadh for Indian and other non-native expats, plus live online classes across Saudi Arabia and the GCC.",
    url: SITE_URL,
    inLanguage: "ar",
    availableLanguage: ["en", "ar"],
    educationalLevel: "Beginner to Intermediate",
    teaches: "Spoken Saudi and Gulf Arabic conversation",
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: [
      {
        "@type": "Offer",
        name: "3-Month Spoken Arabic Crash Course",
        price: "1899",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/arabic-crash-course-riyadh`,
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
