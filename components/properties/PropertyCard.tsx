'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SampleProperty } from '@/lib/data/sample-data';
import { getCategoryLabel, getWhatsAppUrl } from '@/lib/utils';
import { BRAND } from '@/lib/constants';
import { MapPin, Bed, Maximize2, Phone, MessageSquare, Tag } from 'lucide-react';
import { BanarasiCornerAccent } from '@/components/ui/KashiMotifs';

interface PropertyCardProps {
  property: SampleProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage =
    property.images?.find((img) => img.isPrimary)?.url ||
    property.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';

  const whatsappMessage = `Namaste JR Real Estate, I am interested in property "${property.title}" (Ref: ${property.referenceId}). Please share availability and site visit details.`;
  const whatsappUrl = getWhatsAppUrl(BRAND.whatsappNumber, whatsappMessage);

  return (
    <div className="group relative bg-charcoal-200/95 rounded-2xl overflow-hidden border border-charcoal-100/90 hover:border-gold/50 transition-all duration-300 shadow-lg hover:shadow-gold/15 flex flex-col justify-between">
      <BanarasiCornerAccent position="top-right" />

      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-300">
          <Image
            src={primaryImage}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-charcoal/90 text-gold border border-gold/40 backdrop-blur-sm shadow-sm">
              {getCategoryLabel(property.category)}
            </span>
            {property.featured && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gold text-charcoal shadow-sm">
                Featured
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded text-[10px] font-mono font-semibold bg-charcoal/85 text-ivory/80 border border-charcoal-50 backdrop-blur-sm">
              {property.referenceId}
            </span>
          </div>

          {/* Sample Data Dev Tag */}
          {property.isSampleData && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                Dev Sample Listing
              </span>
            </div>
          )}

          {/* Price Tag in Bottom Right of Image */}
          <div className="absolute bottom-3 right-3 text-right">
            <span className="text-lg font-serif font-bold text-gold drop-shadow-md">
              {property.priceDisplay}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Locality */}
          <div className="flex items-center gap-1.5 text-xs text-gold/90 font-medium">
            <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="truncate">{property.localityName}, Varanasi</span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`}>
            <h3 className="font-serif font-bold text-base text-ivory line-clamp-2 group-hover:text-gold transition-colors leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Specs Row */}
          <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between text-xs text-ivory/70">
            {property.carpetArea || property.plotArea ? (
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-gold/70" />
                <span>{property.carpetArea || property.plotArea} {property.areaUnit}</span>
              </span>
            ) : null}

            {property.bedrooms ? (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-gold/70" />
                <span>{property.bedrooms} BHK</span>
              </span>
            ) : null}

            {property.possessionStatus ? (
              <span className="flex items-center gap-1 text-[11px] text-ivory/60 truncate">
                <Tag className="w-3 h-3 text-gold/70" />
                <span>{property.possessionStatus.replace(/_/g, ' ')}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 pt-0 grid grid-cols-3 gap-2">
        <Link
          href={`/properties/${property.slug}`}
          className="col-span-1 text-center py-2 px-2 rounded-lg bg-charcoal-100 hover:bg-charcoal-50 text-ivory text-xs font-semibold border border-charcoal-50 transition-colors flex items-center justify-center"
        >
          Details
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 text-center py-2 px-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          aria-label="WhatsApp Inquiry"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat</span>
        </a>

        <a
          href={`tel:${BRAND.phone}`}
          className="col-span-1 text-center py-2 px-2 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold border border-gold/40 text-xs font-bold transition-colors flex items-center justify-center gap-1"
          aria-label="Call for this property"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}
