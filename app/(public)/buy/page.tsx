import React from 'react';
import { Metadata } from 'next';
import { getProperties } from '@/lib/data/properties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertySearchFilter } from '@/components/properties/PropertySearchFilter';
import { BRAND } from '@/lib/constants';
import Link from 'next/link';
import { MapPin, ShieldAlert, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Buy Property in Varanasi | Verified Plots, Flats & Villas',
  description:
    'Search verified residential plots, luxury flats, independent houses, and commercial property for sale in Varanasi across Pandeypur, Shivpur, Sigra, Paharia, and Ring Road.',
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
    locality?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    query?: string;
    sort?: any;
    page?: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;
  const bedrooms = searchParams.bedrooms && searchParams.bedrooms !== 'ALL' ? Number(searchParams.bedrooms) : undefined;

  const { properties, total, totalPages, currentPage } = await getProperties({
    transactionType: 'BUY',
    category: searchParams.category,
    locality: searchParams.locality,
    minPrice,
    maxPrice,
    bedrooms,
    query: searchParams.query,
    sort: searchParams.sort,
    page,
    limit: 12,
  });

  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-ivory/60 mb-2">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-gold font-medium">Buy Property</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            Properties for Sale in Varanasi
          </h1>
          <p className="text-sm text-ivory/70 mt-2 max-w-2xl">
            Browse verified free-hold residential plots, 2/3 BHK flats, independent villas, and commercial real estate with clear title documentation and direct owner coordination.
          </p>
        </div>

        {/* Filter Controls Component */}
        <PropertySearchFilter transactionType="BUY" totalFound={total} />

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const params = new URLSearchParams(searchParams as any);
                  params.set('page', p.toString());
                  return (
                    <Link
                      key={p}
                      href={`/buy?${params.toString()}`}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        p === currentPage
                          ? 'bg-gold text-charcoal shadow-gold'
                          : 'bg-charcoal-200 text-ivory hover:bg-charcoal-100 border border-charcoal-100'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-charcoal-200 rounded-2xl border border-charcoal-100 p-8 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-charcoal-300 border border-gold/30 text-gold mx-auto flex items-center justify-center">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-ivory">
              No Matching Properties Found
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              We could not find active listings matching all your selected filters. Please adjust your budget or locality, or submit your specific property requirement and our Pandeypur team will source it for you.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/buy"
                className="px-4 py-2 rounded-lg bg-gold text-charcoal text-xs font-bold shadow-gold"
              >
                Reset All Filters
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg bg-charcoal-300 border border-gold/40 text-gold text-xs font-semibold"
              >
                Submit Custom Requirement
              </Link>
            </div>
          </div>
        )}

        {/* Disclaimer Notice Box */}
        <div className="mt-16 p-4 rounded-xl bg-charcoal-300 border border-charcoal-100/80 text-[11px] text-ivory/60 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <p>
            <strong>Note on Property Listings:</strong> All prices, carpet areas, and specifications are subject to physical on-site inspection and contract execution. Listed development-only sample listings are clearly tagged. For physical site visits and official circle rate verification, contact Mr. Umesh Yadav directly at +91 {BRAND.phone}.
          </p>
        </div>
      </div>
    </div>
  );
}

