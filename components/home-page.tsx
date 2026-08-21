import { AudienceSection } from "@/components/audience-section"
import { ContactSection } from "@/components/contact-section"
import { CoursesSection } from "@/components/courses-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { LanguageSwitch } from "@/components/language-switch"
import { Navbar } from "@/components/navbar"
import { OnlineLevelsSection } from "@/components/online-levels-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { WhySection } from "@/components/why-section"
import { JsonLd } from "@/components/json-ld"
import { courseJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo"
import { localizeContent, localizedInterestOptions } from "@/lib/localize-content"
import { getPublicContent } from "@/lib/site-data"
import { getTheme } from "@/lib/theme"
import type { Locale } from "@/lib/locale"

export async function HomePage({ locale }: { locale: Locale }) {
  const theme = await getTheme()
  const raw = await getPublicContent()
  const content = localizeContent(raw, locale)

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar
        phoneDisplay={content.contact.phoneDisplay}
        phoneHref={content.phoneHref}
        locale={locale}
        theme={theme}
      />
      <Hero stats={content.stats} whatsappUrl={content.whatsappUrl} locale={locale} />
      <WhySection locale={locale} />
      <CoursesSection locale={locale} />
      <OnlineLevelsSection
        levels={content.online}
        contact={content.contact}
        whatsappUrl={content.whatsappUrl}
        phoneHref={content.phoneHref}
        locale={locale}
      />
      <PricingSection
        plans={content.pricing}
        whatsappNumber={content.contact.whatsapp}
        locale={locale}
      />
      <AudienceSection locale={locale} />
      <TestimonialsSection testimonials={content.testimonials} locale={locale} />
      <FaqSection faqs={content.faqs} locale={locale} />
      <ContactSection
        contact={content.contact}
        whatsappUrl={content.whatsappUrl}
        phoneHref={content.phoneHref}
        interestOptions={localizedInterestOptions(content, locale)}
        locale={locale}
      />
      <Footer
        contact={content.contact}
        whatsappUrl={content.whatsappUrl}
        phoneHref={content.phoneHref}
        locale={locale}
      />
      <JsonLd data={[organizationJsonLd(), courseJsonLd(), faqJsonLd(content.faqs)]} />
      <WhatsAppFloat href={content.whatsappUrl} />
      <LanguageSwitch locale={locale} theme={theme} variant="float" />
    </main>
  )
}
