import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeMap = {
    sm: {
      container: 'w-9 h-9',
      imageSize: 36,
      title: 'text-base',
      subline: 'text-[9px]',
    },
    md: {
      container: 'w-11 h-11 sm:w-12 sm:h-12',
      imageSize: 48,
      title: 'text-lg sm:text-xl',
      subline: 'text-[10px]',
    },
    lg: {
      container: 'w-14 h-14 sm:w-16 sm:h-16',
      imageSize: 64,
      title: 'text-xl sm:text-2xl',
      subline: 'text-xs',
    },
    xl: {
      container: 'w-20 h-20 sm:w-24 sm:h-24',
      imageSize: 96,
      title: 'text-2xl sm:text-3xl',
      subline: 'text-sm',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <Link href="/" className={`flex items-center gap-3 group flex-shrink-0 ${className}`}>
      {/* Official Circular Emblem Logo */}
      <div
        className={`relative ${currentSize.container} rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-gold-dark via-gold to-gold-light shadow-gold flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden bg-charcoal">
          <Image
            src="/images/jr-logo.jpg"
            alt="JR Real Estate Varanasi"
            width={currentSize.imageSize}
            height={currentSize.imageSize}
            className="w-full h-full object-cover object-center rounded-full"
            priority
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center whitespace-nowrap">
          <span
            className={`font-serif font-bold text-ivory tracking-wide leading-tight ${currentSize.title} group-hover:text-gold transition-colors`}
          >
            JR Real Estate
          </span>
          <span
            className={`text-gold tracking-[0.2em] uppercase font-semibold mt-0.5 ${currentSize.subline}`}
          >
            Varanasi &bull; Builders
          </span>
        </div>
      )}
    </Link>
  );
}
