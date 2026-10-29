import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal Disclaimer | JR Real Estate Varanasi',
  description: 'Legal disclaimers on property pricing, RERA compliance, and construction estimates.',
};

export default function DisclaimerPage() {
  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-ivory/60">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-gold">Legal Disclaimer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            Legal &amp; Regulatory Disclaimer
          </h1>
          <p className="text-xs text-ivory/60">
            Official Consumer Notice &bull; JR Real Estate Varanasi
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Important Notice for Property Buyers &amp; Investors:</strong>
            Do not make cash or digital token payments to any third party without physical site verification, title deed inspection (Barah-Sala / Khatauni), and direct meeting with Director Mr. Umesh Yadav at our registered office at S9/90A, Pandeypur Chauraha, Varanasi.
          </div>
        </div>

        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 sm:p-10 text-xs sm:text-sm text-ivory/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">1. Property Information &amp; Price Confirmation</h2>
            <p>
              Information on plots, flats, and commercial properties on this website is for guidance and promotional facilitation only. Prices, carpet areas, road widths, and possession dates are subject to periodic change and must be verified against authentic revenue documents and physical demarcation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">2. RERA &amp; Statutory Approvals Disclaimer</h2>
            <p>
              For multi-storey builder projects and plotted townships, buyers are advised to independently check the registration status, approved sanction drawings, and quarterly compliance reports on the official Real Estate Regulatory Authority portal (up-rera.in). JR Real Estate facilitates developer inventory and does not warrant unverified statutory claims.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">3. Turnkey Construction Rates &amp; Specifications</h2>
            <p>
              Package rates (Standard, Premium, Luxury) displayed on our construction pages are indicative references calculated on standard plinth conditions. Exact execution costs vary according to foundation depth, architectural 3D elevations, soil bearing capacity, and client-approved finishing specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">4. Development Sample Listings Disclosure</h2>
            <p>
              In accordance with ethical developer standards, any development-only sample records used to demonstrate digital filtering or layout features are strictly labeled as &ldquo;Development Sample Listing&rdquo; and do not represent verified actual inventory.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">5. Independent Legal &amp; Financial Advice</h2>
            <p>
              Real estate investments involve financial and market considerations. Buyers and sellers should obtain independent legal, tax, and structural advice before executing sale deeds, agreements to sell, or construction contracts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

