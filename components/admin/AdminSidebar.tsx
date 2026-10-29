'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import {
  LayoutDashboard,
  Building,
  Users,
  Calendar,
  HardHat,
  Sparkles,
  MapPin,
  FileText,
  Image as ImageIcon,
  Search,
  ShieldCheck,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads CRM', href: '/admin/leads', icon: Users, badge: 'Live' },
  { name: 'Properties', href: '/admin/properties', icon: Building },
  { name: 'Site Visits', href: '/admin/site-visits', icon: Calendar },
  { name: 'Construction Leads', href: '/admin/construction', icon: HardHat },
  { name: 'Builder Projects', href: '/admin/projects', icon: Sparkles },
  { name: 'Localities & Tags', href: '/admin/taxonomies', icon: MapPin },
  { name: 'Content & CMS', href: '/admin/content', icon: FileText },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'SEO & Indexing', href: '/admin/seo', icon: Search },
  { name: 'Team & Roles', href: '/admin/team', icon: ShieldCheck },
  { name: 'Settings & Audit Logs', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-charcoal-400 border-r border-charcoal-100 flex flex-col justify-between h-screen sticky top-0 z-30">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-charcoal-100 flex items-center justify-between">
          <Logo size="sm" />
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
            CRM
          </span>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gold text-charcoal font-bold shadow-gold'
                    : 'text-ivory/70 hover:text-gold hover:bg-charcoal-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-charcoal' : 'text-gold'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-charcoal text-gold' : 'bg-gold/20 text-gold'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Utility Actions */}
      <div className="p-4 border-t border-charcoal-100 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-charcoal-300 hover:bg-charcoal-200 text-ivory/70 hover:text-gold text-xs transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
            <span>Open Public Website</span>
          </div>
          <span className="text-[10px] text-ivory/40">&rarr;</span>
        </Link>
      </div>
    </aside>
  );
}

