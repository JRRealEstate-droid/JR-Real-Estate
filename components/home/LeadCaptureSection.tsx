'use client';

import React, { useState } from 'react';
import { submitGeneralContact } from '@/app/actions/leads';
import { BRAND, VARANASI_LOCALITIES } from '@/lib/constants';
import { Send, CheckCircle2, Phone, MapPin, Clock, AlertCircle } from 'lucide-react';
import { BanarasiMedallion, BanarasiCornerAccent } from '@/components/ui/KashiMotifs';

export function LeadCaptureSection() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; referenceCode?: string; error?: string } | null>(null);

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
    <section className="py-20 bg-charcoal-300 border-t border-charcoal-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-charcoal-200 via-charcoal-100 to-charcoal-200 border border-gold/40 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
          <BanarasiCornerAccent position="top-right" />
          <BanarasiCornerAccent position="bottom-left" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
                <BanarasiMedallion size={13} />
                <span>Complimentary Consultation &amp; Site Visit</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory leading-tight">
                Connect with Varanasi&apos;s Real Estate Specialists
              </h2>

              <p className="text-sm text-ivory/80 leading-relaxed">
                Whether you are buying a plot, searching for a family apartment, or planning a turnkey home build, our team at Pandeypur Chauraha will provide verified options tailored to your exact budget.
              </p>

              <div className="space-y-4 pt-2 text-xs text-ivory/80">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-charcoal-300/80 border border-charcoal-100">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-ivory/50 uppercase">Direct Helpline</div>
                    <div className="font-semibold text-ivory text-sm">+91 {BRAND.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-charcoal-300/80 border border-charcoal-100">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-ivory/50 uppercase">Central Office</div>
                    <div className="font-medium text-ivory text-xs">{BRAND.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-charcoal-300/80 border border-charcoal-100">
                  <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-ivory/50 uppercase">Working Hours</div>
                    <div className="font-medium text-ivory text-xs">{BRAND.officeHours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-charcoal-300/95 border border-charcoal-50 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="border-b border-charcoal-100 pb-3">
                  <h3 className="font-serif font-bold text-lg text-ivory">
                    Request a Call Back or Free Site Visit
                  </h3>
                  <p className="text-xs text-ivory/60">
                    Our team responds within 15 to 30 minutes during Varanasi business hours.
                  </p>
                </div>

                {result?.success && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-semibold">{result.message}</p>
                      <p className="mt-1 text-[11px] text-emerald-200">
                        Reference Ticket: <strong className="font-mono text-white">{result.referenceCode}</strong>. Saved to CRM.
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ivory/80 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Anand Mishra"
                      className="w-full bg-charcoal-200 border border-charcoal-100 rounded-lg px-3.5 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ivory/80 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      className="w-full bg-charcoal-200 border border-charcoal-100 rounded-lg px-3.5 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ivory/80 mb-1">
                      Preferred Varanasi Locality
                    </label>
                    <select
                      name="preferredLocality"
                      className="w-full bg-charcoal-200 border border-charcoal-100 rounded-lg px-3.5 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="">Any Locality in Varanasi</option>
                      {VARANASI_LOCALITIES.map((loc) => (
                        <option key={loc.slug} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ivory/80 mb-1">
                      Requirement Type
                    </label>
                    <select
                      name="requirementType"
                      className="w-full bg-charcoal-200 border border-charcoal-100 rounded-lg px-3.5 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="Buy Plot / Land">Buy Plot / Land</option>
                      <option value="Buy 2/3 BHK Flat">Buy 2/3 BHK Flat</option>
                      <option value="Buy Villa / Independent House">Buy Villa / Independent House</option>
                      <option value="Turnkey Home Construction">Turnkey Home Construction</option>
                      <option value="Commercial Shop / Space">Commercial Shop / Space</option>
                      <option value="Schedule Physical Site Inspection">Schedule Physical Site Inspection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ivory/80 mb-1">
                    Specific Requirements or Budget Details
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us what you are looking for (e.g. 1500 sq.ft plot near Pandeypur/Shivpur with 30ft road, budget ₹45 Lakhs)..."
                    className="w-full bg-charcoal-200 border border-charcoal-100 rounded-lg px-3.5 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark hover:brightness-105 active:scale-[0.99] text-charcoal font-bold text-xs tracking-wider uppercase transition-all shadow-gold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting to CRM...' : 'Request Free Consultation & Site Visit'}</span>
                </button>

                <p className="text-[10px] text-ivory/50 text-center">
                  🔒 We respect your privacy. Your phone number is never shared with third-party brokers.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
