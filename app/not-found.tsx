import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-7xl font-serif font-bold text-gold">404</div>
        <h1 className="text-2xl font-serif font-bold text-ivory">
          Page Not Found
        </h1>
        <p className="text-xs text-ivory/70 leading-relaxed">
          The property listing or page you are looking for may have been sold, archived, or moved.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gold text-charcoal font-bold shadow-gold hover:bg-gold-hover transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/buy"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-charcoal-200 border border-charcoal-100 text-ivory hover:text-gold transition-colors"
          >
            <span>Browse Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
