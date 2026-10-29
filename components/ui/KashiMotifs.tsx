import React from 'react';

/**
 * Kashi-inspired SVG decorative motifs and dividers for JR Real Estate Varanasi.
 * Designed with restrained elegance, fully responsive, and with prefers-reduced-motion support.
 */

// 1. Ganga Wave Divider: Subtle flowing water line representing the Holy Ganga
export function GangaWaveDivider({
  className = '',
  animated = false,
  flip = false,
}: {
  className?: string;
  animated?: boolean;
  flip?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
        flip ? 'rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-8 sm:h-12 text-gold/30 ${
          animated ? 'motion-safe:animate-ganga-flow' : ''
        }`}
        viewBox="0 0 1440 48"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 24C120 10 240 10 360 24C480 38 600 38 720 24C840 10 960 10 1080 24C1200 38 1320 38 1440 24V48H0V24Z"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <path
          d="M0 28C140 16 280 16 420 28C560 40 700 40 840 28C980 16 1120 16 1260 28C1350 36 1400 36 1440 28V48H0V28Z"
          fill="currentColor"
          fillOpacity="0.22"
        />
        <path
          d="M0 32C180 22 360 22 540 32C720 42 900 42 1080 32C1260 22 1380 22 1440 32V48H0V32Z"
          fill="#0B0D0D"
        />
      </svg>
    </div>
  );
}

// 2. Ghats & Temple Skyline Silhouette: Authentic Varanasi architectural riverfront
export function VaranasiGhatsSilhouette({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-20 sm:h-28 text-gold"
        viewBox="0 0 1200 120"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        {/* Deep background temple shikhars & pavilions */}
        <path
          d="
            M0 120 L0 105 
            L60 105 L60 95 L75 95 L75 80 L80 65 L85 80 L85 95 L100 95 L100 105
            L180 105 L180 88 L195 88 L195 60 L200 50 L205 60 L205 88 L220 88 L220 105
            L320 105 L320 92 L335 92 L335 72 L340 55 L345 72 L345 92 L360 92 L360 105
            L480 105 L480 85 L500 85 L500 50 L510 35 L520 50 L520 85 L540 85 L540 105
            L640 105 L640 90 L655 90 L655 70 L660 52 L665 70 L665 90 L680 90 L680 105
            L780 105 L780 82 L795 82 L795 55 L800 40 L805 55 L805 82 L820 82 L820 105
            L920 105 L920 90 L935 90 L935 75 L940 58 L945 75 L945 90 L960 90 L960 105
            L1080 105 L1080 85 L1095 85 L1095 62 L1100 48 L1105 62 L1105 85 L1120 85 L1120 105
            L1200 105 L1200 120 Z
          "
          fillOpacity="0.08"
        />

        {/* Midground stone ghat steps (Pauri) & arched chhatris */}
        <path
          d="
            M0 120 L0 110
            L40 110 L40 102 L80 102 L80 94 L120 94 L120 86 
            L150 86 L150 78 L160 70 L170 78 L170 86 L200 86 L200 94 L240 94 L240 102 L280 102 L280 110
            L360 110 L360 100 L400 100 L400 90 L440 90 L440 76 L450 68 L460 76 L460 90 L500 90 L500 100 L540 100 L540 110
            L620 110 L620 98 L660 98 L660 88 L700 88 L700 75 L710 65 L720 75 L720 88 L760 88 L760 98 L800 98 L800 110
            L900 110 L900 100 L940 100 L940 88 L980 88 L980 78 L990 70 L1000 78 L1000 88 L1040 88 L1040 100 L1080 100 L1080 110
            L1200 110 L1200 120 Z
          "
          fillOpacity="0.16"
        />

        {/* Foreground river edge & calm wooden boat silhouette */}
        <path
          d="
            M0 120 L0 114
            L300 114
            L310 111 L315 106 L335 106 L340 111 L350 114 
            L820 114
            L830 110 L835 104 L855 104 L860 110 L870 114
            L1200 114 L1200 120 Z
          "
          fillOpacity="0.25"
        />
      </svg>
    </div>
  );
}

// 3. Banarasi Zari Medallion: Refined filigree motif used as section badges & dividers
export function BanarasiMedallion({
  className = '',
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-gold flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" strokeDasharray="1.5 1.5" />
      {/* 4 Cardinal Floral Petals */}
      <path
        d="M12 4C13.2 6.5 13.2 7.5 12 9C10.8 7.5 10.8 6.5 12 4Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M12 20C13.2 17.5 13.2 16.5 12 15C10.8 16.5 10.8 17.5 12 20Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M4 12C6.5 10.8 7.5 10.8 9 12C7.5 13.2 6.5 13.2 4 12Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M20 12C17.5 10.8 16.5 10.8 15 12C16.5 13.2 17.5 13.2 20 12Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      {/* Central Diya Spark */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 4. Kashi Section Header Decorator: Flanked gold lines with central Banarasi medallion
export function KashiSectionDivider({
  title,
  subtitle,
  className = '',
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center space-y-2 mb-8 ${className}`}>
      {subtitle && (
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em] font-sans">
            {subtitle}
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold/60" />
        </div>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory tracking-tight">
          {title}
        </h2>
      )}
      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-gold" />
        <BanarasiMedallion size={18} />
        <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-gold/40 to-gold" />
      </div>
    </div>
  );
}

// 5. Diya Glow: Subtle warmth aura for cards & heroes
export function DiyaGlow({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute pointer-events-none rounded-full bg-gradient-to-r from-gold/15 via-gold/8 to-transparent blur-2xl motion-safe:animate-diya-glow ${className}`}
      aria-hidden="true"
    />
  );
}

// 6. Banarasi Corner Trim for Cards & Containers
export function BanarasiCornerAccent({
  position = 'top-right',
}: {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}) {
  const getRotation = () => {
    switch (position) {
      case 'top-left':
        return '-rotate-90 top-0 left-0';
      case 'bottom-right':
        return 'rotate-90 bottom-0 right-0';
      case 'bottom-left':
        return 'rotate-180 bottom-0 left-0';
      default:
        return 'top-0 right-0';
    }
  };

  return (
    <div
      className={`absolute w-8 h-8 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300 ${getRotation()}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-gold">
        <path
          d="M0 0 H28 C30 0 32 2 32 4 V32 M32 0 L0 32"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />
        <circle cx="24" cy="8" r="2" fill="currentColor" fillOpacity="0.7" />
      </svg>
    </div>
  );
}
