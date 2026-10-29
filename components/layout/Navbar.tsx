'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { BRAND, NAV_LINKS } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { Phone, MessageSquare, Menu, X, PlusCircle, ShieldCheck, MapPin, Clock } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-charcoal/95 backdrop-blur-md border-b border-charcoal-100 shadow-md">
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-charcoal-400 text-xs text-ivory/80 border-b border-charcoal-100/70 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-[11px]">
            <span className="flex items-center gap-1.5 text-ivory/90">
              <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>S9/90A, Pandeypur Chauraha, Varanasi</span>
            </span>
            <span className="text-charcoal-100">|</span>
            <span className="flex items-center gap-1.5 text-ivory/70">
              <Clock className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
              <span>{BRAND.officeHours}</span>
            </span>
            <span className="text-charcoal-100">|</span>
            <span className="text-gold font-medium">Director: {BRAND.director}</span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center gap-1.5 text-gold hover:text-gold-light transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {BRAND.phone}</span>
            </a>
            <span className="text-charcoal-100">|</span>
            <a
              href={getWhatsAppUrl(BRAND.whatsappNumber, 'Hello JR Real Estate Varanasi, I am looking for property details.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="text-charcoal-100">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-ivory/60 hover:text-gold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold/80" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-gold font-bold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-gold after:rounded-full'
                      : 'text-ivory/80 hover:text-gold'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Nav links for lg-xl screen sizes with tighter spacing */}
          <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-2 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-gold font-bold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-gold after:rounded-full'
                      : 'text-ivory/80 hover:text-gold'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/sell"
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Property</span>
            </Link>

            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg bg-gradient-to-r from-gold via-gold-hover to-gold-dark text-charcoal shadow-gold hover:brightness-105 transition-all"
            >
              <Phone className="w-4 h-4 fill-charcoal" />
              <span>{BRAND.phone}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${BRAND.phone}`}
              className="p-2 rounded-lg bg-gold/15 text-gold border border-gold/30"
              aria-label="Call JR Real Estate"
            >
              <Phone className="w-4 h-4 fill-gold" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-ivory/80 hover:text-gold hover:bg-charcoal-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-charcoal-100 bg-charcoal-300 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="p-3 bg-charcoal-200 rounded-lg border border-charcoal-100 mb-3 text-xs">
            <p className="text-gold font-serif font-bold">JR Real Estate Varanasi</p>
            <p className="text-[11px] text-ivory/70">Director: {BRAND.director}</p>
            <p className="text-[11px] text-ivory/70">{BRAND.address}</p>
          </div>

          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive ? 'bg-gold/15 text-gold font-bold' : 'text-ivory hover:bg-charcoal-100'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-charcoal-100 flex flex-col gap-2">
            <Link
              href="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-gold text-gold font-semibold text-xs"
            >
              Post / Sell Your Property
            </Link>
            <a
              href={`tel:${BRAND.phone}`}
              className="w-full text-center py-2.5 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold"
            >
              Call Director: {BRAND.phone}
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-xs text-ivory/50 hover:text-gold"
            >
              Admin &amp; Staff Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
