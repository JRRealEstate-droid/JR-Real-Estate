import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { ShieldCheck, MapPin, Phone, Award, Users, CheckCircle2, Building, Scale } from 'lucide-react';

export function DirectorTrustSection() {
  return (
    <section className="py-20 bg-charcoal-300 border-b border-charcoal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Office & Leadership Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-gold/30 bg-charcoal-200 p-8 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold to-gold-light p-[2px] mb-6 shadow-gold">
                <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center font-serif text-xl font-bold text-gold">
                  UY
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                  Leadership &amp; Directorate
                </span>
                <h3 className="text-2xl font-serif font-bold text-ivory">
                  {BRAND.director}
                </h3>
                <p className="text-xs text-ivory/70">
                  Director, JR Real Estate &amp; Construction Varanasi
                </p>
              </div>

              <div className="my-6 p-4 rounded-xl bg-charcoal-300 border-l-4 border-gold text-xs text-ivory/80 italic leading-relaxed">
                &ldquo;Real estate in Varanasi is not just a commercial transaction; it is a family&apos;s lifelong dream and hard-earned security. Our commitment at Pandeypur Chauraha is to bring genuine legal transparency, physical site validation, and honest construction engineering to every client.&rdquo;
              </div>

              <div className="space-y-3 pt-2 text-xs border-t border-charcoal-100 text-ivory/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Head Office: {BRAND.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <a href={`tel:${BRAND.phone}`} className="text-gold font-bold hover:underline">
                    Direct Line: +91 {BRAND.phone}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-100/60 flex items-center justify-between text-xs">
                <span className="text-ivory/60">Office Hours</span>
                <span className="text-ivory font-semibold">{BRAND.officeHours}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Why Choose JR Real Estate */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-gold uppercase tracking-wider text-xs font-semibold">
                Grounded in Kashi &bull; Built on Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory mt-1">
                Why Families &amp; Investors Trust JR Real Estate
              </h2>
              <p className="text-sm text-ivory/70 mt-2">
                We combine deep grassroots knowledge of Varanasi revenue records with modern engineering standards to ensure your investment is secure and legally sound.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="p-5 rounded-xl bg-charcoal-200 border border-charcoal-100 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-charcoal-100 border border-gold/30 flex items-center justify-center text-gold">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-ivory">
                  Title &amp; Revenue Clearance
                </h4>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  Rigorous verification of Khatauni, Khasra, Barah-Sala encumbrance reports, and municipal status before offering any plot.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-charcoal-200 border border-charcoal-100 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-charcoal-100 border border-gold/30 flex items-center justify-center text-gold">
                  <Building className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-ivory">
                  Under One Roof Solutions
                </h4>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  From finding land, registry documentation, and mutation (Dakhil Kharij) to turnkey home construction and bank home loan sanctioning.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-charcoal-200 border border-charcoal-100 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-charcoal-100 border border-gold/30 flex items-center justify-center text-gold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-ivory">
                  Dedicated CRM &amp; Site Visits
                </h4>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  Free pick-and-drop site visits across Varanasi with dedicated relationship executives who respect your budget and time.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-charcoal-200 border border-charcoal-100 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-charcoal-100 border border-gold/30 flex items-center justify-center text-gold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-ivory">
                  Zero False Claims
                </h4>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  No misleading RERA claims, fake inventory, or hidden commissions. Every detail is physically verified on-site.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
              >
                <span>Read more about our leadership &amp; journey</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
