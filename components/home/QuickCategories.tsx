import React from 'react';
import Link from 'next/link';
import { MapPin, Building2, Home, Store, KeyRound, Sparkles, Compass } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    title: 'Plots & Land',
    count: 'VDA & Freehold',
    href: '/buy?category=PLOT_LAND',
    icon: MapPin,
    description: 'Demarcated plots in Pandeypur, Shivpur, Babatpur Highway & Ring Road.',
  },
  {
    title: 'Flats & Homes',
    count: '2, 3 & 4 BHK',
    href: '/buy?category=FLAT_APARTMENT',
    icon: Building2,
    description: 'Ready-to-move and under-construction modern apartments in gated communities.',
  },
  {
    title: 'Commercial',
    count: 'Shops & Offices',
    href: '/buy?category=COMMERCIAL_SHOP',
    icon: Store,
    description: 'High-footfall shops and retail spaces in Orderly Bazar, Sigra & Pandeypur.',
  },
  {
    title: 'Villas & Kothi',
    count: 'Independent Living',
    href: '/buy?category=VILLA_HOUSE',
    icon: Home,
    description: 'Luxury duplexes and independent houses with private car parking & terrace.',
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
    description: 'Family homes and corporate office spaces available for monthly lease.',
  },
  {
    title: 'Turnkey Construction',
    count: 'From ₹ 1,550/sq.ft',
    href: '/construction',
    icon: Compass,
    description: 'End-to-end architectural design, RCC structure, and finishing on your plot.',
  },
];

export function QuickCategories() {
  return (
    <section className="py-16 bg-charcoal-400 border-b border-charcoal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-gold uppercase tracking-wider text-xs font-semibold">
              Browse by Real Estate Segment
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory mt-1">
              Explore Varanasi Real Estate
            </h2>
          </div>
          <Link
            href="/buy"
            className="text-xs font-semibold text-gold hover:text-gold-light transition-colors flex items-center gap-1 group"
          >
            <span>View All Listings</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group p-5 rounded-xl bg-charcoal-200/80 border border-charcoal-100 hover:border-gold/40 hover:bg-charcoal-100 transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-charcoal-300 border border-gold/20 text-gold flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-gold/60 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-ivory group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ivory/60 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-charcoal-100/60 flex items-center justify-between text-xs">
                  <span className="text-gold font-medium">{item.count}</span>
                  <span className="text-ivory/50 group-hover:text-gold transition-colors font-bold">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

