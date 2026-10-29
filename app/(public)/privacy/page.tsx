import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | JR Real Estate Varanasi',
  description: 'Privacy policy and data protection disclosure for JR Real Estate Varanasi.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-ivory/60">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-gold">Privacy Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            Privacy Policy
          </h1>
          <p className="text-xs text-ivory/60">
            Last Updated: January 2026 &bull; JR Real Estate Varanasi
          </p>
        </div>

        {/* Legal Review Notice */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Statutory Review Notice:</strong>
            This privacy policy is an operational template prepared for website launch. All data collection, processing consent, and storage policies must be formally reviewed and ratified by a qualified legal professional under the Digital Personal Data Protection (DPDP) Act and applicable Indian consumer laws.
          </div>
        </div>

        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 sm:p-10 text-xs sm:text-sm text-ivory/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">1. Information We Collect</h2>
            <p>
              When you submit an enquiry, request a site visit, or register a property for sale on <strong>jrrealestate.in</strong>, we collect your name, phone number, email address, property preferences, and related notes. We do not collect sensitive biometric or banking PIN credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">2. Purpose of Data Processing</h2>
            <p>
              Your contact details are used exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-ivory/70">
              <li>Coordinate real estate site visits and property inspections in Varanasi.</li>
              <li>Provide requested brochures, circle rate assessments, and construction estimates.</li>
              <li>Facilitate direct communication between property sellers and pre-qualified buyers.</li>
              <li>Maintain internal CRM audit logs for service quality and fraud prevention.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">3. No Third-Party Spam or Sale of Data</h2>
            <p>
              JR Real Estate Varanasi strictly respects your privacy. We do not sell, rent, or trade your personal telephone numbers or email addresses to mass telemarketing databases or unverified third-party brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">4. Data Storage &amp; Security</h2>
            <p>
              CRM records are maintained on secure cloud infrastructure utilizing industry-standard access controls and server-side role authentication. Only authorized staff members assigned to your enquiry have access to your contact record.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-ivory">5. Contact Data Protection Officer</h2>
            <p>
              If you wish to update, review, or delete your contact information from our CRM, please contact:
            </p>
            <p className="text-gold font-medium">
              JR Real Estate Varanasi &bull; S9/90A, Pandeypur Chauraha, Varanasi &bull; Phone: +91 {BRAND.phone} &bull; Email: {BRAND.email}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
