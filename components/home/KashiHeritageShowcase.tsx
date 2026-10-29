'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BanarasiMedallion, BanarasiCornerAccent, DiyaGlow } from '@/components/ui/KashiMotifs';
import { ArrowRight, Compass, MapPin, Sparkles } from 'lucide-react';

const KASHI_SCENES = [
  {
    id: 'ghats-sunrise',
    title: 'Ganga Ghats & Sunrise Light',
    tag: 'Riverfront Serenity',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85',
    description: 'Golden morning light breaking over the sacred Ganga, bathing ancient stone ghats and tranquil rowing boats in dawn mist.',
    localityContext: 'Prime riverfront corridors & view-facing residential developments.',
  },
  {
    id: 'stone-architecture',
    title: 'Historic Stone Architecture',
    tag: 'Heritage & Craftsmanship',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85',
    description: 'Centuries-old sandstone pavilions, carved jharokhas, and temple shikhars representing Varanasi’s enduring structural legacy.',
    localityContext: 'Architectural inspiration for JR Real Estate turnkey home designs.',
  },
  {
    id: 'ancient-lanes',
    title: 'Historic Old-City Lanes (Galiyan)',
    tag: 'Timeless Neighborhoods',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=85',
    description: 'Stone-paved alleys, vintage wooden doorways, and warm neighborly courtyards reflecting Kashi’s close-knit community fabric.',
    localityContext: 'Preserving community values in modern gated residential enclaves.',
  },
  {
    id: 'evening-aarti',
    title: 'Twilight & Ganga Aarti Glow',
    tag: 'Spiritual Radiance',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=85',
    description: 'Golden brass lamps and twilight diyas casting reflections on the holy river Ganga as the evening bells chime across the city.',
    localityContext: 'Peaceful living environments within accessible reach of cultural hubs.',
  },
  {
    id: 'banarasi-craft',
    title: 'Banarasi Zari & Brocade Heritage',
    tag: 'Artisan Excellence',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    description: 'The master craft of Banarasi silk handlooms, weaving metallic gold and silver zari threads with patience and unyielding perfection.',
    localityContext: 'The same standard of craftsmanship we bring to our construction finishes.',
  },
  {
    id: 'historic-riverbank',
    title: 'The Eternal Riverfront Horizon',
    tag: 'Timeless Kashi',
    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=85',
    description: 'A panoramic expanse of Varanasi’s curved crescent riverbanks, stone steps, and morning prayer gatherings.',
    localityContext: 'Grounding every JR Real Estate venture in authentic local pride.',
  },
];

export function KashiHeritageShowcase() {
  const [selectedScene, setSelectedScene] = useState(0);

  return (
    <section className="py-24 bg-charcoal-400 bg-banarasi-pattern border-b border-charcoal-100 relative overflow-hidden">
      <DiyaGlow className="top-12 right-12 w-96 h-96" />
      <DiyaGlow className="bottom-12 left-12 w-96 h-96" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-200 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-[0.2em] shadow-gold">
            <BanarasiMedallion size={14} />
            <span>The Soul of Varanasi &bull; Heritage &amp; Modern Living</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight">
            Rooted in Kashi&apos;s Timeless Ground
          </h2>

          <p className="text-sm sm:text-base text-ivory/75 max-w-2xl mx-auto leading-relaxed">
            From the serene morning light over the Ganga ghats to centuries of stone masonry, narrow heritage lanes, and sacred twilight reflections — this is the land we call home, and where we build your family&apos;s future.
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-gold" />
            <BanarasiMedallion size={20} />
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent via-gold/40 to-gold" />
          </div>
        </div>

        {/* 6-Card Visual Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KASHI_SCENES.map((scene, index) => (
            <div
              key={scene.id}
              className="group relative rounded-2xl overflow-hidden bg-charcoal-200 border border-charcoal-100 hover:border-gold/60 transition-all duration-500 shadow-xl hover:shadow-gold/20 flex flex-col justify-between"
            >
              <BanarasiCornerAccent position="top-right" />

              <div>
                {/* Image Container with Clear Visibility */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-charcoal-300">
                  <Image
                    src={scene.image}
                    alt={scene.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95 contrast-105"
                  />
                  {/* Subtle lower gradient to ensure text over image remains readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/20" />

                  {/* Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-charcoal/90 text-gold border border-gold/40 shadow-md backdrop-blur-md">
                      {scene.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2.5">
                  <h3 className="font-serif font-bold text-xl text-ivory group-hover:text-gold transition-colors">
                    {scene.title}
                  </h3>

                  <p className="text-xs text-ivory/70 leading-relaxed">
                    {scene.description}
                  </p>
                </div>
              </div>

              {/* Context Callout Footer */}
              <div className="p-6 pt-0">
                <div className="p-3 rounded-xl bg-charcoal-300/80 border border-charcoal-100 text-[11px] text-ivory/60 flex items-start gap-2">
                  <Compass className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <span>{scene.localityContext}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Varanasi Grounding Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-charcoal-200 via-charcoal-100 to-charcoal-200 border border-gold/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Head Office at Pandeypur Chauraha</span>
            </div>
            <h4 className="font-serif font-bold text-xl sm:text-2xl text-ivory">
              Looking for Verified Land or a Home in Varanasi?
            </h4>
            <p className="text-xs text-ivory/70 max-w-xl">
              We guide you through authentic Tehsil revenue records, VDA map approvals, and site-inspections across prime Varanasi corridors.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/buy"
              className="px-6 py-3 rounded-lg bg-gold hover:bg-gold-hover text-charcoal font-bold text-xs shadow-gold transition-all"
            >
              Explore Varanasi Properties
            </Link>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-lg bg-charcoal-300 border border-charcoal-100 hover:border-gold/40 text-ivory text-xs font-semibold transition-all"
            >
              Visit Pandeypur Office
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

