'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CONSTRUCTION_PACKAGES } from '@/lib/constants';
import { formatCurrencyINR } from '@/lib/utils';
import { Compass, CheckCircle2, Calculator, ArrowRight, ShieldCheck, HardHat, FileSpreadsheet } from 'lucide-react';

export function ConstructionHighlight() {
  const [plotArea, setPlotArea] = useState<number>(1200);
  const [selectedFloors, setSelectedFloors] = useState<number>(2); // G+1
  const [selectedPackageCode, setSelectedPackageCode] = useState<string>('PREMIUM');

  const selectedPackage =
    CONSTRUCTION_PACKAGES.find((p) => p.code === selectedPackageCode) || CONSTRUCTION_PACKAGES[1];

  const totalBuiltUpArea = plotArea * selectedFloors;
  const estimatedCost = totalBuiltUpArea * selectedPackage.ratePerSqFt;

  return (
    <section className="py-20 bg-charcoal-400 border-y border-charcoal-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Construction Offerings */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold">
              <HardHat className="w-3.5 h-3.5" />
              <span>Turnkey Construction &amp; Contracting</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory leading-tight">
              Build Your Dream Home in Varanasi with Guaranteed Quality
            </h2>

            <p className="text-sm text-ivory/80 leading-relaxed">
              From architectural 2D/3D blueprints to RCC foundation, certified Tata Tiscon steel, Ultratech cement, and luxury interior finishing. JR Real Estate delivers transparent, milestone-based construction with site engineer supervision at every phase.
            </p>

            <div className="space-y-3 pt-2 text-xs text-ivory/80">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ivory">Certified Branded Materials:</strong> Fe-550 TMT Steel, Grade 43/53 Portland Cement, first-class bricks/AAC blocks.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ivory">VDA &amp; Structural Compliance:</strong> Earthquake-resistant seismic zone column detailing and municipal map sanctioning.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ivory">Milestone Escrow Billing:</strong> Pay only as foundation, slab casting, masonry, and finishing stages complete.
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/construction"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-charcoal font-bold text-sm shadow-gold hover:bg-gold-hover transition-colors"
              >
                <span>View Construction Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal-200 border border-charcoal-100 hover:border-gold/40 text-ivory text-sm font-semibold transition-colors"
              >
                <span>View Our Finished Sites</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Indicative Cost Estimator */}
          <div className="lg:col-span-6">
            <div className="bg-charcoal-200/90 border border-gold/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-gold" />
                  <h3 className="font-serif font-bold text-lg text-ivory">
                    Indicative Cost Calculator
                  </h3>
                </div>
                <span className="text-[10px] text-amber-300 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
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
                    min="600"
                    max="5000"
                    step="50"
                    value={plotArea}
                    onChange={(e) => setPlotArea(Number(e.target.value))}
                    className="w-full accent-gold h-2 bg-charcoal-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory/50 mt-1 font-mono">
                    <span>600 sq.ft</span>
                    <span>2,500 sq.ft</span>
                    <span>5,000 sq.ft</span>
                  </div>
                </div>

                {/* Number of Floors */}
                <div>
                  <label className="block text-xs text-ivory/80 font-medium mb-2">
                    Construction Structure (Floors)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Ground', floors: 1 },
                      { label: 'G + 1', floors: 2 },
                      { label: 'G + 2', floors: 3 },
                      { label: 'G + 3', floors: 4 },
                    ].map((fl) => (
                      <button
                        key={fl.label}
                        type="button"
                        onClick={() => setSelectedFloors(fl.floors)}
                        className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                          selectedFloors === fl.floors
                            ? 'bg-gold text-charcoal font-bold'
                            : 'bg-charcoal-300 text-ivory/70 hover:bg-charcoal-100 border border-charcoal-100'
                        }`}
                      >
                        {fl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Package Selection */}
                <div>
                  <label className="block text-xs text-ivory/80 font-medium mb-2">
                    Finishing Package
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CONSTRUCTION_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.code}
                        type="button"
                        onClick={() => setSelectedPackageCode(pkg.code)}
                        className={`p-2.5 rounded-lg text-left transition-all border ${
                          selectedPackageCode === pkg.code
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-charcoal-100 bg-charcoal-300 text-ivory/70 hover:border-gold/30'
                        }`}
                      >
                        <div className="text-xs font-bold">{pkg.name.split(' ')[0]}</div>
                        <div className="text-[11px] font-mono text-gold mt-0.5">
                          ₹ {pkg.ratePerSqFt}/sq.ft
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Output Box */}
                <div className="mt-6 p-4 rounded-xl bg-charcoal-300 border border-gold/30">
                  <div className="flex items-center justify-between text-xs text-ivory/70 pb-2 border-b border-charcoal-100/60">
                    <span>Total Built-Up Area</span>
                    <span className="font-mono font-semibold text-ivory">
                      {totalBuiltUpArea.toLocaleString()} sq.ft
                    </span>
                  </div>
                  <div className="pt-3 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-ivory/60 uppercase tracking-wider font-semibold">
                        Indicative Estimated Cost
                      </div>
                      <div className="text-2xl sm:text-3xl font-serif font-bold text-gold">
                        {formatCurrencyINR(estimatedCost)}
                      </div>
                    </div>
                    <Link
                      href={`/construction?plot=${plotArea}&floors=${selectedFloors}&pkg=${selectedPackageCode}#consultation`}
                      className="text-xs font-bold px-4 py-2 rounded-lg bg-gold text-charcoal hover:bg-gold-hover transition-colors shadow-gold flex items-center gap-1"
                    >
                      <span>Book Inspection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-ivory/50 leading-tight">
                  * Notice: The estimate above is indicative based on standard baseline specifications. Actual project costs depend on foundation depth, architectural elevation, soil test report, and client-selected sanitary/electrical brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

