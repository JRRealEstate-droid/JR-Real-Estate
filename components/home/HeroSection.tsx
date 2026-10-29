'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BRAND, VARANASI_LOCALITIES, PROPERTY_CATEGORIES, BUDGET_RANGES_BUY } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { Search, MapPin, Building, IndianRupee, ArrowRight, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-gradient-to-b from-charcoal via-charcoal-300 to-charcoal py-16 lg:py-24 border-b border-charcoal-100">
      {/* Decorative Gold Glow Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-gold/10 via-gold/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-200 border border-gold/30 text-gold text-xs font-semibold tracking-wide shadow-gold">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>Varanasi&apos;s Leading Real Estate &amp; Construction Firm &bull; Pandeypur Chauraha</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-[1.15]">
            {BRAND.heroHeadline}
          </h1>

          {/* Supporting Line */}
          <p className="text-lg sm:text-xl text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            {BRAND.heroSubheadline}
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#search-bar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark text-charcoal font-bold text-sm shadow-gold-lg hover:brightness-105 transition-all"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-charcoal-200 border border-gold/40 text-gold hover:bg-charcoal-100 text-sm font-semibold transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to Director: {BRAND.phone}</span>
            </a>
          </div>

          {/* Key Value Props Pill */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-ivory/70">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Physical Site Verified</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>VDA / Registry Legal Guidance</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Turnkey Construction &amp; Materials</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Transparent Pricing &bull; No Hidden Charges</span>
            </span>
          </div>
        </div>

        {/* Property Search Console */}
        <div id="search-bar" className="mt-12 max-w-5xl mx-auto">
          <div className="bg-charcoal-200/90 backdrop-blur-xl border border-gold/30 rounded-2xl p-4 sm:p-6 shadow-2xl">
            {/* Tabs */}
            <div className="flex items-center gap-2 pb-4 border-b border-charcoal-100">
              <button
                type="button"
                onClick={() => setActiveTab('BUY')}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
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
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'RENT'
                    ? 'bg-gold text-charcoal shadow-gold'
                    : 'text-ivory/70 hover:text-gold hover:bg-charcoal-100'
                }`}
              >
                Rent / Lease
              </button>
            </div>

            {/* Search Controls Form */}
            <form onSubmit={handleSearch} className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-gold-hover to-gold-dark hover:brightness-105 text-charcoal font-bold py-2.5 px-4 rounded-lg shadow-gold transition-all"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

