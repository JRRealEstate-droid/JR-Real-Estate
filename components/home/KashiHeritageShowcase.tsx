'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BanarasiMedallion, BanarasiCornerAccent, DiyaGlow } from '@/components/ui/KashiMotifs';
import { ArrowRight, Compass, MapPin, Sparkles } from 'lucide-react';

const KASHI_SCENES = [
  {
    id: 'ghats-sunset',
    title: 'Golden Sunset over Ganga Ghats',
    tag: 'Riverfront Serenity',
    image: '/images/kashi-sunset-ghats.png',
    description: 'Golden evening light washing over ancient stone temples, riverside palaces, and wooden rowing boats on the Ganga.',
    localityContext: 'Prime river-facing and heritage corridor residential opportunities.',
  },
  {
    id: 'aerial-ghats',
    title: 'Historic Ghats & Temple Spires',
    tag: 'Living Heritage',
    image: '/images/kashi-aerial-ghats.png',
    description: 'A breathtaking high-angle view of Varanasi’s bustling morning ghats, sacred temple shikhars, and boats drifting along the river.',
    localityContext: 'Deep connection to Kashi’s culture while building modern homes.',
  },
  {
    id: 'golden-steps',
    title: 'Stone Steps & Morning Sunlight',
    tag: 'Timeless Varanasi',
    image: '/images/kashi-golden-steps.png',
    description: 'Sunlight gleaming on the stone pauri steps with swooping birds and peaceful boats anchored along the riverbank.',
    localityContext: 'Enduring stone craftsmanship reflected in JR Real Estate construction.',
  },
  {
    id: 'ganga-aarti',
    title: 'Sacred Ganga Aarti & River Altar',
    tag: 'Spiritual Sanctity',
    image: '/images/kashi-trishul-aarti.png',
    description: 'The auspicious golden Trishul and Nataraja altar facing the tranquil holy waters during the sacred twilight Ganga Aarti.',
    localityContext: 'Guiding every property transaction with reverence and honesty.',
  },
  {
    id: 'varanasi-boats',
    title: 'Iconic Painted Boats & Heritage Skyline',
    tag: 'Kashi Identity',
    image: '/images/kashi-varanasi-boats.png',
    description: 'Traditional handcrafted wooden boats resting on the Varanasi shoreline against the backdrop of historic stone architecture.',
    localityContext: 'Rooted in local knowledge from Pandeypur Chauraha to the bypass.',
  },
  {
    id: 'golden-panorama',
    title: 'The Eternal Riverfront Horizon',
    tag: 'Dawn Light',
    image: '/images/varanasi-golden-ghats.jpg',
    description: 'The golden hour panorama across the crescent curve of the Ganges, evoking eternal peace and timeless prosperity.',
    localityContext: 'Your dream home in Varanasi, built with uncompromising responsibility.',
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
                    unoptimized={true}
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

