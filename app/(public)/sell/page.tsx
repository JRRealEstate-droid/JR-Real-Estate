'use client';

import React, { useState } from 'react';
import { submitSellProperty } from '@/app/actions/leads';
import { BRAND, VARANASI_LOCALITIES, PROPERTY_CATEGORIES } from '@/lib/constants';
import { Building2, CheckCircle2, ShieldCheck, AlertCircle, Send, Phone, Lock } from 'lucide-react';

export default function SellPropertyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; referenceCode?: string; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitSellProperty(formData);
    setResult(res);
    setSubmitting(false);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Property Owner &amp; Seller Desk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            List or Sell Your Property in Varanasi
          </h1>

          <p className="text-sm text-ivory/70 max-w-2xl mx-auto leading-relaxed">
            Connect directly with verified families and genuine buyers. JR Real Estate ensures genuine valuation, document safety, and transparent negotiation for plots, homes, and commercial spaces.
          </p>
        </div>

        {/* Value Props Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-charcoal-200 border border-charcoal-100 flex items-start gap-3">
            <Lock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory block font-semibold">Privacy Protected:</strong>
              <span className="text-ivory/60">Your phone number is never shared publicly or spammed by brokers.</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-200 border border-charcoal-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory block font-semibold">Verified Buyers Only:</strong>
              <span className="text-ivory/60">We conduct pre-screened site visits with serious buyers ready with finance.</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-200 border border-charcoal-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory block font-semibold">Registry Legal Support:</strong>
              <span className="text-ivory/60">End-to-end guidance through Tehsil registry, token escrow, and mutation.</span>
            </div>
          </div>
        </div>

        {/* Seller Form Box */}
        <div className="bg-charcoal-200 border border-gold/40 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="border-b border-charcoal-100 pb-4">
            <h2 className="font-serif font-bold text-xl text-ivory">
              Property Submission Form
            </h2>
            <p className="text-xs text-ivory/60 mt-1">
              Provide basic property details. Our Pandeypur office will contact you to schedule an on-site physical evaluation.
            </p>
          </div>

          {result?.success && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{result.message}</p>
                <p className="text-[11px] text-emerald-200 mt-1">
                  Submission Reference Code: <strong className="font-mono text-white">{result.referenceCode}</strong>.
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
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-ivory/80 font-medium mb-1">
                  Owner / Representative Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Umesh Yadav"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Property Type & Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-ivory/80 font-medium mb-1">
                  Property Category *
                </label>
                <select
                  name="propertyType"
                  required
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                >
                  {PROPERTY_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">
                  Locality in Varanasi *
                </label>
                <select
                  name="locality"
                  required
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                >
                  {VARANASI_LOCALITIES.map((l) => (
                    <option key={l.slug} value={l.name}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expected Price & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-ivory/80 font-medium mb-1">
                  Expected Asking Price (in ₹) *
                </label>
                <input
                  type="text"
                  name="expectedPrice"
                  required
                  placeholder="e.g. ₹ 45 Lakh or ₹ 1.2 Crore"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">
                  Area / Plot Dimension *
                </label>
                <input
                  type="text"
                  name="area"
                  required
                  placeholder="e.g. 1360 sq.ft or 2 Biswa"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-ivory/80 font-medium mb-1">
                Property Address &amp; Nearest Landmark *
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="Colony name, lane number, landmark..."
                className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
              />
            </div>

            {/* Additional details */}
            <div>
              <label className="block text-ivory/80 font-medium mb-1">
                Property Features &amp; Ownership Status
              </label>
              <textarea
                name="details"
                rows={3}
                placeholder="Mention road width (e.g. 25ft, 30ft), facing (East/North), registry status (Freehold / Ancestral), or existing construction..."
                className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark text-charcoal font-bold text-sm shadow-gold hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting to CRM...' : 'Submit Property for Listing'}</span>
            </button>

            <div className="pt-2 text-center text-[11px] text-ivory/60">
              Prefer speaking directly? Call Director Umesh Yadav at{' '}
              <a href={`tel:${BRAND.phone}`} className="text-gold font-bold hover:underline">
                +91 {BRAND.phone}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

