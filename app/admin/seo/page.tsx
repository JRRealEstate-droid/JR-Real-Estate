import React from 'react';
import Link from 'next/link';
import { Search, Globe, FileCode2, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function AdminSeoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ivory">
          SEO, Meta Tags &amp; Search Indexing Controls
        </h1>
        <p className="text-xs text-ivory/60 mt-1">
          Configure search engine readability, canonical URLs, dynamic XML sitemaps, and robots.txt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sitemap & Robots Status */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <h2 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
              <Globe className="w-5 h-5 text-gold" />
              <span>Sitemap &amp; Crawler Access</span>
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ivory">XML Sitemap:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Dynamic (Next.js)
                </span>
              </div>
              <p className="text-ivory/60">
                Automatically indexes all published properties, builder projects, and guides. Admin and internal API routes are excluded.
              </p>
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="text-gold font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
              >
                <span>Preview /sitemap.xml</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ivory">Robots.txt:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              </div>
              <pre className="p-2.5 rounded bg-charcoal font-mono text-[11px] text-ivory/70 overflow-x-auto">
{`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api`}
              </pre>
            </div>
          </div>
        </div>

        {/* Global Metadata Preset */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <h2 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
              <Search className="w-5 h-5 text-gold" />
              <span>Global Meta Title &amp; OpenGraph</span>
            </h2>
          </div>

          <div className="space-y-3 text-xs text-ivory/80">
            <div>
              <label className="block text-ivory/60 font-medium mb-1">Default Meta Title</label>
              <div className="p-2.5 rounded-lg bg-charcoal-300 border border-charcoal-100 font-serif font-bold text-ivory">
                JR Real Estate Varanasi | Property &amp; Construction Solutions
              </div>
            </div>

            <div>
              <label className="block text-ivory/60 font-medium mb-1">Title Template</label>
              <div className="p-2.5 rounded-lg bg-charcoal-300 border border-charcoal-100 font-mono text-gold">
                %s | JR Real Estate Varanasi
              </div>
            </div>

            <div>
              <label className="block text-ivory/60 font-medium mb-1">Meta Description Preview</label>
              <div className="p-2.5 rounded-lg bg-charcoal-300 border border-charcoal-100 leading-relaxed text-ivory/70">
                Varanasi premier real estate consultancy and construction firm led by Director Mr. Umesh Yadav. Residential plots, luxury apartments, independent villas, commercial spaces, and turnkey building at Pandeypur Chauraha.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Canonical URLs enforced automatically across all property slugs without exposing database UUIDs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

