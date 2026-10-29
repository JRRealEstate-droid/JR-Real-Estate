import React from 'react';
import Link from 'next/link';
import { getSiteVisits } from '@/lib/data/site-visits';
import { formatDate } from '@/lib/utils';
import { Calendar, Phone, Clock, MapPin, CheckCircle2, User, Building } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSiteVisitsPage() {
  const visits = await getSiteVisits();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ivory">
            Scheduled Site Inspections &amp; Visits
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Track customer on-site visits across Varanasi plots, apartments, and construction locations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl hover:border-gold/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-gold">
                  {visit.propertyRef || 'GENERAL VISIT'}
                </span>
                <h3 className="font-serif font-bold text-lg text-ivory mt-0.5">
                  {visit.leadName}
                </h3>
                <div className="text-xs text-gold/90 font-medium flex items-center gap-2 mt-1">
                  <Phone className="w-3.5 h-3.5" />
                  <a href={`tel:${visit.leadPhone}`} className="hover:underline">
                    +91 {visit.leadPhone}
                  </a>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  visit.status === 'CONFIRMED'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {visit.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-300 border border-charcoal-100/60 text-xs text-ivory/80 space-y-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>
                  Scheduled Date &amp; Time:{' '}
                  <strong className="text-ivory font-mono">
                    {new Date(visit.scheduledAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </strong>
                </span>
              </div>

              {visit.propertyTitle && (
                <div className="flex items-start gap-2">
                  <Building className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    Property: <strong>{visit.propertyTitle}</strong>
                  </span>
                </div>
              )}

              {visit.visitNotes && (
                <div className="pt-1 text-ivory/60 italic text-[11px]">
                  &ldquo;{visit.visitNotes}&rdquo;
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-charcoal-100 text-xs text-ivory/60">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold" />
                <span>Assigned Staff: <strong>{visit.staffName}</strong></span>
              </span>

              <Link
                href={`/admin/leads?id=${visit.leadId}`}
                className="text-gold font-bold hover:underline"
              >
                View Full Lead &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

