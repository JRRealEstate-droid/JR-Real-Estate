'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONSTRUCTION_PACKAGES } from '@/lib/constants';
import { formatCurrencyINR } from '@/lib/utils';
import { CheckCircle2, Calculator, ArrowRight, HardHat, ShieldCheck, Compass } from 'lucide-react';
import { BanarasiMedallion, BanarasiCornerAccent } from '@/components/ui/KashiMotifs';

export function ConstructionHighlight() {
  const [plotArea, setPlotArea] = useState<number>(1200);
  const [selectedFloors, setSelectedFloors] = useState<number>(2); // G+1
  const [selectedPackageCode, setSelectedPackageCode] = useState<string>('PREMIUM');

  const selectedPackage =
    CONSTRUCTION_PACKAGES.find((p) => p.code === selectedPackageCode) || CONSTRUCTION_PACKAGES[1];

  const totalBuiltUpArea = plotArea * selectedFloors;
  const estimatedCost = totalBuiltUpArea * selectedPackage.ratePerSqFt;

  return (
    <section className="py-20 bg-charcoal-400 bg-banarasi-pattern border-y border-charcoal-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Construction Offerings */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold">
              <BanarasiMedallion size={13} />
              <span>Turnkey Construction &amp; Contracting &bull; Varanasi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory leading-tight">
              Build Your Dream Home in Varanasi with Guaranteed Quality &amp; VDA Compliance
            </h2>

            <p className="text-sm text-ivory/80 leading-relaxed">
              Engineered specifically for Varanasi&apos;s alluvial soil strata and monsoon ground tables. From architectural 2D/3D blueprints to heavy RCC raft foundations, certified Fe-550 Tata Tiscon steel, Ultratech cement, and luxury Banarasi-inspired interiors.
            </p>

            <div className="space-y-3 pt-2 text-xs text-ivory/80">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ivory">Soil-Engineered RCC Foundation:</strong> Designed for local water table conditions in Pandeypur, Shivpur, and Babatpur belt.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ivory">VDA &amp; Seismic Zone IV Compliant:</strong> Certified structural safety with municipal map sanction liaison.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ivory">Milestone Escrow Billing:</strong> Clear payment stages tied strictly to physical foundation, slab casting, masonry, and finishing.
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/construction"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark text-charcoal font-bold text-sm shadow-gold hover:brightness-105 transition-all"
              >
                <span>View Construction Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal-200 border border-charcoal-100 hover:border-gold/40 text-ivory text-sm font-semibold transition-colors"
              >
                <span>View Finished Sites in Varanasi</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Indicative Cost Estimator */}
          <div className="lg:col-span-6">
            <div className="bg-charcoal-200/95 border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <BanarasiCornerAccent position="top-right" />
              <BanarasiCornerAccent position="bottom-left" />

              <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-gold" />
                  <h3 className="font-serif font-bold text-lg text-ivory">
                    Indicative Cost Calculator
                  </h3>
                </div>
                <span className="text-[10px] text-amber-300 font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  Reference Estimate Only
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {/* Plot Area Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-ivory/80 font-medium">Plot Footprint Area</span>
                    <span className="text-gold font-bold font-mono text-sm">{plotArea} sq.ft</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="50"
                    value={plotArea}
                    onChange={(e) => setPlotArea(Number(e.target.value))}
                    className="w-full accent-gold h-1.5 bg-charcoal-300 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory/40 mt-1">
                    <span>500 sq.ft (Small Plot)</span>
                    <span>5,000 sq.ft (Large Kothi)</span>
                  </div>
                </div>

                {/* Floors Selector */}
                <div>
                  <label className="block text-xs font-medium text-ivory/80 mb-2">
                    Number of Floors (G + Floors)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { floors: 1, label: 'Ground' },
                      { floors: 2, label: 'G + 1' },
                      { floors: 3, label: 'G + 2' },
                      { floors: 4, label: 'G + 3' },
                    ].map((f) => (
                      <button
                        key={f.floors}
                        type="button"
                        onClick={() => setSelectedFloors(f.floors)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                          selectedFloors === f.floors
                            ? 'bg-gold text-charcoal border-gold font-bold shadow-gold'
                            : 'bg-charcoal-300 text-ivory/70 border-charcoal-100 hover:border-gold/30'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Construction Package */}
                <div>
                  <label className="block text-xs font-medium text-ivory/80 mb-2">
                    Finishing Specification Package
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CONSTRUCTION_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.code}
                        type="button"
                        onClick={() => setSelectedPackageCode(pkg.code)}
                        className={`p-2.5 text-left rounded-lg border transition-all ${
                          selectedPackageCode === pkg.code
                            ? 'bg-charcoal-100 border-gold text-gold shadow-sm'
                            : 'bg-charcoal-300 border-charcoal-100 text-ivory/70 hover:border-gold/30'
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight truncate">{pkg.name}</div>
                        <div className="text-[11px] font-mono text-gold mt-1 font-semibold">
                          ₹{pkg.ratePerSqFt}/sq.ft
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Card */}
                <div className="mt-6 p-4 rounded-xl bg-charcoal-300 border border-gold/30 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-ivory/60">
                      Total Built-up: <strong className="text-ivory font-mono">{totalBuiltUpArea} sq.ft</strong>
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-gold drop-shadow-sm">
                      ~ {formatCurrencyINR(estimatedCost)}
                    </div>
                  </div>

                  <Link
                    href={`/construction?plotArea=${plotArea}&floors=${selectedFloors}&pkg=${selectedPackageCode}#estimate-form`}
                    className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-hover text-charcoal font-bold text-xs shadow-gold transition-colors"
                  >
                    Get Detailed Quote
                  </Link>
                </div>

                <p className="text-[10px] text-ivory/50 italic text-center">
                  * Note: Actual quotation depends on site soil report, boundary accessibility, and customized finishes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
