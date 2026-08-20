"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQS } from "@/lib/content"
import type { PublicFaq } from "@/lib/site-data"

export function FaqSection({
  faqs = FAQS.map((f) => ({ q: f.q, a: f.a })),
}: {
  faqs?: PublicFaq[]
}) {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-teal uppercase">
            Questions
          </p>
          <h2 className="mb-4 font-display text-4xl font-black text-navy sm:text-5xl">
            Frequently Asked
            <br />
            <span className="text-gold-gradient">Questions</span>
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
