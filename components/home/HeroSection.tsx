'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BRAND, VARANASI_LOCALITIES, PROPERTY_CATEGORIES, BUDGET_RANGES_BUY } from '@/lib/constants';
import { Search, MapPin, Building, IndianRupee, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { BanarasiMedallion, GangaWaveDivider, DiyaGlow, BanarasiCornerAccent } from '@/components/ui/KashiMotifs';

export function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT'>('BUY');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLocality, setSelectedLocality] = useState('ALL');
  const [selectedBudget, setSelectedBudget] = useState('ALL');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('type', activeTab.toLowerCase());
    if (selectedCategory !== 'ALL') params.set('category', selectedCategory);
    if (selectedLocality !== 'ALL') params.set('locality', selectedLocality);
    if (selectedBudget !== 'ALL') {
      const b = BUDGET_RANGES_BUY.find((r) => r.label === selectedBudget);
      if (b) {
        if (b.min !== undefined) params.set('minPrice', b.min.toString());
        if (b.max !== null) params.set('maxPrice', b.max.toString());
      }
    }
    router.push(`/${activeTab === 'BUY' ? 'buy' : 'rent'}?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-charcoal pt-16 sm:pt-20 lg:pt-28 pb-0">
      {/* 1. Atmospheric Kashi Sunrise & Ganga River Photographic Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/images/varanasi-golden-ghats.jpg"
          alt="Golden hour on the ghats of Varanasi, India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center motion-safe:animate-kashi-drift opacity-80 filter brightness-105 contrast-105"
        />
        {/* Layered Gradient Overlay: Warm golden dawn light while preserving crystal-clear readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/55 to-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30" />
      </div>

      {/* 2. Diya Radiance & Golden Aura */}
      <DiyaGlow className="top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] z-0" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none z-0" />

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6 motion-safe:animate-fade-rise">
          {/* Trust Badge with Banarasi Motif */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-200/90 border border-gold/30 text-gold text-xs font-semibold tracking-wide shadow-gold backdrop-blur-md">
            <BanarasiMedallion size={14} className="text-gold" />
            <span>Varanasi&apos;s Leading Real Estate &amp; Construction Firm &bull; Pandeypur Chauraha</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-[1.14]">
            {BRAND.heroHeadline}
          </h1>

          {/* Supporting Line */}
          <p className="text-lg sm:text-xl text-ivory/85 max-w-2xl mx-auto font-normal leading-relaxed">
            {BRAND.heroSubheadline}
          </p>

          {/* Quick CTAs with Kashi Aesthetics */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#search-bar"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark text-charcoal font-bold text-sm shadow-gold-lg hover:brightness-105 active:scale-[0.99] transition-all"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-charcoal-200/90 border border-gold/40 text-gold hover:bg-charcoal-100 hover:border-gold text-sm font-semibold backdrop-blur-md transition-all"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Talk to Director: {BRAND.phone}</span>
            </a>
          </div>

          {/* Value Props Pill */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-ivory/75">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Physical Site Verified</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
              <span>VDA &amp; Revenue Legal Guidance</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Turnkey Construction &amp; Materials</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Transparent Pricing &bull; No Hidden Brokerage</span>
            </span>
          </div>
        </div>

        {/* 4. Property Search Console with Banarasi Corner Accents */}
        <div id="search-bar" className="mt-12 sm:mt-16 max-w-5xl mx-auto relative">
          <div className="relative bg-charcoal-200/95 backdrop-blur-xl border border-gold/30 rounded-2xl p-5 sm:p-7 shadow-2xl overflow-hidden">
            <BanarasiCornerAccent position="top-right" />
            <BanarasiCornerAccent position="bottom-left" />

            {/* Tabs */}
            <div className="flex items-center gap-2 pb-4 border-b border-charcoal-100/80">
              <button
                type="button"
                onClick={() => setActiveTab('BUY')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'BUY'
                    ? 'bg-gold text-charcoal shadow-gold'
                    : 'text-ivory/70 hover:text-gold hover:bg-charcoal-100'
                }`}
              >
                Buy in Varanasi
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('RENT')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'RENT'
                    ? 'bg-gold text-charcoal shadow-gold'
                    : 'text-ivory/70 hover:text-gold hover:bg-charcoal-100'
                }`}
              >
                Rent / Lease
              </button>
            </div>

            {/* Search Controls Form */}
            <form onSubmit={handleSearch} className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-ivory/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-gold" />
                  <span>Property Type</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg px-3 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="ALL">All Categories</option>
                  {PROPERTY_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Locality */}
              <div>
                <label className="block text-xs font-semibold text-ivory/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>Locality</span>
                </label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg px-3 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="ALL">All Localities in Varanasi</option>
                  {VARANASI_LOCALITIES.map((loc) => (
                    <option key={loc.slug} value={loc.slug}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-semibold text-ivory/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-gold" />
                  <span>Budget Range</span>
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg px-3 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="ALL">Any Budget</option>
                  {BUDGET_RANGES_BUY.map((b) => (
                    <option key={b.label} value={b.label}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-gold-hover to-gold-dark hover:brightness-105 active:scale-[0.99] text-charcoal font-bold py-2.5 px-4 rounded-lg shadow-gold transition-all"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 5. Ganga River Wave Transition Divider */}
      <div className="relative mt-16 sm:mt-20">
        <GangaWaveDivider animated={true} />
      </div>
    </section>
  );
}
