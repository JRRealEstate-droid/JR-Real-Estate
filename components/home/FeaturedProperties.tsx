'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { SampleProperty } from '@/lib/data/sample-data';
import { ArrowRight } from 'lucide-react';
import { BanarasiMedallion } from '@/components/ui/KashiMotifs';

interface FeaturedPropertiesProps {
  properties: SampleProperty[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = properties.filter((p) => {
    if (activeFilter === 'ALL') return true;
    return p.category === activeFilter;
  });

  return (
    <section className="py-20 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-[0.18em] mb-2">
              <BanarasiMedallion size={14} />
              <span>Handpicked Prime Real Estate &bull; Verified</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
              Featured Properties in Varanasi
            </h2>
            <p className="text-sm text-ivory/70 mt-2 max-w-xl">
              Verified residential plots, luxury apartments, and ready-to-move kothis across prime Varanasi corridors.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'All Prime' },
              { id: 'PLOT_LAND', label: 'Plots & Land' },
              { id: 'FLAT_APARTMENT', label: 'Flats' },
              { id: 'VILLA_HOUSE', label: 'Villas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-gold text-charcoal shadow-gold'
                    : 'bg-charcoal-200 text-ivory/80 hover:text-gold hover:bg-charcoal-100 border border-charcoal-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-charcoal-200 rounded-xl border border-charcoal-100 p-8">
            <p className="text-ivory/70 text-sm">No properties in this category currently featured.</p>
            <Link href="/buy" className="mt-4 inline-block text-gold text-xs font-semibold underline">
              Browse all available listings &rarr;
            </Link>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all font-semibold text-sm shadow-md"
          >
            <span>Explore All Properties in Varanasi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

