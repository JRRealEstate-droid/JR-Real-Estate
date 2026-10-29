import React from 'react';
import { getAuditLogs } from '@/lib/data/content';
import { BRAND, CONSTRUCTION_PACKAGES } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { Settings, ShieldCheck, Database, HardHat, FileSpreadsheet, Key, AlertTriangle } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const auditLogs = await getAuditLogs();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ivory">
          Business Settings, Security &amp; Audit Logs
        </h1>
        <p className="text-xs text-ivory/60 mt-1">
          Company details, editable construction rates, security event logs, and database backup procedures.
        </p>
      </div>

      {/* Business Details & Indicative Rates in 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Business Settings */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <h2 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
              <Settings className="w-5 h-5 text-gold" />
              <span>Business Profile</span>
            </h2>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified
            </span>
          </div>

          <div className="space-y-3 text-xs text-ivory/80">
            <div>
              <span className="text-ivory/50 block">Organization Name</span>
              <strong className="text-ivory text-sm">{BRAND.name}</strong>
            </div>
            <div>
              <span className="text-ivory/50 block">Director Name</span>
              <strong className="text-gold text-sm">{BRAND.director}</strong>
            </div>
            <div>
              <span className="text-ivory/50 block">Primary Helpline</span>
              <strong className="text-ivory text-sm font-mono">+91 {BRAND.phone}</strong>
            </div>
            <div>
              <span className="text-ivory/50 block">Head Office Address</span>
              <strong className="text-ivory text-sm">{BRAND.address}</strong>
            </div>
            <div>
              <span className="text-ivory/50 block">Official Website</span>
              <strong className="text-gold text-sm font-mono">{BRAND.website}</strong>
            </div>
          </div>
        </div>

        {/* Indicative Construction Rates */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <h2 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
              <HardHat className="w-5 h-5 text-gold" />
              <span>Indicative Construction Rates</span>
            </h2>
            <span className="text-xs text-gold font-bold">Admin Managed</span>
          </div>

          <p className="text-xs text-ivory/60">
            These baseline rates per square foot are reflected across public calculator and estimate widgets.
          </p>

          <div className="space-y-3 text-xs">
            {CONSTRUCTION_PACKAGES.map((pkg) => (
              <div
                key={pkg.code}
                className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-ivory">{pkg.name}</div>
                  <div className="text-[10px] text-ivory/50">{pkg.headline}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-serif font-bold text-gold">
                    ₹ {pkg.ratePerSqFt}
                  </div>
                  <div className="text-[10px] text-ivory/50">/ sq.ft</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security & Audit Logs Viewer */}
      <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-charcoal-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <h2 className="font-serif font-bold text-base text-ivory">
              Security &amp; Action Audit Log
            </h2>
          </div>
          <span className="text-xs text-ivory/60 font-mono">Immutable Action Tracker</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-charcoal-300 text-ivory/60 border-b border-charcoal-100">
                <th className="py-2.5 px-4 font-semibold">Timestamp</th>
                <th className="py-2.5 px-4 font-semibold">Action</th>
                <th className="py-2.5 px-4 font-semibold">Entity</th>
                <th className="py-2.5 px-4 font-semibold">Authorized User</th>
                <th className="py-2.5 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100/50">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-charcoal-100/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-ivory/60">
                    {formatDateTime(log.timestamp)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-charcoal-300 text-gold border border-gold/30">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-ivory/80 font-medium">{log.entityType}</td>
                  <td className="py-3 px-4 text-ivory/70 font-mono text-[11px]">{log.userEmail}</td>
                  <td className="py-3 px-4 text-ivory/90">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Database Backup & Restore Documentation Card */}
      <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
          <Database className="w-5 h-5 text-gold" />
          <span>Database Backup &amp; Disaster Recovery Documentation</span>
        </h3>

        <div className="text-xs text-ivory/80 leading-relaxed space-y-3">
          <p>
            The production PostgreSQL database is hosted on <strong>Supabase</strong> with daily automated Point-In-Time Recovery (PITR) backups enabled. In addition, authorized administrators can execute manual and CLI backups using the documented commands below:
          </p>

          <div className="p-3 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-2">
            <div className="font-semibold text-gold">1. Manual Logical Database Dump (pg_dump):</div>
            <pre className="p-2 rounded bg-charcoal font-mono text-[11px] text-ivory/70 overflow-x-auto">
{`pg_dump -h db.supabase.co -U postgres -d postgres -F c -b -v -f jr_real_estate_backup_$(date +%Y%m%d).dump`}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-2">
            <div className="font-semibold text-gold">2. Database Restore Procedure:</div>
            <pre className="p-2 rounded bg-charcoal font-mono text-[11px] text-ivory/70 overflow-x-auto">
{`pg_restore -h db.supabase.co -U postgres -d postgres -v --clean jr_real_estate_backup_YYYYMMDD.dump`}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-1">
            <div className="font-semibold text-gold">3. Automated Prisma Migrations:</div>
            <div className="text-[11px] text-ivory/70 font-mono">
              npx prisma migrate deploy &bull; Uses DIRECT_URL (port 5432) for schema updates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

