'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export function FloatingActions() {
  const whatsappUrl = getWhatsAppUrl(
    BRAND.whatsappNumber,
    'Namaste JR Real Estate Varanasi, I would like to inquire about properties / construction services.'
  );

  return (
    <>
      {/* Desktop Floating WhatsApp Button (Bottom Right) */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40 group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-emerald-400/40"
          aria-label="Chat on WhatsApp with JR Real Estate"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold leading-tight">Chat with Expert</span>
            <span className="text-[10px] text-emerald-100">8948301111</span>
          </div>
        </a>
      </div>

      {/* Persistent Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-charcoal-400/95 backdrop-blur-md border-t border-charcoal-100 py-2 px-3 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          {/* Direct Phone Call */}
          <a
            href={`tel:${BRAND.phone}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-charcoal-200 border border-gold/30 text-gold active:bg-gold/20"
          >
            <Phone className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Call Now</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-emerald-600/90 text-white active:bg-emerald-700"
          >
            <MessageSquare className="w-4 h-4 mb-1 fill-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
          </a>

          {/* Book Site Visit */}
          <Link
            href="/contact?intent=visit"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-gradient-to-r from-gold to-gold-hover text-charcoal active:opacity-90 font-bold"
          >
            <CalendarCheck className="w-4 h-4 mb-1 fill-charcoal" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Site Visit</span>
          </Link>
        </div>
      </div>
    </>
  );
}
