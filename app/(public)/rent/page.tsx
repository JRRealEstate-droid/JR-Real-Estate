import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { getProperties } from '@/lib/data/properties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertySearchFilter } from '@/components/properties/PropertySearchFilter';
import { BRAND } from '@/lib/constants';
import Link from 'next/link';
import { MapPin, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rent & Commercial Lease in Varanasi | Flats, Houses & Offices',
  description:
    'Find verified residential flats for rent and commercial shop / office leases in Varanasi. Prime localities including Mahmoorganj, Sigra, Pandeypur, and Orderly Bazar.',
};

export default async function RentPage({
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
    transactionType: 'RENT',
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
            <span className="text-gold font-medium">Rent &amp; Lease</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            Rent &amp; Commercial Lease in Varanasi
          </h1>
          <p className="text-sm text-ivory/70 mt-2 max-w-2xl">
            Explore quality family apartments, independent floors, and prime commercial retail shops available for long-term and short-term lease with verified rental agreements.
          </p>
        </div>

        {/* Visual Heritage Corridor Banner */}
        <div className="mb-8 relative rounded-2xl overflow-hidden border border-charcoal-100 h-28 sm:h-36 shadow-lg">
          <Image
            src="/images/varanasi-ghat-river-view.jpg"
            alt="Varanasi Riverfront & Ghats"
            fill
            sizes="100vw"
            unoptimized={true}
            className="object-cover object-center filter brightness-75 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
          <div className="absolute inset-0 flex items-center px-6 sm:px-8">
            <div className="space-y-1">
              <span className="text-gold uppercase text-[11px] font-mono tracking-widest font-semibold">
                Commercial &amp; Residential Rentals &bull; Varanasi Central &amp; Outer
              </span>
              <p className="text-lg sm:text-2xl font-serif font-bold text-ivory">
                Discover Verified Rental Homes &amp; High-Footfall Commercial Spaces
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <PropertySearchFilter transactionType="RENT" totalFound={total} />

        {/* Grid */}
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const params = new URLSearchParams(searchParams as any);
                  params.set('page', p.toString());
                  return (
                    <Link
                      key={p}
                      href={`/rent?${params.toString()}`}
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
          <div className="text-center py-20 bg-charcoal-200 rounded-2xl border border-charcoal-100 p-8 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-charcoal-300 border border-gold/30 text-gold mx-auto flex items-center justify-center">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-ivory">
              No Rental Properties Found
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              We currently do not have rental listings matching these exact parameters. Contact our office directly for upcoming family flats and office spaces in Varanasi.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/rent"
                className="px-4 py-2 rounded-lg bg-gold text-charcoal text-xs font-bold shadow-gold"
              >
                Reset Filters
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg bg-charcoal-300 border border-gold/40 text-gold text-xs font-semibold"
              >
                Contact Rental Desk
              </Link>
            </div>
          </div>
        )}

        <div className="mt-16 p-4 rounded-xl bg-charcoal-300 border border-charcoal-100/80 text-[11px] text-ivory/60 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <p>
            <strong>Rental Note:</strong> Security deposit, maintenance charges, and lease agreement duration are finalized directly between tenant and property owner with JR Real Estate facilitation.
          </p>
        </div>
      </div>
    </div>
  );
}

