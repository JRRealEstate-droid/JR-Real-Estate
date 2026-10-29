import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';
import { BRAND, VARANASI_LOCALITIES } from '@/lib/constants';
import { MapPin, Phone, Mail, Globe, ShieldAlert } from 'lucide-react';
import { VaranasiGhatsSilhouette, BanarasiMedallion } from '@/components/ui/KashiMotifs';

export function Footer() {
  return (
    <footer className="relative bg-charcoal-400 border-t border-charcoal-100 text-ivory/80 pt-0 pb-24 md:pb-12 overflow-hidden">
      {/* 1. Authentic Varanasi Riverfront Ghats Panoramic Skyline */}
      <div className="relative w-full overflow-hidden border-b border-charcoal-100 bg-charcoal-300">
        <div className="relative w-full h-32 sm:h-44 md:h-56">
          <Image
            src="/images/varanasi-river-ghat-panoramic.webp"
            alt="Authentic Varanasi Riverfront Ghats and Holy Ganga"
            fill
            sizes="100vw"
            unoptimized={true}
            className="object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-400 via-charcoal-400/60 to-charcoal/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal-400" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-4 space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal/80 border border-gold/40 text-gold text-xs font-semibold backdrop-blur-sm">
                <BanarasiMedallion size={13} />
                <span>काशी &bull; अविनाशी &bull; सर्वतीर्थमयी</span>
              </div>
              <p className="text-sm sm:text-base text-ivory font-serif font-semibold drop-shadow-md tracking-wide">
                Rooted Along the Sacred Banks of the Holy Ganga &bull; Varanasi
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-200">
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <div className="flex items-center gap-2 pt-1">
              <BanarasiMedallion size={14} />
              <p className="text-gold italic font-serif text-sm">
                &ldquo;{BRAND.tagline}&rdquo;
              </p>
            </div>
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
            <h4 className="font-serif font-bold text-ivory text-sm tracking-wider uppercase mb-4 text-gold flex items-center gap-1.5">
              <span>Properties</span>
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
                <Link href="/buy?category=PLOT_LAND" className="hover:text-gold transition-colors">Residential &amp; Commercial Plots</Link>
              </li>
              <li>
                <Link href="/buy?category=FLAT_APARTMENT" className="hover:text-gold transition-colors">2 &amp; 3 BHK Flats</Link>
              </li>
              <li>
                <Link href="/buy?category=VILLA_HOUSE" className="hover:text-gold transition-colors">Independent Kothi &amp; Villas</Link>
              </li>
            </ul>
          </div>

          {/* Construction & Services */}
          <div>
            <h4 className="font-serif font-bold text-ivory text-sm tracking-wider uppercase mb-4 text-gold flex items-center gap-1.5">
              <span>Services &amp; Guides</span>
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
                <Link href="/services#mutation" className="hover:text-gold transition-colors">Registry &amp; Dakhil Kharij</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold transition-colors">Our Construction Portfolio</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">Varanasi Real Estate Guides</Link>
              </li>
            </ul>
          </div>

          {/* Key Localities */}
          <div>
            <h4 className="font-serif font-bold text-ivory text-sm tracking-wider uppercase mb-4 text-gold flex items-center gap-1.5">
              <span>Localities Served</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {VARANASI_LOCALITIES.slice(0, 7).map((loc) => (
                <li key={loc.slug}>
                  <Link href={`/buy?locality=${loc.slug}`} className="hover:text-gold transition-colors">
                    Properties in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Regulatory Disclaimer */}
        <div className="pt-8 pb-4 text-[11px] text-ivory/50 space-y-2 leading-relaxed">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <p>
              <strong>Legal Disclaimer:</strong> Information, dimensions, pricing, and availability displayed on this website are indicative and subject to physical verification and mutual agreement. We encourage all buyers to review legal deeds, encumbrance certificates (Barah-Sala), and municipal/VDA sanction documents prior to financial transactions. RERA registration details are verified per applicable state guidelines.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-charcoal-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <div>
            &copy; {new Date().getFullYear()} JR Real Estate Varanasi. All rights reserved. &bull; Director: Mr. Umesh Yadav.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-gold transition-colors">Disclaimer</Link>
            <Link href="/admin" className="text-gold/70 hover:text-gold transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
