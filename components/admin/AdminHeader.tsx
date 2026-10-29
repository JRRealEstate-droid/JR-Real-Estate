'use client';

import React from 'react';
import Link from 'next/link';
import { User, Bell, Plus, ShieldCheck, Database } from 'lucide-react';
import { BRAND } from '@/lib/constants';

interface AdminHeaderProps {
  userRole?: string;
  userName?: string;
}

export function AdminHeader({
  userRole = 'SUPER_ADMIN',
  userName = 'Mr. Umesh Yadav',
}: AdminHeaderProps) {
  return (
    <header className="h-16 bg-charcoal-400 border-b border-charcoal-100 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-xs text-ivory/50">JR Real Estate Varanasi</span>
          <h1 className="text-sm font-bold text-ivory flex items-center gap-2">
            <span>Management &amp; Lead CRM</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Operational</span>
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Add Dropdown or CTA */}
        <Link
          href="/admin/properties?action=new"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Add Property</span>
        </Link>

        {/* User Pill */}
        <div className="flex items-center gap-3 pl-4 border-l border-charcoal-100">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold to-gold-light p-[1.5px] flex-shrink-0">
            <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center font-bold text-xs text-gold">
              UY
            </div>
          </div>
          <div className="hidden sm:block text-left text-xs">
            <div className="font-semibold text-ivory leading-tight">{userName}</div>
            <div className="text-[10px] text-gold font-mono uppercase tracking-wider">
              {userRole.replace(/_/g, ' ')}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
