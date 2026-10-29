'use client';

import React, { useState } from 'react';
import { submitGeneralContact } from '@/app/actions/leads';
import { BRAND, VARANASI_LOCALITIES } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
} from 'lucide-react';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; referenceCode?: string; error?: string } | null>(null);

  const whatsappUrl = getWhatsAppUrl(
    BRAND.whatsappNumber,
    'Namaste JR Real Estate Varanasi, I would like to schedule an in-person meeting at your Pandeypur Chauraha office.'
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitGeneralContact(formData);
    setResult(res);
    setSubmitting(false);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
            <Building className="w-3.5 h-3.5" />
            <span>Pandeypur Chauraha Headquarters</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Contact JR Real Estate Varanasi
          </h1>

          <p className="text-sm text-ivory/70 leading-relaxed">
            Reach out to Director Mr. Umesh Yadav and our property advisory team. Visit our central office or submit your inquiry below for immediate callback.
          </p>
        </div>

        {/* Contact Grid: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="p-6 rounded-2xl bg-charcoal-200 border border-charcoal-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-charcoal-300 border border-gold/30 text-gold flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ivory">Phone Helpline</h3>
              <p className="text-xs text-ivory/60 leading-relaxed">
                Direct mobile line to Director Mr. Umesh Yadav and customer desk.
              </p>
              <div className="text-base font-bold text-gold pt-1">
                +91 {BRAND.phone}
              </div>
            </div>
            <a
              href={`tel:${BRAND.phone}`}
              className="w-full py-2.5 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors text-center block"
            >
              Call Director Now
            </a>
          </div>

          {/* WhatsApp */}
          <div className="p-6 rounded-2xl bg-charcoal-200 border border-charcoal-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 fill-emerald-400" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ivory">WhatsApp Desk</h3>
              <p className="text-xs text-ivory/60 leading-relaxed">
                Send property links, plot photos, or request instant brochures via WhatsApp.
              </p>
              <div className="text-base font-bold text-emerald-400 pt-1">
                +91 {BRAND.phone}
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors text-center block shadow-lg"
            >
              Start WhatsApp Chat
            </a>
          </div>

          {/* Office Address */}
          <div className="p-6 rounded-2xl bg-charcoal-200 border border-charcoal-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-charcoal-300 border border-gold/30 text-gold flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ivory">Central Office</h3>
              <p className="text-xs text-ivory/80 leading-relaxed">
                {BRAND.address}
              </p>
              <div className="text-[11px] text-ivory/60 flex items-center gap-1 pt-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{BRAND.officeHours}</span>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Pandeypur+Chauraha+Varanasi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-charcoal-300 border border-charcoal-100 hover:border-gold/40 text-ivory text-xs font-semibold text-center block transition-colors"
            >
              Open Google Maps
            </a>
          </div>
        </div>

        {/* Contact Form & Office Information */}
        <div className="bg-charcoal-200 border border-gold/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Left (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-charcoal-100 pb-3">
                <h2 className="font-serif font-bold text-2xl text-ivory">
                  Send an Inquiry or Schedule a Site Visit
                </h2>
                <p className="text-xs text-ivory/60 mt-1">
                  Submissions are logged directly into our CRM. Our executives follow up promptly.
                </p>
              </div>

              {result?.success && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{result.message}</p>
                    <p className="text-[11px] text-emerald-200 mt-1">
                      CRM Reference Code: <strong className="font-mono text-white">{result.referenceCode}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {result?.error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{result.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Anand Kumar"
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="10-digit mobile number"
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Optional"
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Inquiry Purpose</label>
                    <select
                      name="serviceType"
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    >
                      <option value="Buy Residential Plot">Buy Residential Plot</option>
                      <option value="Buy Flat / Apartment">Buy Flat / Apartment</option>
                      <option value="Turnkey House Construction">Turnkey House Construction</option>
                      <option value="Sell Property">Sell / List Property</option>
                      <option value="Commercial Space">Commercial Shop / Office</option>
                      <option value="Book Free Site Visit">Book Free Site Visit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-ivory/80 font-medium mb-1">Message / Requirements</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about preferred locality, budget range, or plot size..."
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark text-charcoal font-bold text-sm shadow-gold hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting to CRM...' : 'Send Message to Director Umesh Yadav'}</span>
                </button>
              </form>
            </div>

            {/* Office Guidance Right (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-charcoal-100 lg:pl-8 pt-6 lg:pt-0">
              <h3 className="font-serif font-bold text-xl text-ivory">
                Finding Our Pandeypur Office
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed">
                We are conveniently located right at Pandeypur Chauraha, one of Varanasi&apos;s central commercial junctions connecting Cantt, Ashapur, and Ring Road.
              </p>

              <div className="space-y-3 text-xs text-ivory/80">
                <div className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-1">
                  <div className="font-semibold text-ivory">From Cantt Railway Station:</div>
                  <div className="text-ivory/60 text-[11px]">Approximately 4.5 km via Orderly Bazar / District Jail road (15 mins).</div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-1">
                  <div className="font-semibold text-ivory">From Babatpur Airport:</div>
                  <div className="text-ivory/60 text-[11px]">Approximately 22 km via 4-lane Airport Expressway and Shivpur bypass.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-1">
                  <div className="font-semibold text-ivory">From Sarnath Heritage Area:</div>
                  <div className="text-ivory/60 text-[11px]">Approximately 3.5 km straight via Ashapur road (10 mins).</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold">
                <strong>Complimentary Customer Pick-Up:</strong> For prospective home buyers visiting Varanasi from outside the city, we arrange complimentary pick-up from Cantt Railway Station or Airport for property site inspections.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
