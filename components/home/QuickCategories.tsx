import React from 'react';
import Link from 'next/link';
import { MapPin, Building2, Home, Store, KeyRound, Sparkles, Compass } from 'lucide-react';
import { BanarasiMedallion, BanarasiCornerAccent } from '@/components/ui/KashiMotifs';

const CATEGORY_ITEMS = [
  {
    title: 'Plots & Land',
    count: 'VDA & Freehold',
    href: '/buy?category=PLOT_LAND',
    icon: MapPin,
    description: 'Demarcated residential & commercial plots in Pandeypur, Shivpur, Babatpur Highway & Ring Road.',
  },
  {
    title: 'Flats & Homes',
    count: '2, 3 & 4 BHK',
    href: '/buy?category=FLAT_APARTMENT',
    icon: Building2,
    description: 'Ready-to-move and under-construction modern apartments in secure gated societies.',
  },
  {
    title: 'Commercial',
    count: 'Shops & Offices',
    href: '/buy?category=COMMERCIAL_SHOP',
    icon: Store,
    description: 'High-footfall shops and retail spaces in Orderly Bazar, Sigra, Paharia & Pandeypur.',
  },
  {
    title: 'Villas & Kothi',
    count: 'Independent Living',
    href: '/buy?category=VILLA_HOUSE',
    icon: Home,
    description: 'Luxury duplexes and independent houses with private car parking, terrace & puja space.',
  },
  {
    title: 'New Projects',
    count: 'Masterplan Living',
    href: '/projects',
    icon: Sparkles,
    description: 'Townships and multi-storey builder developments with modern lifestyle amenities.',
  },
  {
    title: 'Rent & Lease',
    count: 'Verified Listings',
    href: '/rent',
    icon: KeyRound,
    description: 'Verified family homes and commercial showrooms available for long-term lease.',
  },
  {
    title: 'Turnkey Construction',
    count: 'From ₹ 1,550/sq.ft',
    href: '/construction',
    icon: Compass,
    description: 'Architectural planning, VDA map sanctioning, and seismic-compliant RCC construction on your plot.',
  },
];

export function QuickCategories() {
  return (
    <section className="py-20 bg-charcoal-400 bg-banarasi-pattern border-b border-charcoal-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <BanarasiMedallion size={14} />
              <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                Curated Segments Across Varanasi
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
              Explore Properties by Category
            </h2>
            <p className="text-sm text-ivory/70 mt-1 max-w-xl">
              From historic inner-city localities to expanding Varanasi bypass corridors.
            </p>
          </div>
          <Link
            href="/buy"
            className="text-xs font-semibold text-gold hover:text-gold-light transition-colors flex items-center gap-1.5 group self-start sm:self-end"
          >
            <span>View All Listings</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {CATEGORY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative p-6 rounded-2xl bg-charcoal-200/90 border border-charcoal-100 hover:border-gold/50 hover:bg-charcoal-100 transition-all duration-300 shadow-md hover:shadow-gold/10 flex flex-col justify-between overflow-hidden"
              >
                <BanarasiCornerAccent position="top-right" />
                <div>
                  <div className="w-12 h-12 rounded-xl bg-charcoal-300 border border-gold/25 text-gold flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-gold/60 transition-transform">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-ivory group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ivory/65 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-charcoal-100/70 flex items-center justify-between text-xs">
                  <span className="text-gold font-medium font-mono">{item.count}</span>
                  <span className="text-ivory/40 group-hover:text-gold transition-colors text-xs font-semibold">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
