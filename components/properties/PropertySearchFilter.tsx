'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PROPERTY_CATEGORIES, VARANASI_LOCALITIES, BUDGET_RANGES_BUY } from '@/lib/constants';
import { Filter, X, Search, RotateCcw } from 'lucide-react';

interface PropertySearchFilterProps {
  transactionType: 'BUY' | 'RENT';
  totalFound: number;
}

export function PropertySearchFilter({ transactionType, totalFound }: PropertySearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || 'ALL';
  const currentLocality = searchParams.get('locality') || 'ALL';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentBedrooms = searchParams.get('bedrooms') || 'ALL';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentQuery = searchParams.get('query') || '';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'ALL') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // reset pagination on filter change
    router.push(`?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(transactionType === 'BUY' ? '/buy' : '/rent');
  };

  const hasActiveFilters =
    currentCategory !== 'ALL' ||
    currentLocality !== 'ALL' ||
    currentMinPrice !== '' ||
    currentMaxPrice !== '' ||
    currentBedrooms !== 'ALL' ||
    currentQuery !== '';

  return (
    <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-5 mb-8 space-y-4 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-charcoal-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gold" />
          <h2 className="font-serif font-bold text-lg text-ivory">Filter Properties</h2>
          <span className="text-xs text-ivory/60 bg-charcoal-300 px-2.5 py-0.5 rounded-full border border-charcoal-100">
            {totalFound} available
          </span>
        </div>

        {/* Search input & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-ivory/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              defaultValue={currentQuery}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateParam('query', (e.target as HTMLInputElement).value);
                }
              }}
              placeholder="Search title or landmark..."
              className="pl-8 pr-3 py-1.5 bg-charcoal-300 border border-charcoal-100 rounded-lg text-xs text-ivory focus:outline-none focus:border-gold w-48 sm:w-56"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-ivory/60">Sort:</span>
            <select
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="bg-charcoal-300 border border-charcoal-100 rounded-lg px-2.5 py-1.5 text-xs text-ivory focus:outline-none focus:border-gold"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="area_desc">Area: Largest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Category */}
        <div>
          <label className="block text-ivory/70 font-medium mb-1">Property Category</label>
          <select
            value={currentCategory}
            onChange={(e) => updateParam('category', e.target.value)}
            className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2 text-ivory focus:outline-none focus:border-gold"
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
          <label className="block text-ivory/70 font-medium mb-1">Varanasi Locality</label>
          <select
            value={currentLocality}
            onChange={(e) => updateParam('locality', e.target.value)}
            className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2 text-ivory focus:outline-none focus:border-gold"
          >
            <option value="ALL">All Prime Localities</option>
            {VARANASI_LOCALITIES.map((loc) => (
              <option key={loc.slug} value={loc.slug}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-ivory/70 font-medium mb-1">BHK Configuration</label>
          <select
            value={currentBedrooms}
            onChange={(e) => updateParam('bedrooms', e.target.value)}
            className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2 text-ivory focus:outline-none focus:border-gold"
          >
            <option value="ALL">Any BHK / Land</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK / Villa</option>
          </select>
        </div>

        {/* Budget Presets */}
        <div>
          <label className="block text-ivory/70 font-medium mb-1">Budget Range</label>
          <select
            value={
              currentMinPrice && currentMaxPrice
                ? `${currentMinPrice}-${currentMaxPrice}`
                : currentMinPrice
                ? `${currentMinPrice}-plus`
                : 'ALL'
            }
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'ALL') {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('minPrice');
                params.delete('maxPrice');
                router.push(`?${params.toString()}`);
              } else if (val.endsWith('-plus')) {
                const min = val.split('-')[0];
                const params = new URLSearchParams(searchParams.toString());
                params.set('minPrice', min);
                params.delete('maxPrice');
                router.push(`?${params.toString()}`);
              } else {
                const [min, max] = val.split('-');
                const params = new URLSearchParams(searchParams.toString());
                params.set('minPrice', min);
                params.set('maxPrice', max);
                router.push(`?${params.toString()}`);
              }
            }}
            className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2 text-ivory focus:outline-none focus:border-gold"
          >
            <option value="ALL">Any Budget</option>
            {BUDGET_RANGES_BUY.map((b) => (
              <option
                key={b.label}
                value={b.max ? `${b.min}-${b.max}` : `${b.min}-plus`}
              >
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-charcoal-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-ivory/50">Active Filters:</span>

          {currentCategory !== 'ALL' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gold/15 text-gold text-xs border border-gold/30">
              <span>{PROPERTY_CATEGORIES.find((c) => c.id === currentCategory)?.name || currentCategory}</span>
              <button onClick={() => updateParam('category', 'ALL')}>
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}

          {currentLocality !== 'ALL' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gold/15 text-gold text-xs border border-gold/30">
              <span>{VARANASI_LOCALITIES.find((l) => l.slug === currentLocality)?.name || currentLocality}</span>
              <button onClick={() => updateParam('locality', 'ALL')}>
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}

          {currentBedrooms !== 'ALL' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gold/15 text-gold text-xs border border-gold/30">
              <span>{currentBedrooms} BHK</span>
              <button onClick={() => updateParam('bedrooms', 'ALL')}>
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}

          {currentQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gold/15 text-gold text-xs border border-gold/30">
              <span>Keyword: &ldquo;{currentQuery}&rdquo;</span>
              <button onClick={() => updateParam('query', '')}>
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 text-[11px] text-ivory/60 hover:text-gold underline ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      )}
    </div>
  );
}

