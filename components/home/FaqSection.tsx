'use client';

import React, { useState } from 'react';
import { FaqItemData } from '@/lib/data/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItemData[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Guidance &bull; Legal Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-ivory/70 mt-2">
            Important questions on property registry, circle rates, and home building in Varanasi.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-charcoal-200 border border-charcoal-100 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-ivory hover:text-gold transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold' : 'text-ivory/50'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-ivory/75 leading-relaxed border-t border-charcoal-100/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
