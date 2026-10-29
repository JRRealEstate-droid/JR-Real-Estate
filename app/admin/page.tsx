import React from 'react';
import Link from 'next/link';
import { getDashboardStats } from '@/lib/data/dashboard';
import { formatCurrencyINR, formatDate } from '@/lib/utils';
import {
  Building,
  Users,
  Calendar,
  HardHat,
  ArrowRight,
  Plus,
  Clock,
  Phone,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  MapPin,
} from 'lucide-react';

export const revalidate = 0; // Dynamic live admin dashboard

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Page Title & Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ivory">
            Executive Overview &amp; Lead Pipeline
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Real-time activity across Varanasi properties, site visits, and construction enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/reports/leads"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-charcoal-200 hover:bg-charcoal-100 border border-charcoal-100 text-xs text-ivory/80 font-medium transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-gold" />
            <span>Export Leads CSV</span>
          </a>

          <Link
            href="/admin/properties?action=new"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Property</span>
          </Link>
        </div>
      </div>

      {/* 4 Live Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Active Properties */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-gold/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ivory/60 uppercase tracking-wider">
              Active Properties
            </span>
            <div className="p-2 rounded-lg bg-gold/10 text-gold border border-gold/20">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-serif font-bold text-ivory">
              {stats.activeProperties}
            </div>
            <div className="text-[11px] text-ivory/50">
              {stats.draftProperties} in draft review
            </div>
          </div>
          <Link
            href="/admin/properties"
            className="text-[11px] font-semibold text-gold hover:underline flex items-center gap-1 pt-1"
          >
            <span>Manage listings</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Uncontacted Leads */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-gold/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ivory/60 uppercase tracking-wider">
              Uncontacted Leads
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-serif font-bold text-amber-400">
              {stats.uncontactedLeads}
            </div>
            <div className="text-[11px] text-ivory/50">
              {stats.totalLeads} total in CRM
            </div>
          </div>
          <Link
            href="/admin/leads?status=NEW"
            className="text-[11px] font-semibold text-gold hover:underline flex items-center gap-1 pt-1"
          >
            <span>Process new leads</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Upcoming Site Visits */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-gold/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ivory/60 uppercase tracking-wider">
              Upcoming Site Visits
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-serif font-bold text-emerald-400">
              {stats.upcomingVisits}
            </div>
            <div className="text-[11px] text-ivory/50">
              Scheduled this week
            </div>
          </div>
          <Link
            href="/admin/site-visits"
            className="text-[11px] font-semibold text-gold hover:underline flex items-center gap-1 pt-1"
          >
            <span>View inspection schedule</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Open Construction Leads */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-gold/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ivory/60 uppercase tracking-wider">
              Open Construction Leads
            </span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <HardHat className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-serif font-bold text-ivory">
              {stats.openConstructionLeads}
            </div>
            <div className="text-[11px] text-ivory/50">
              Turnkey &amp; Estimates
            </div>
          </div>
          <Link
            href="/admin/construction"
            className="text-[11px] font-semibold text-gold hover:underline flex items-center gap-1 pt-1"
          >
            <span>View engineering requests</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Leads Table Left (8 Cols), Upcoming Visits Right (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries Table */}
        <div className="lg:col-span-8 bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <div>
              <h2 className="font-serif font-bold text-lg text-ivory">
                Recent Lead Inquiries
              </h2>
              <p className="text-xs text-ivory/60">
                Incoming property, construction, and visit requests.
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
            >
              <span>View All Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-ivory/50 border-b border-charcoal-100/60 pb-2">
                  <th className="py-2.5 font-semibold">Ref Code</th>
                  <th className="py-2.5 font-semibold">Customer</th>
                  <th className="py-2.5 font-semibold">Source</th>
                  <th className="py-2.5 font-semibold">Locality / Property</th>
                  <th className="py-2.5 font-semibold">Status</th>
                  <th className="py-2.5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100/40">
                {stats.recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-charcoal-100/50 transition-colors">
                    <td className="py-3 font-mono font-bold text-gold">
                      {lead.referenceCode}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-ivory">{lead.fullName}</div>
                      <div className="text-[11px] text-ivory/60 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-gold/70" />
                        <span>{lead.phone}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-charcoal-300 border border-charcoal-100 text-ivory/80">
                        {lead.leadSource.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-ivory/80">
                      {lead.propertyTitle ? (
                        <span className="truncate block max-w-xs">{lead.propertyTitle}</span>
                      ) : (
                        <span>{lead.localityPreference || 'Varanasi'}</span>
                      )}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.status === 'NEW'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : lead.status === 'VISIT_SCHEDULED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-charcoal-300 text-ivory/70 border border-charcoal-100'
                      }`}>
                        {lead.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/leads?id=${lead.id}`}
                        className="px-2.5 py-1 rounded bg-charcoal-300 hover:bg-gold hover:text-charcoal border border-charcoal-100 text-gold font-bold text-[11px] transition-colors"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Scheduled Site Visits (4 Cols) */}
        <div className="lg:col-span-4 bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <div>
              <h2 className="font-serif font-bold text-lg text-ivory">
                Site Inspection Schedule
              </h2>
              <p className="text-xs text-ivory/60">Upcoming on-site visits.</p>
            </div>
            <Link
              href="/admin/site-visits"
              className="text-xs font-semibold text-gold hover:underline"
            >
              All Visits
            </Link>
          </div>

          <div className="space-y-3">
            {stats.upcomingVisitsList.map((visit) => (
              <div
                key={visit.id}
                className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-2 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ivory">{visit.leadName}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {visit.status}
                  </span>
                </div>

                <div className="text-[11px] text-gold font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(visit.scheduledAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {visit.propertyTitle && (
                  <div className="text-xs text-ivory/80 line-clamp-1">
                    Property: <strong>{visit.propertyRef}</strong> - {visit.propertyTitle}
                  </div>
                )}

                <div className="text-[11px] text-ivory/60 flex items-center justify-between pt-1 border-t border-charcoal-100/60">
                  <span>Assigned: {visit.staffName}</span>
                  <a href={`tel:${visit.leadPhone}`} className="text-gold font-bold hover:underline">
                    Call: {visit.leadPhone}
                  </a>
                </div>
              </div>
            ))}

            {stats.upcomingVisitsList.length === 0 && (
              <p className="text-xs text-ivory/60 text-center py-6">
                No site visits scheduled for today.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

