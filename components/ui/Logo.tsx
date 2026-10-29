'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  // Enhanced dimensions for crystal-clear readability of the Kashi artwork & gold lettering
  const sizeMap = {
    sm: {
      container: 'w-11 h-11',
      title: 'text-base font-bold',
      subline: 'text-[9px]',
    },
    md: {
      container: 'w-14 h-14 sm:w-16 sm:h-16',
      title: 'text-lg sm:text-xl font-bold',
      subline: 'text-[10px]',
    },
    lg: {
      container: 'w-20 h-20 sm:w-24 sm:h-24',
      title: 'text-xl sm:text-2xl font-bold',
      subline: 'text-xs',
    },
    xl: {
      container: 'w-28 h-28 sm:w-36 sm:h-36',
      title: 'text-2xl sm:text-3xl font-bold',
      subline: 'text-sm',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <Link
      href="/"
      className={`flex items-center gap-3.5 group flex-shrink-0 select-none ${className}`}
    >
      {/* Official Circular High-Resolution Emblem Logo with Crisp Gold Ring */}
      <div
        className={`relative ${currentSize.container} rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-gold-lg`}
      >
        {/* Outer Metallic Ring */}
        <div className="absolute inset-0 rounded-full ring-2 ring-gold/80 ring-offset-2 ring-offset-charcoal" />

        {/* Logo Image without compression degradation (unoptimized=true for sharp 1024px clarity) */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-charcoal">
          <Image
            src="/images/jr-logo.jpg"
            alt="JR Real Estate Varanasi - Official Logo"
            fill
            sizes="160px"
            unoptimized={true}
            className="object-cover object-center rounded-full"
            priority
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center whitespace-nowrap">
          <span
            className={`font-serif tracking-wide leading-tight text-ivory group-hover:text-gold transition-colors ${currentSize.title}`}
          >
            JR Real Estate
          </span>
          <span
            className={`text-gold tracking-[0.22em] uppercase font-semibold mt-1 flex items-center gap-1.5 ${currentSize.subline}`}
          >
            <span>Varanasi</span>
            <span className="text-gold/50">&bull;</span>
            <span className="text-ivory/80">Builders</span>
          </span>
        </div>
      )}
    </Link>
  );
}
