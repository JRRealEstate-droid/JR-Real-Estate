import React from 'react';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import { MapPin, Phone, Scale, Building, Users, Clock } from 'lucide-react';
import { BanarasiMedallion, BanarasiCornerAccent, DiyaGlow } from '@/components/ui/KashiMotifs';

export function DirectorTrustSection() {
  return (
    <section className="py-20 bg-charcoal-300 border-b border-charcoal-100 relative overflow-hidden">
      {/* Subtle Banarasi Pattern Background */}
      <div className="absolute inset-0 bg-banarasi-pattern opacity-40 pointer-events-none" />
      <DiyaGlow className="bottom-10 left-10 w-96 h-96" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Office & Leadership Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-gold/40 bg-charcoal-200/95 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
              <BanarasiCornerAccent position="top-right" />
              <BanarasiCornerAccent position="bottom-left" />

              {/* Official Brand Seal Logo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-gold/80 ring-offset-2 ring-offset-charcoal shadow-gold-lg mb-6 bg-charcoal">
                <Image
                  src="/images/jr-logo.jpg"
                  alt="JR Real Estate Varanasi Official Seal"
                  fill
                  sizes="120px"
                  unoptimized={true}
                  className="object-cover object-center rounded-full"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BanarasiMedallion size={13} />
                  <span className="text-gold text-xs font-semibold uppercase tracking-[0.18em]">
                    Leadership &amp; Directorate
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory">
                  {BRAND.director}
                </h3>
                <p className="text-xs text-ivory/70">
                  Director &bull; JR Real Estate &amp; Construction Varanasi
                </p>
              </div>

              {/* Director's Personal Quote */}
              <div className="my-6 p-5 rounded-2xl bg-charcoal-300/90 border-l-4 border-gold text-xs text-ivory/85 italic leading-relaxed shadow-inner">
                &ldquo;Real estate in Varanasi is not just a commercial transaction; it is a family&apos;s lifelong dream and sacred security. Our pledge at Pandeypur Chauraha is to bring genuine revenue transparency, physical site validation, and honest construction engineering to every client.&rdquo;
              </div>

              <div className="space-y-3 pt-2 text-xs border-t border-charcoal-100/80 text-ivory/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>Head Office: {BRAND.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <a href={`tel:${BRAND.phone}`} className="text-gold font-bold hover:underline">
                    Direct Line: +91 {BRAND.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-ivory/70">Office Hours: {BRAND.officeHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grounded in Kashi Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BanarasiMedallion size={15} />
                <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  Rooted in Varanasi &bull; Built on Integrity
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory mt-1 leading-tight">
                Why Families &amp; Investors Across Eastern UP Trust JR Real Estate
              </h2>
              <p className="text-sm text-ivory/75 mt-3 leading-relaxed">
                For centuries, Kashi has stood as a civilization founded on trust, timeless relationships, and honouring one&apos;s word. We carry forward that local ethos by combining deep grassroots knowledge of Varanasi land registries with modern architectural and engineering standards.
              </p>
            </div>

            {/* Visual Panel: Authentic Architectural Stone Masonry */}
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-charcoal-100 shadow-xl my-4">
              <Image
                src="/images/kashi-varanasi-boats.png"
                alt="Iconic painted wooden boats on the Ganga riverbank against ancient Varanasi stone architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                unoptimized={true}
                className="object-cover object-center filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-ivory/90 font-medium">
                <span className="italic font-serif">Timeless Craft &bull; Enduring Foundations</span>
                <span className="text-gold font-mono uppercase tracking-wider text-[10px]">Varanasi Heritage</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-charcoal-200/90 border border-charcoal-100 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-charcoal-300 border border-gold/30 flex items-center justify-center text-gold">
                  <Scale className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-ivory">
                  Revenue Title Clearance
                </h4>
                <p className="text-[11px] text-ivory/65 leading-relaxed">
                  Rigorous verification of Khatauni, Khasra, 12-year encumbrance search, and Tehsil mutation before listing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-200/90 border border-charcoal-100 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-charcoal-300 border border-gold/30 flex items-center justify-center text-gold">
                  <Building className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-ivory">
                  Under One Roof
                </h4>
                <p className="text-[11px] text-ivory/65 leading-relaxed">
                  Land purchase, boundary walling, registry, VDA map sanction, architectural drawings, and home building.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-200/90 border border-charcoal-100 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-charcoal-300 border border-gold/30 flex items-center justify-center text-gold">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-ivory">
                  Personal Site Escort
                </h4>
                <p className="text-[11px] text-ivory/65 leading-relaxed">
                  Direct chauffeur-assisted site inspection with physical boundary pegging and neighborhood surveys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
