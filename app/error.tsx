'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6 bg-charcoal-200 border border-charcoal-100 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-serif font-bold text-ivory">
          Something went wrong
        </h2>
        <p className="text-xs text-ivory/70 leading-relaxed">
          An unexpected system issue occurred. Please try refreshing or return to the homepage.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3 text-xs">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold text-charcoal font-bold shadow-gold hover:bg-gold-hover transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-charcoal-300 border border-charcoal-100 text-ivory hover:text-gold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

