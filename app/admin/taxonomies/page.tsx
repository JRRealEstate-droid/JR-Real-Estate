'use client';

import React, { useState } from 'react';
import { VARANASI_LOCALITIES, PROPERTY_CATEGORIES } from '@/lib/constants';
import { MapPin, Building, Tag, CheckCircle2, Plus } from 'lucide-react';

export default function AdminTaxonomiesPage() {
  const [localities, setLocalities] = useState(VARANASI_LOCALITIES);
  const [newLocalityName, setNewLocalityName] = useState('');
  const [newLocalityPincode, setNewLocalityPincode] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleAddLocality = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocalityName.trim()) return;

    const slug = newLocalityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setLocalities([
      ...localities,
      { name: newLocalityName, slug, pincode: newLocalityPincode || '221002', tag: 'New Growth Zone' },
    ]);
    setNewLocalityName('');
    setNewLocalityPincode('');
    setMessage(`Locality "${newLocalityName}" added successfully!`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ivory">
          Localities, Categories &amp; Taxonomies
        </h1>
        <p className="text-xs text-ivory/60 mt-1">
          Manage Varanasi coverage areas, property classifications, and amenity badges.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Localities in Varanasi (7 Cols) */}
        <div className="lg:col-span-7 bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <div>
              <h2 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" />
                <span>Varanasi Localities &amp; Pincodes</span>
              </h2>
              <p className="text-xs text-ivory/60">Active search zones</p>
            </div>
            <span className="text-xs text-gold font-mono font-bold">
              {localities.length} Areas
            </span>
          </div>

          {/* Add Locality Form */}
          <form onSubmit={handleAddLocality} className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100 flex flex-wrap gap-2 text-xs">
            <input
              type="text"
              value={newLocalityName}
              onChange={(e) => setNewLocalityName(e.target.value)}
              placeholder="Locality Name (e.g. Dafi / Manduadih)"
              required
              className="flex-1 min-w-[160px] bg-charcoal-200 border border-charcoal-100 rounded-lg p-2 text-ivory focus:outline-none focus:border-gold"
            />
            <input
              type="text"
              value={newLocalityPincode}
              onChange={(e) => setNewLocalityPincode(e.target.value)}
              placeholder="Pincode (221xxx)"
              className="w-28 bg-charcoal-200 border border-charcoal-100 rounded-lg p-2 text-ivory focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gold text-charcoal font-bold shadow-gold hover:bg-gold-hover transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          {/* Localities List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {localities.map((loc) => (
              <div
                key={loc.slug}
                className="p-3 rounded-lg bg-charcoal-300 border border-charcoal-100/70 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-ivory">{loc.name}</div>
                  <div className="text-[10px] text-ivory/50">Pin: {loc.pincode}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-200 text-gold border border-gold/20 font-medium">
                  {loc.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Categories (5 Cols) */}
        <div className="lg:col-span-5 bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="pb-3 border-b border-charcoal-100">
            <h2 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
              <Building className="w-5 h-5 text-gold" />
              <span>Property Categories</span>
            </h2>
            <p className="text-xs text-ivory/60">Standard classified types</p>
          </div>

          <div className="space-y-2.5">
            {PROPERTY_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="p-3 rounded-xl bg-charcoal-300 border border-charcoal-100/70 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-ivory font-semibold">{cat.name}</strong>
                  <span className="font-mono text-[10px] text-gold">{cat.id}</span>
                </div>
                <p className="text-[11px] text-ivory/60 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
