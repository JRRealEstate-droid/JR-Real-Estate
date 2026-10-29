import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { BRAND, VARANASI_LOCALITIES } from '@/lib/constants';
import { MapPin, Phone, Mail, Globe, ShieldAlert, Award, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal-400 border-t border-charcoal-100 text-ivory/80 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-200">
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-gold italic font-serif text-sm">
              &ldquo;{BRAND.tagline}&rdquo;
            </p>
            <p className="text-xs text-ivory/70 leading-relaxed max-w-sm">
              JR Real Estate Varanasi is your trusted local partner for residential plots, premium apartments, independent villas, commercial spaces, and turnkey home construction across prime growth corridors in Varanasi.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-ivory/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{BRAND.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-gold transition-colors font-semibold">
                  +91 {BRAND.phone} (Director: {BRAND.director})
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-gold transition-colors">
                  {BRAND.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={BRAND.website} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  {BRAND.website}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-ivory text-sm tracking-wider uppercase mb-4 text-gold">
              Properties
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/buy" className="hover:text-gold transition-colors">Buy Property in Varanasi</Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-gold transition-colors">Rent / Commercial Lease</Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-gold transition-colors">Sell / List Your Property</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-gold transition-colors">New Builder Projects</Link>
              </li>
              <li>
                <Link href="/properties?category=PLOT_LAND" className="hover:text-gold transition-colors">Residential & Commercial Plots</Link>
              </li>
              <li>
                <Link href="/properties?category=FLAT_APARTMENT" className="hover:text-gold transition-colors">2 & 3 BHK Flats</Link>
              </li>
              <li>
                <Link href="/properties?category=VILLA_HOUSE" className="hover:text-gold transition-colors">Independent Kothi & Villas</Link>
              </li>
            </ul>
          </div>

          {/* Construction & Services */}
          <div>
            <h4 className="font-serif font-bold text-ivory text-sm tracking-wider uppercase mb-4 text-gold">
              Services & Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/construction" className="hover:text-gold transition-colors">Turnkey Home Construction</Link>
              </li>
              <li>
                <Link href="/construction#estimator" className="hover:text-gold transition-colors">Cost Estimator (Indicative)</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">VDA Map Approval Liaison</Link>
              </li>
              <li>
                <Link href="/services#mutation" className="hover:text-gold transition-colors">Registry & Dakhil Kharij</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold transition-colors">Our Construction Portfolio</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">Varanasi Real Estate Guides</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">About Mr. Umesh Yadav</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">Schedule Office Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Localities Served in Varanasi */}
          <div>
            <h4 className="font-serif font-bold text-ivory text-sm tracking-wider uppercase mb-4 text-gold">
              Prime Localities
            </h4>
            <ul className="space-y-1.5 text-xs">
              {VARANASI_LOCALITIES.slice(0, 8).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/buy?locality=${loc.slug}`}
                    className="hover:text-gold transition-colors flex items-center justify-between"
                  >
                    <span>{loc.name}</span>
                    <span className="text-[10px] text-ivory/40">{loc.pincode}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers & Professional Compliance */}
        <div className="py-6 border-b border-charcoal-200 text-[11px] text-ivory/60 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-gold font-medium">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>Important Legal Disclaimers & Consumer Notice</span>
          </div>
          <p>
            All property specifications, prices, plot dimensions, and availability are subject to physical site verification, owner confirmation, and contract execution. Listed indicative construction estimates and circle rates represent estimated reference figures only and do not constitute a binding legal quote or financial guarantee.
          </p>
          <p>
            JR Real Estate operates as a professional facilitation and construction entity in Varanasi, Uttar Pradesh. Buyers are advised to independently verify revenue records, encumbrances, title deeds, and relevant VDA (Varanasi Development Authority) or RERA statutory clearances before entering into financial agreements.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <div>
            &copy; {new Date().getFullYear()} JR Real Estate Varanasi. All Rights Reserved. Director: Mr. Umesh Yadav.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="/disclaimer" className="hover:text-gold transition-colors">Legal Disclaimer</Link>
            <span>&bull;</span>
            <Link href="/admin" className="text-gold hover:underline font-medium">Admin & CRM Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
