import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { MapPin, CheckCircle2, Clock, HardHat, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Work & Construction Portfolio | JR Real Estate Varanasi',
  description:
    'Explore completed and ongoing residential duplex villas, turnkey home construction sites, and commercial structures built by JR Real Estate in Varanasi.',
};

const PORTFOLIO_PROJECTS = [
  {
    title: 'Modern Duplex Residence (G+1)',
    locality: 'Shivpur, Varanasi',
    type: 'Turnkey Residential Construction',
    stage: 'COMPLETED & HANDED OVER',
    area: '2,650 sq.ft Built-Up',
    description: 'Earthquake-resistant RCC structure with Tata Tiscon steel, double-height living hall, modular kitchen, and exterior weather-coat paint.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Tata Tiscon FE-550', 'Ultratech Cement', 'Vitrified Glazed Tiles'],
  },
  {
    title: 'Contemporary 3-Storey Family Kothi (G+2)',
    locality: 'Pandeypur Chauraha Colony, Varanasi',
    type: 'Full Turnkey Execution',
    stage: 'FINISHING & INTERIORS',
    area: '3,800 sq.ft Built-Up',
    description: 'Triple-storey luxury family residence featuring dedicated portico car porch, false ceiling with LED profiles, and Jaquar bath fittings.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    tags: ['Seismic Detailing', 'Monsoon Waterproofing', 'Teak Wood Doors'],
  },
  {
    title: 'Commercial Retail Complex',
    locality: 'Ring Road Phase-1, Paharia, Varanasi',
    type: 'Commercial Contracting',
    stage: 'STRUCTURAL SLAB CASTING',
    area: '5,200 sq.ft Built-Up',
    description: 'Heavy-duty commercial RCC column framework designed for multi-tier retail display and upper corporate office suites.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Commercial RCC', 'VDA Approved', 'High Ceilings'],
  },
  {
    title: 'Heritage-Style Independent Villa',
    locality: 'Near Sarnath, Varanasi',
    type: 'Architectural Turnkey Project',
    stage: 'COMPLETED',
    area: '2,200 sq.ft Built-Up',
    description: 'Vastu-compliant peaceful residence with brick arch details, private terrace garden, and solar-ready net metering conduit.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    tags: ['Vastu Compliant', 'Solar Conduit', 'AAC Blocks'],
  },
];

export default function PortfolioPage() {
  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
            <HardHat className="w-3.5 h-3.5" />
            <span>Site Execution &amp; Engineering Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Our Construction Portfolio
          </h1>

          <p className="text-sm text-ivory/70 leading-relaxed">
            Take a look at active construction sites and successfully handed-over residences across prime neighborhoods of Varanasi.
          </p>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_PROJECTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-charcoal-200 border border-charcoal-100 rounded-2xl overflow-hidden shadow-xl hover:border-gold/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-charcoal-300 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-charcoal/90 text-gold border border-gold/40 backdrop-blur-sm">
                      {item.stage}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs font-mono font-semibold bg-charcoal/80 text-ivory/90 px-2.5 py-1 rounded border border-charcoal-50 backdrop-blur-sm">
                      {item.area}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-gold font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.locality}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-ivory group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-ivory/70 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-charcoal-300 text-ivory/80 border border-charcoal-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2">
                <Link
                  href="/construction#booking-form"
                  className="w-full py-2.5 rounded-lg bg-charcoal-300 hover:bg-gold hover:text-charcoal border border-charcoal-100 hover:border-gold text-gold text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Request Site Visit to Active Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

