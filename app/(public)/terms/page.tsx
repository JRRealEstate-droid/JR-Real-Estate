import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | JR Real Estate Varanasi',
  description: 'Terms and conditions governing the use of JR Real Estate Varanasi web platform.',
};

export default function TermsPage() {
  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-ivory/60">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-gold">Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            Terms of Service
          </h1>
          <p className="text-xs text-ivory/60">
            Effective Date: January 2026 &bull; JR Real Estate Varanasi
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Statutory Compliance Note:</strong>
            These Terms of Service are drafted for operational clarity and must be formally verified by legal counsel prior to formal execution of binding property agreements or civil contracting contracts.
          </div>
        </div>

        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 sm:p-10 text-xs sm:text-sm text-ivory/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website (jrrealestate.in), you acknowledge and agree to comply with the terms and conditions outlined herein. If you disagree with any part of these terms, please refrain from using the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">2. Nature of Platform &amp; Facilitation Role</h2>
            <p>
              JR Real Estate operates as a professional real estate consultancy and turnkey construction contractor in Varanasi. The website serves as an informational and lead coordination portal. No digital browsing activity constitutes a binding sale contract, allotment, or transfer of immovable property.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">3. Property Listings &amp; Pricing Accuracy</h2>
            <p>
              All property descriptions, prices, square footage, carpet dimensions, and amenities are subject to physical site inspection and owner confirmation. Circle rates and stamp duty calculations represent reference estimates based on current District Magistrate schedules and must be verified at the relevant Sub-Registrar office prior to registry execution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">4. Construction Estimates Non-Binding Status</h2>
            <p>
              Calculations generated via our interactive construction cost estimator represent preliminary budgetary indicators. Final construction agreements require a formal site soil investigation, structural engineer architectural drawing sanction, and an executed Bill of Quantities (BOQ).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">5. Jurisdiction</h2>
            <p>
              Any disputes arising from services or interactions through this platform shall be subject to the exclusive jurisdiction of the competent courts in Varanasi, Uttar Pradesh, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

