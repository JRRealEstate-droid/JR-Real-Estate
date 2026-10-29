import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProjects } from '@/lib/data/projects';
import { Sparkles, MapPin, Building, Plus, ArrowRight, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ivory">
            Builder Projects &amp; Townships
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Manage multi-storey residential complexes, plotted townships, and RERA compliance data.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Project</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((prj) => (
          <div
            key={prj.id}
            className="bg-charcoal-200 border border-charcoal-100 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] w-full bg-charcoal-300">
                <Image
                  src={prj.images[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                  alt={prj.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-charcoal/90 text-gold border border-gold/40">
                    {prj.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs font-serif font-bold text-gold bg-charcoal/80 px-2.5 py-1 rounded">
                    {prj.priceRangeDisplay}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gold font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{prj.localityName}</span>
                  </span>
                  <span className="font-mono text-ivory/50">{prj.referenceId}</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-ivory">
                  {prj.title}
                </h3>

                <p className="text-xs text-ivory/70 line-clamp-2 leading-relaxed">
                  {prj.description}
                </p>

                <div className="text-xs text-ivory/60 pt-2 border-t border-charcoal-100 space-y-1">
                  <div>Developer: <strong className="text-ivory">{prj.builderName}</strong></div>
                  <div>RERA ID: <strong className="text-ivory font-mono">{prj.reraNumber || 'Pending Owner Confirmation'}</strong></div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-charcoal-100/60 flex items-center justify-between">
              <Link
                href={`/projects/${prj.slug}`}
                target="_blank"
                className="text-xs font-semibold text-ivory/70 hover:text-gold flex items-center gap-1"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
