'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectItem } from '@/lib/data/projects';
import { MapPin, ArrowRight } from 'lucide-react';
import { BanarasiMedallion, BanarasiCornerAccent } from '@/components/ui/KashiMotifs';

interface ProjectsSpotlightProps {
  projects: ProjectItem[];
}

export function ProjectsSpotlight({ projects }: ProjectsSpotlightProps) {
  return (
    <section className="py-20 bg-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BanarasiMedallion size={14} />
              <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                Planned Communities &bull; Growth Corridors
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
              New Projects &amp; Builder Enclaves
            </h2>
            <p className="text-sm text-ivory/70 mt-2 max-w-xl">
              Townships and residential developments with dedicated wide roads, park greenery, and convenient Ring Road connectivity.
            </p>
          </div>

          <Link
            href="/projects"
            className="text-xs font-semibold text-gold hover:text-gold-light transition-colors flex items-center gap-1 group self-start sm:self-end"
          >
            <span>View All Builder Projects</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((prj) => (
            <div
              key={prj.id}
              className="group relative bg-charcoal-200/90 rounded-2xl overflow-hidden border border-charcoal-100 hover:border-gold/50 transition-all duration-300 shadow-xl flex flex-col md:flex-row"
            >
              <BanarasiCornerAccent position="top-right" />

              {/* Image */}
              <div className="relative md:w-5/12 aspect-[16/11] md:aspect-auto overflow-hidden bg-charcoal-300">
                <Image
                  src={prj.images[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                  alt={prj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-charcoal/90 text-gold border border-gold/40 shadow-sm backdrop-blur-sm">
                    {prj.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gold font-medium mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{prj.localityName}, Varanasi</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-ivory group-hover:text-gold transition-colors">
                    {prj.title}
                  </h3>

                  <p className="text-xs text-ivory/70 mt-2 line-clamp-3 leading-relaxed">
                    {prj.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {prj.highlights?.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-charcoal-300 text-ivory/80 border border-charcoal-100"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Link */}
                <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-ivory/60 uppercase">Price Range</div>
                    <div className="text-base font-serif font-bold text-gold">
                      {prj.priceRangeDisplay || 'Price on Request'}
                    </div>
                  </div>

                  <Link
                    href={`/projects/${prj.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:text-gold-light group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
