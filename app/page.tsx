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

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhySection />
      <CoursesSection />
      <OnlineLevelsSection />
      <PricingSection />
      <AudienceSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
