'use client';

import React, { useState } from 'react';
import { submitConstructionInquiry } from '@/app/actions/leads';
import { BRAND, CONSTRUCTION_PACKAGES, VARANASI_LOCALITIES } from '@/lib/constants';
import { formatCurrencyINR } from '@/lib/utils';
import {
  Compass,
  CheckCircle2,
  Calculator,
  ShieldCheck,
  Send,
  HardHat,
  AlertCircle,
  FileSpreadsheet,
  Layers,
  Phone,
  Ruler,
  Calendar,
} from 'lucide-react';

export default function ConstructionPage() {
  // Estimator state
  const [plotArea, setPlotArea] = useState<number>(1200);
  const [floors, setFloors] = useState<number>(2);
  const [selectedPkgCode, setSelectedPkgCode] = useState<string>('PREMIUM');

  // Form submission state
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; referenceCode?: string; error?: string } | null>(null);

  const selectedPackage =
    CONSTRUCTION_PACKAGES.find((p) => p.code === selectedPkgCode) || CONSTRUCTION_PACKAGES[1];

  const totalBuiltUpArea = plotArea * floors;
  const estimatedCost = totalBuiltUpArea * selectedPackage.ratePerSqFt;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    formData.append('preferredPackage', selectedPkgCode);
    formData.append('plotAreaSqFt', plotArea.toString());
    formData.append('plannedFloors', `G+${floors - 1}`);
    formData.append('estimatedBudget', formatCurrencyINR(estimatedCost));

    const res = await submitConstructionInquiry(formData);
    setResult(res);
    setSubmitting(false);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
            <HardHat className="w-3.5 h-3.5" />
            <span>Turnkey Home Construction &amp; Architectural Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight leading-tight">
            Build Your Multi-Generational Home in Varanasi
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 leading-relaxed">
            End-to-end residential and commercial contracting. From structural 2D/3D design and VDA map approval to seismic RCC foundation, branded raw materials, and designer turnkey finishing.
          </p>
        </div>

        {/* 3 Package Comparison Cards */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-gold uppercase tracking-wider text-xs font-semibold">
              Transparent Milestone Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory mt-1">
              Construction Packages &amp; Material Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONSTRUCTION_PACKAGES.map((pkg) => (
              <div
                key={pkg.code}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-charcoal-200 border-2 border-gold shadow-gold-lg'
                    : 'bg-charcoal-200/80 border border-charcoal-100'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gold text-charcoal text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-ivory">{pkg.name}</h3>
                    <div className="text-right">
                      <span className="text-2xl font-serif font-bold text-gold">
                        ₹ {pkg.ratePerSqFt}
                      </span>
                      <span className="text-[11px] text-ivory/60 block">/ sq.ft built-up</span>
                    </div>
                  </div>

                  <p className="text-xs text-gold/90 font-medium mt-2">{pkg.headline}</p>
                  <p className="text-xs text-ivory/70 mt-1 leading-relaxed">{pkg.description}</p>

                  <div className="mt-6 pt-6 border-t border-charcoal-100 space-y-2.5">
                    <div className="text-xs font-bold text-ivory uppercase tracking-wider mb-2">
                      Materials &amp; Brand Standards:
                    </div>
                    {pkg.specifications.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-ivory/80 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-charcoal-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPkgCode(pkg.code);
                      const el = document.getElementById('estimator');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                      selectedPkgCode === pkg.code
                        ? 'bg-gold text-charcoal shadow-gold'
                        : 'bg-charcoal-300 text-ivory hover:text-gold border border-charcoal-100'
                    }`}
                  >
                    {selectedPkgCode === pkg.code ? 'Selected in Calculator' : 'Select Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicative Cost Estimator Interactive Section */}
        <div id="estimator" className="bg-charcoal-300 border border-gold/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="border-b border-charcoal-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold mb-1">
                <Calculator className="w-4 h-4" />
                <span>Interactive Cost Estimator</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-ivory">
                Estimate Construction Budget for Your Plot in Varanasi
              </h2>
            </div>

            <div className="text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg">
              * Rates are admin-managed and indicative based on baseline engineering.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls Left */}
            <div className="lg:col-span-7 space-y-6">
              {/* Plot area */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-ivory/80">Plot Footprint Area</span>
                  <span className="text-gold font-bold font-mono text-base">{plotArea} sq.ft</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="5000"
                  step="50"
                  value={plotArea}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full accent-gold h-2.5 bg-charcoal-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-ivory/50 mt-1 font-mono">
                  <span>600 sq.ft</span>
                  <span>2,000 sq.ft</span>
                  <span>3,500 sq.ft</span>
                  <span>5,000 sq.ft</span>
                </div>
              </div>

              {/* Number of Floors */}
              <div>
                <label className="block text-xs font-medium text-ivory/80 mb-2">
                  Number of Floors (Structure)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Ground Floor only', num: 1 },
                    { label: 'G + 1 (2 Floors)', num: 2 },
                    { label: 'G + 2 (3 Floors)', num: 3 },
                    { label: 'G + 3 (4 Floors)', num: 4 },
                  ].map((item) => (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => setFloors(item.num)}
                      className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all text-center ${
                        floors === item.num
                          ? 'bg-gold text-charcoal font-bold shadow-gold'
                          : 'bg-charcoal-200 text-ivory/70 border border-charcoal-100 hover:border-gold/30'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package selector buttons */}
              <div>
                <label className="block text-xs font-medium text-ivory/80 mb-2">
                  Selected Specification Package
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CONSTRUCTION_PACKAGES.map((p) => (
                    <button
                      key={p.code}
                      type="button"
                      onClick={() => setSelectedPkgCode(p.code)}
                      className={`p-3 rounded-lg text-left transition-all border ${
                        selectedPkgCode === p.code
                          ? 'border-gold bg-gold/15 text-gold font-bold'
                          : 'border-charcoal-100 bg-charcoal-200 text-ivory/70'
                      }`}
                    >
                      <div className="text-xs">{p.name}</div>
                      <div className="text-[11px] font-mono text-gold mt-1">₹ {p.ratePerSqFt}/sq.ft</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations Box Right */}
            <div className="lg:col-span-5 bg-charcoal-200 border border-gold/40 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
              <h3 className="font-serif font-bold text-lg text-ivory pb-2 border-b border-charcoal-100">
                Estimated Breakdown
              </h3>

              <div className="space-y-3 text-xs text-ivory/80">
                <div className="flex justify-between pb-2 border-b border-charcoal-100/60">
                  <span>Plot Footprint Area:</span>
                  <span className="font-mono font-bold text-ivory">{plotArea} sq.ft</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-charcoal-100/60">
                  <span>Structure Floors:</span>
                  <span className="font-mono font-bold text-ivory">G + {floors - 1}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-charcoal-100/60">
                  <span>Total Built-Up Area:</span>
                  <span className="font-mono font-bold text-gold">{totalBuiltUpArea.toLocaleString()} sq.ft</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-charcoal-100/60">
                  <span>Package Rate:</span>
                  <span className="font-mono font-bold text-ivory">₹ {selectedPackage.ratePerSqFt} / sq.ft</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-ivory/60 uppercase tracking-wider block">
                  Indicative Project Cost
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-gold">
                  {formatCurrencyINR(estimatedCost)}
                </span>
              </div>

              <a
                href="#booking-form"
                className="w-full block text-center py-3 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors"
              >
                Proceed to Book Site Inspection
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Construction Inquiry Form */}
        <div id="booking-form" className="bg-charcoal-200 border border-charcoal-100 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="border-b border-charcoal-100 pb-4">
            <h2 className="font-serif font-bold text-2xl text-ivory">
              Book a Free Plot Inspection &amp; Engineering Consultation
            </h2>
            <p className="text-xs text-ivory/60 mt-1">
              Our site engineers will visit your plot in Varanasi, assess soil condition, discuss your floor requirements, and provide a detailed itemized bill of quantities.
            </p>
          </div>

          {result?.success && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{result.message}</p>
                <p className="text-[11px] text-emerald-200 mt-1">
                  Reference Ticket: <strong className="font-mono text-white">{result.referenceCode}</strong>.
                </p>
              </div>
            </div>
          )}

          {result?.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{result.error}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-ivory/80 font-medium mb-1">Your Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Umesh Yadav"
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
                <label className="block text-ivory/80 font-medium mb-1">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@gmail.com"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-ivory/80 font-medium mb-1">Plot Location in Varanasi *</label>
                <input
                  type="text"
                  name="plotLocation"
                  required
                  placeholder="e.g. Shivpur, Pandeypur, Paharia..."
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">Plot Ownership Status *</label>
                <select
                  name="plotOwnership"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                >
                  <option value="OWNED">Plot Owned &amp; Registered</option>
                  <option value="IN_PROCESS">Registry In Process</option>
                  <option value="LOOKING_TO_BUY">Looking to Buy Plot + Build</option>
                </select>
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">Expected Start Timeline</label>
                <select
                  name="expectedStartDate"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                >
                  <option value="Immediately (Within 30 days)">Immediately (Within 30 days)</option>
                  <option value="Next 2-3 Months">Next 2-3 Months</option>
                  <option value="Planning Phase / Next Year">Planning Phase / Next Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-2 p-3 rounded-lg bg-charcoal-300 border border-charcoal-100 cursor-pointer">
                <input
                  type="checkbox"
                  name="drawingsAvailable"
                  value="true"
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-ivory/80 text-xs">
                  I already have 2D architectural drawings / VDA map sanction.
                </span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-lg bg-charcoal-300 border border-charcoal-100 cursor-pointer">
                <input
                  type="checkbox"
                  name="siteInspectionRequested"
                  value="true"
                  defaultChecked
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-ivory/80 text-xs">
                  Schedule on-site soil and physical inspection by site engineer.
                </span>
              </label>
            </div>

            <div>
              <label className="block text-ivory/80 font-medium mb-1">
                Specific Customizations or Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Number of bedrooms per floor, modular kitchen requirement, private parking porch, Vastu orientation..."
                className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark text-charcoal font-bold text-sm shadow-gold hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting Request...' : 'Submit Construction Request & Book Inspection'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
