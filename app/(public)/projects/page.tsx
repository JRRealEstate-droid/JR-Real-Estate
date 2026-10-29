import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/data/projects';
import { BRAND } from '@/lib/constants';
import { MapPin, Building, Calendar, ArrowRight, ShieldAlert, Sparkles, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'New Builder Projects in Varanasi | Luxury Apartments & Townships',
  description:
    'Discover upcoming and under-construction residential townships, high-rise apartments, and commercial projects in Varanasi across Ring Road, Paharia, and Sarnath.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-ivory/60">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-gold font-medium">New Projects</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            New Residential &amp; Builder Projects in Varanasi
          </h1>
          <p className="text-sm text-ivory/70 max-w-2xl leading-relaxed">
            Curated modern masterplans featuring planned infrastructure, dedicated clubhouses, earthquake-resistant RCC construction, and high connectivity along major Varanasi highway corridors.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((prj) => (
            <div
              key={prj.id}
              className="bg-charcoal-200 border border-charcoal-100 hover:border-gold/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/9] w-full bg-charcoal-300 overflow-hidden">
                  <Image
                    src={prj.images[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                    alt={prj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-charcoal/90 text-gold border border-gold/40 backdrop-blur-sm">
                      {prj.status.replace(/_/g, ' ')}
                    </span>
                    {prj.isSampleData && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                        Dev Sample
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="text-base font-serif font-bold text-gold drop-shadow-md bg-charcoal/80 px-3 py-1 rounded border border-gold/20">
                      {prj.priceRangeDisplay}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-gold font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{prj.localityName}, Varanasi</span>
                    </span>
                    <span className="text-ivory/60 font-mono text-[11px]">{prj.referenceId}</span>
                  </div>

                  <Link href={`/projects/${prj.slug}`}>
                    <h2 className="font-serif font-bold text-2xl text-ivory group-hover:text-gold transition-colors">
                      {prj.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-ivory/70 line-clamp-2 leading-relaxed">
                    {prj.description}
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs text-ivory/80">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>Developer: <strong>{prj.builderName}</strong></span>
                    </div>
                    {prj.completionDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>Expected Possession: <strong>{prj.completionDate}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Highlights Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {prj.highlights?.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-charcoal-300 text-ivory/80 border border-charcoal-100"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-charcoal-100/60 mt-4 flex items-center justify-between gap-3">
                <Link
                  href={`/projects/${prj.slug}`}
                  className="flex-1 text-center py-2.5 px-3 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/contact?intent=brochure&ref=${prj.referenceId}`}
                  className="py-2.5 px-3 rounded-lg bg-charcoal-300 border border-charcoal-100 hover:border-gold/40 text-ivory text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-gold" />
                  <span>Brochure</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* RERA Notice & Legal Disclosure */}
        <div className="p-5 rounded-xl bg-charcoal-200 border border-charcoal-100 text-xs text-ivory/60 space-y-2">
          <div className="flex items-center gap-2 text-gold font-semibold">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>Statutory RERA &amp; Project Disclaimer</span>
          </div>
          <p>
            Project details, floor plans, specifications, and possession timelines displayed here represent builder projections. Buyers are advised to independently verify UP-RERA registration status and sanction plans directly on the official UP-RERA portal (up-rera.in) before making financial commitments.
          </p>
        </div>
      </div>
    </div>
  );
}
