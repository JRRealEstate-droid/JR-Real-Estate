import React from 'react';
import Link from 'next/link';
import { getLeads } from '@/lib/data/leads';
import { formatDate } from '@/lib/utils';
import { HardHat, Phone, MapPin, Ruler, Layers, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function AdminConstructionPage() {
  const allLeads = await getLeads();
  const constructionLeads = allLeads.filter(
    (l) => l.leadSource === 'CONSTRUCTION_FORM' || l.leadSource === 'ESTIMATE_CALCULATOR' || Boolean(l.constructionDetails)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ivory">
            Home Construction &amp; Turnkey Enquiries
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Review plot sizes, planned floors, structural engineering requests, and preliminary cost estimates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {constructionLeads.map((lead) => {
          const details = lead.constructionDetails;
          return (
            <div
              key={lead.id}
              className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gold text-xs">
                    {lead.referenceCode}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {lead.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-ivory mt-2">
                  {lead.fullName}
                </h3>

                <div className="text-xs text-gold/90 font-medium flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                  <a href={`tel:${lead.phone}`} className="hover:underline">
                    +91 {lead.phone}
                  </a>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100/60 text-xs space-y-2">
                  <div className="flex justify-between pb-1.5 border-b border-charcoal-100/40">
                    <span className="text-ivory/60">Plot Location:</span>
                    <strong className="text-ivory">{details?.plotLocation || lead.localityPreference || 'Varanasi'}</strong>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-charcoal-100/40">
                    <span className="text-ivory/60">Plot Area:</span>
                    <strong className="text-ivory">{details?.plotAreaSqFt || '1,200'} sq.ft</strong>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-charcoal-100/40">
                    <span className="text-ivory/60">Structure:</span>
                    <strong className="text-ivory">{details?.plannedFloors || 'G+1'}</strong>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-charcoal-100/40">
                    <span className="text-ivory/60">Finishing Package:</span>
                    <strong className="text-gold">{details?.preferredPackage || 'PREMIUM'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Drawings Ready:</span>
                    <strong className="text-ivory">{details?.drawingsAvailable ? 'Yes' : 'Needs Architectural Plan'}</strong>
                  </div>
                </div>

                {lead.requirementDetails && (
                  <p className="text-xs text-ivory/70 mt-3 line-clamp-2 italic">
                    &ldquo;{lead.requirementDetails}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs">
                <span className="text-ivory/50">Recd: {formatDate(lead.createdAt)}</span>
                <Link
                  href={`/admin/leads?id=${lead.id}`}
                  className="text-gold font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open CRM Lead</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}

        {constructionLeads.length === 0 && (
          <div className="col-span-full text-center py-12 text-ivory/50 text-xs bg-charcoal-200 rounded-xl">
            No construction requests in pipeline.
          </div>
        )}
      </div>
    </div>
  );
}
