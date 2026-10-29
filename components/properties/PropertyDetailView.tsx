'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SampleProperty } from '@/lib/data/sample-data';
import { BRAND } from '@/lib/constants';
import { formatCurrencyINR, getCategoryLabel, getWhatsAppUrl } from '@/lib/utils';
import { submitPropertyInquiry } from '@/app/actions/leads';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Phone,
  MessageSquare,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  Compass,
  Building,
  Tag,
  Share2,
  AlertCircle,
  Clock,
  Layers,
} from 'lucide-react';

interface PropertyDetailViewProps {
  property: SampleProperty;
  similarProperties: SampleProperty[];
}

export function PropertyDetailView({ property, similarProperties }: PropertyDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryResult, setInquiryResult] = useState<{ success: boolean; message?: string; referenceCode?: string; error?: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = property.images?.length
    ? property.images
    : [{ url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80', altText: property.title, isPrimary: true }];

  const currentImage = images[selectedImageIndex] || images[0];

  const whatsappMessage = `Namaste JR Real Estate, I am inquiring about "${property.title}" (Ref: ${property.referenceId}). Please share current availability, circle rate, and schedule a site inspection.`;
  const whatsappUrl = getWhatsAppUrl(BRAND.whatsappNumber, whatsappMessage);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInquirySubmitting(true);
    setInquiryResult(null);

    const formData = new FormData(e.currentTarget);
    formData.append('propertyId', property.id);
    formData.append('propertyTitle', property.title);
    formData.append('propertyRef', property.referenceId);

    const res = await submitPropertyInquiry(formData);
    setInquiryResult(res);
    setInquirySubmitting(false);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="py-10 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Quick Actions Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-ivory/60">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <Link href={property.transactionType === 'BUY' ? '/buy' : '/rent'} className="hover:text-gold">
              {property.transactionType === 'BUY' ? 'Buy' : 'Rent'}
            </Link>
            <span>/</span>
            <span className="text-gold truncate max-w-xs">{property.referenceId}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-200 border border-charcoal-100 text-xs text-ivory/80 hover:text-gold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Listing'}</span>
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-charcoal-200 border border-gold/40 text-gold text-xs font-mono font-bold">
              Ref: {property.referenceId}
            </span>
          </div>
        </div>

        {/* Title and Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-charcoal-100">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-gold text-charcoal">
                {getCategoryLabel(property.category)}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-charcoal-200 text-ivory/80 border border-charcoal-100">
                {property.transactionType === 'BUY' ? 'For Sale' : 'For Rent'}
              </span>
              {property.isSampleData && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Development Sample Listing
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-ivory leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-gold/90 font-medium">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{property.address} {property.landmark ? `(${property.landmark})` : ''}</span>
            </div>
          </div>

          {/* Price Callout */}
          <div className="lg:text-right flex flex-row lg:flex-col justify-between items-baseline lg:items-end">
            <div className="text-xs text-ivory/60 uppercase tracking-wider">Demand Price</div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-gold">
              {property.priceDisplay}
            </div>
            {property.isPriceNegotiable && (
              <div className="text-[11px] text-emerald-400 font-medium mt-1">
                * Price negotiable across table
              </div>
            )}
          </div>
        </div>

        {/* Main Grid: Gallery & Details on Left, Enquiry Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: 8 Cols */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-charcoal-300 border border-charcoal-100 shadow-xl">
                <Image
                  src={currentImage.url}
                  alt={currentImage.altText || property.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-gold scale-105' : 'border-charcoal-100 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Specifications Grid */}
            <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 shadow-lg">
              <h3 className="font-serif font-bold text-lg text-ivory mb-4 pb-2 border-b border-charcoal-100">
                Property Overview &amp; Key Metrics
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
                {property.carpetArea || property.plotArea ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-charcoal-300 border border-gold/20 text-gold">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ivory/60 block">Area / Size</span>
                      <strong className="text-ivory text-sm">
                        {property.carpetArea || property.plotArea} {property.areaUnit}
                      </strong>
                    </div>
                  </div>
                ) : null}

                {property.bedrooms ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-charcoal-300 border border-gold/20 text-gold">
                      <Bed className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ivory/60 block">Bedrooms (BHK)</span>
                      <strong className="text-ivory text-sm">{property.bedrooms} BHK</strong>
                    </div>
                  </div>
                ) : null}

                {property.bathrooms ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-charcoal-300 border border-gold/20 text-gold">
                      <Bath className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ivory/60 block">Bathrooms</span>
                      <strong className="text-ivory text-sm">{property.bathrooms} Baths</strong>
                    </div>
                  </div>
                ) : null}

                {property.facing ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-charcoal-300 border border-gold/20 text-gold">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ivory/60 block">Orientation / Facing</span>
                      <strong className="text-ivory text-sm">{property.facing}</strong>
                    </div>
                  </div>
                ) : null}

                {property.possessionStatus ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-charcoal-300 border border-gold/20 text-gold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ivory/60 block">Possession Status</span>
                      <strong className="text-ivory text-sm">
                        {property.possessionStatus.replace(/_/g, ' ')}
                      </strong>
                    </div>
                  </div>
                ) : null}

                {property.furnishingStatus ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-charcoal-300 border border-gold/20 text-gold">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ivory/60 block">Furnishing</span>
                      <strong className="text-ivory text-sm">
                        {property.furnishingStatus.replace(/_/g, ' ')}
                      </strong>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Description */}
            <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="font-serif font-bold text-lg text-ivory pb-2 border-b border-charcoal-100">
                Detailed Property Description
              </h3>
              <p className="text-sm text-ivory/80 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities & Infrastructure */}
            {property.amenities?.length > 0 && (
              <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 shadow-lg space-y-4">
                <h3 className="font-serif font-bold text-lg text-ivory pb-2 border-b border-charcoal-100">
                  Amenities &amp; Colony Infrastructure
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-charcoal-300 border border-charcoal-100 text-xs text-ivory/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location & Varanasi Proximity Highlights */}
            <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="font-serif font-bold text-lg text-ivory pb-2 border-b border-charcoal-100 flex items-center justify-between">
                <span>Location Highlights &amp; Connectivity</span>
                <span className="text-xs text-gold font-sans font-medium">{property.localityName}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ivory/80">
                <div className="p-3 rounded-lg bg-charcoal-300 border border-charcoal-100">
                  <span className="font-semibold text-ivory block mb-1">Transit &amp; Highway Connectivity:</span>
                  <span>Direct wide road approach connecting to Ring Road Phase 1 and Cantt Railway Station corridor.</span>
                </div>
                <div className="p-3 rounded-lg bg-charcoal-300 border border-charcoal-100">
                  <span className="font-semibold text-ivory block mb-1">Essential Amenities Nearby:</span>
                  <span>Renowned schools, healthcare hospitals, banks, and daily grocery markets within a 5-10 min drive.</span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="p-6 rounded-xl bg-charcoal-300 border border-dashed border-gold/30 text-center space-y-2">
                <MapPin className="w-8 h-8 text-gold mx-auto" />
                <p className="text-xs text-ivory/70">
                  Exact GPS coordinates &amp; site visit landmark will be provided upon scheduling a visit with our relationship officer.
                </p>
                <button
                  type="button"
                  onClick={() => setShowVisitModal(true)}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold text-charcoal font-bold text-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Free In-Person Site Visit</span>
                </button>
              </div>
            </div>

            {/* Important Disclaimer Notice */}
            <div className="p-4 rounded-xl bg-charcoal-300 border border-charcoal-100 text-[11px] text-ivory/60 space-y-1">
              <div className="flex items-center gap-1.5 text-gold font-semibold">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>Verification &amp; Pricing Notice</span>
              </div>
              <p>
                All property details, dimensions, and circle rate calculations must be independently confirmed with JR Real Estate prior to token agreement. JR Real Estate does not charge hidden brokerage on builder-partner projects.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Cols Sticky Enquiry & Contact Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Lead Inquiry Form Box */}
              <div className="bg-charcoal-200 border border-gold/40 rounded-2xl p-6 shadow-2xl space-y-5">
                <div className="border-b border-charcoal-100 pb-3">
                  <h3 className="font-serif font-bold text-lg text-ivory">
                    Inquire for this Property
                  </h3>
                  <p className="text-xs text-ivory/60 mt-0.5">
                    Ref: <strong className="font-mono text-gold">{property.referenceId}</strong>
                  </p>
                </div>

                {inquiryResult?.success && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
                    <p className="font-semibold">{inquiryResult.message}</p>
                    <p className="text-[11px] text-emerald-200">
                      CRM Reference: <strong className="font-mono text-white">{inquiryResult.referenceCode}</strong>
                    </p>
                  </div>
                )}

                {inquiryResult?.error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{inquiryResult.error}</span>
                  </div>
                )}

                <form onSubmit={handleInquirySubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Your full name"
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="10-digit mobile number"
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Optional"
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Preferred Site Visit Date</label>
                    <input
                      type="date"
                      name="preferredVisitDate"
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/80 font-medium mb-1">Questions / Specific Note</label>
                    <textarea
                      name="message"
                      rows={2}
                      placeholder="Interested in road width, circle rate, negotiation..."
                      className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={inquirySubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark text-charcoal font-bold text-sm shadow-gold hover:brightness-105 transition-all disabled:opacity-50"
                  >
                    {inquirySubmitting ? 'Sending Request...' : 'Submit Inquiry to CRM'}
                  </button>
                </form>

                {/* Direct Connect Buttons */}
                <div className="pt-2 border-t border-charcoal-100 flex flex-col gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp with Reference ID</span>
                  </a>

                  <a
                    href={`tel:${BRAND.phone}`}
                    className="w-full py-2.5 px-3 rounded-lg bg-charcoal-300 hover:bg-charcoal-100 border border-gold/40 text-gold font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Director: {BRAND.phone}</span>
                  </a>
                </div>
              </div>

              {/* Office Details Card */}
              <div className="p-4 rounded-xl bg-charcoal-200 border border-charcoal-100 text-xs space-y-2">
                <div className="font-serif font-bold text-ivory">JR Real Estate Varanasi</div>
                <div className="text-ivory/70 text-[11px]">{BRAND.address}</div>
                <div className="text-gold text-[11px] font-medium">Director: {BRAND.director}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="pt-12 border-t border-charcoal-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-2xl text-ivory">
                Similar Properties in Varanasi
              </h3>
              <Link href="/buy" className="text-xs text-gold hover:underline font-semibold">
                Explore All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.slice(0, 3).map((sim) => (
                <div
                  key={sim.id}
                  className="bg-charcoal-200 border border-charcoal-100 rounded-xl p-4 space-y-3 hover:border-gold/40 transition-all"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-charcoal-300">
                    <Image
                      src={sim.images?.[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'}
                      alt={sim.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold font-bold uppercase">{sim.localityName}</span>
                    <Link href={`/properties/${sim.slug}`}>
                      <h4 className="font-serif font-bold text-sm text-ivory hover:text-gold transition-colors line-clamp-1">
                        {sim.title}
                      </h4>
                    </Link>
                    <div className="text-sm font-serif font-bold text-gold mt-1">
                      {sim.priceDisplay}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Free Site Visit Booking Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-charcoal-200 border border-gold/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <h3 className="font-serif font-bold text-xl text-ivory">
                Schedule a Free Site Visit
              </h3>
              <button
                onClick={() => setShowVisitModal(false)}
                className="text-ivory/60 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-ivory/70">
              Visiting property: <strong className="text-gold">{property.title}</strong> ({property.referenceId}). Our representative will confirm vehicle pick-up or site rendezvous.
            </p>

            <form
              onSubmit={async (e) => {
                await handleInquirySubmit(e);
                setShowVisitModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-ivory/80 font-medium mb-1">Your Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit number"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">Preferred Date</label>
                <input
                  type="date"
                  name="preferredVisitDate"
                  required
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">Pickup or Direct Site Arrival?</label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="e.g. I will reach Pandeypur Chauraha office at 11 AM..."
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowVisitModal(false)}
                  className="px-4 py-2 rounded-lg bg-charcoal-300 text-ivory/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-gold text-charcoal font-bold shadow-gold hover:bg-gold-hover"
                >
                  Confirm Visit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

