import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Circular Emblem Logo */}
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark p-[2px] shadow-gold flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      >
        <div className="w-full h-full rounded-full bg-charcoal flex flex-col items-center justify-center text-center border border-gold/40">
          <span className="font-serif font-bold text-gold tracking-tighter leading-none">
            JR
          </span>
          <span className="text-[7px] text-ivory/70 uppercase tracking-widest leading-none mt-[1px]">
            VNS
          </span>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-bold text-ivory tracking-wide leading-none text-base group-hover:text-gold transition-colors">
            JR Real Estate
          </span>
          <span className="text-[10px] text-gold tracking-widest uppercase font-medium mt-1">
            Varanasi &bull; Builders &bull; CRM
          </span>
        </div>
      )}
    </Link>
  );
}
