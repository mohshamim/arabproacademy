import { AudienceSection } from "@/components/audience-section"
import { ContactSection } from "@/components/contact-section"
import { CoursesSection } from "@/components/courses-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { OnlineLevelsSection } from "@/components/online-levels-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { WhySection } from "@/components/why-section"
import { getPublicContent } from "@/lib/site-data"

export default async function Home() {
  const content = await getPublicContent()

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar
        phoneDisplay={content.contact.phoneDisplay}
        phoneHref={content.phoneHref}
      />
      <Hero stats={content.stats} whatsappUrl={content.whatsappUrl} />
      <WhySection />
      <CoursesSection />
      <OnlineLevelsSection
        levels={content.online}
        contact={content.contact}
        whatsappUrl={content.whatsappUrl}
        phoneHref={content.phoneHref}
      />
      <PricingSection
        plans={content.pricing}
        whatsappNumber={content.contact.whatsapp}
      />
      <AudienceSection />
      <TestimonialsSection testimonials={content.testimonials} />
      <FaqSection faqs={content.faqs} />
      <ContactSection
        contact={content.contact}
        whatsappUrl={content.whatsappUrl}
        phoneHref={content.phoneHref}
        interestOptions={[
          ...content.pricing.map((p) => ({
            value: p.name,
            label: `${p.name} (${p.price} SAR)`,
          })),
          ...content.online.map((l) => ({
            value: l.name,
            label: `Online ${l.name} (${l.monthlyPrice} SAR/month)`,
          })),
          { value: "question", label: "Just have a question" },
        ]}
      />
      <Footer
        contact={content.contact}
        whatsappUrl={content.whatsappUrl}
        phoneHref={content.phoneHref}
      />
      <WhatsAppFloat href={content.whatsappUrl} />
    </main>
  )
}
