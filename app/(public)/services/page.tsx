import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import {
  Building2,
  FileCheck2,
  Scale,
  Landmark,
  BadgePercent,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Real Estate & Builder Services in Varanasi | JR Real Estate',
  description:
    'Comprehensive property documentation, VDA map sanctioning, registry assistance, mutation (Dakhil Kharij), home loans, and turnkey architectural contracting in Varanasi.',
};

const SERVICES = [
  {
    icon: FileCheck2,
    title: 'VDA Map Approval & Architectural Sanctioning',
    description:
      'Liaisoning with Varanasi Development Authority (VDA) and municipal corporations for building layout approval, structural NOC, and height clearance.',
    points: ['2D Floor Plans & Elevation Design', 'Structural Stability Certificate', 'Zoning & Masterplan Conformity'],
  },
  {
    icon: Scale,
    title: 'Property Registry & Legal Title Search',
    description:
      'Rigorous 30-year Barah-Sala title verification, encumbrance checking, official circle rate estimation, and Tehsil sub-registrar documentation assistance.',
    points: ['Khasra & Khatauni Revenue Records', 'Clear Title Verification Report', 'Stamp Duty & Registry Escrow Coordination'],
  },
  {
    icon: Landmark,
    title: 'Tehsil Mutation (Dakhil Kharij) & Nagar Nigam Transfer',
    description:
      'Complete post-registration revenue mutation in official UP Bhulekh records and municipal house tax assessment transfer into the buyer’s name.',
    points: ['Tehsil Revenue Court Follow-up', 'Parivar Register & Khatauni Entry', 'Nagar Nigam Tax Mutation'],
  },
  {
    icon: BadgePercent,
    title: 'Home Loan Assistance & Bank Liaison',
    description:
      'Tie-ups with leading nationalized and private banks (SBI, HDFC, ICICI, Bank of Baroda) for fastest sanction with competitive interest rates and minimal paperwork.',
    points: ['Pre-approved Project Properties', 'Plot Purchase + Construction Composite Loan', 'Prompt Legal & Technical Valuation'],
  },
  {
    icon: Building2,
    title: 'Turnkey Architectural Construction',
    description:
      'From excavation and RCC framing to modern interior handover, executed by qualified site engineers using certified branded materials (Tata Tiscon, Ultratech).',
    points: ['Milestone-Based Escrow Billing', 'CCTV & Drone Progress Updates', 'Anti-Efflorescence Monsoon Waterproofing'],
  },
  {
    icon: ShieldCheck,
    title: 'Property Valuation & Investment Advisory',
    description:
      'Professional comparative market analysis and rental yield projection for individual plot owners, builders, and institutional investors in Varanasi.',
    points: ['Corridor Growth Analysis', 'Fair Market Value Reports', 'Exit Strategy Planning'],
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Complete Real Estate &amp; Construction Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Our Real Estate &amp; Builder Services
          </h1>

          <p className="text-sm text-ivory/70 leading-relaxed">
            JR Real Estate eliminates the friction and uncertainty of Varanasi property transactions by providing legal, municipal, financial, and construction services under one roof.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 hover:border-gold/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-charcoal-300 border border-gold/30 text-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-ivory group-hover:text-gold transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-xs text-ivory/70 mt-2.5 leading-relaxed">
                    {s.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-charcoal-100/70 space-y-2">
                    {s.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-ivory/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal-100">
                  <Link
                    href={`/contact?service=${encodeURIComponent(s.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light transition-colors"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout */}
        <div className="bg-gradient-to-r from-charcoal-200 via-charcoal-100 to-charcoal-200 border border-gold/40 rounded-2xl p-8 text-center space-y-4">
          <h2 className="font-serif font-bold text-2xl text-ivory">
            Need Expert Assistance with a Specific Property Issue?
          </h2>
          <p className="text-xs text-ivory/70 max-w-xl mx-auto">
            Visit our office at S9/90A, Pandeypur Chauraha or schedule a consultation with Director Umesh Yadav.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors"
            >
              <Phone className="w-4 h-4 fill-charcoal" />
              <span>Call Helpline: +91 {BRAND.phone}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-charcoal-300 border border-charcoal-100 text-ivory font-semibold text-xs hover:border-gold/40 transition-colors"
            >
              <span>Book Office Meeting</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
