import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import {
  MapPin,
  Phone,
  Target,
  Eye,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { BanarasiMedallion, BanarasiCornerAccent, DiyaGlow, VaranasiGhatsSilhouette } from '@/components/ui/KashiMotifs';

export const metadata: Metadata = {
  title: 'About Us | JR Real Estate Varanasi & Director Umesh Yadav',
  description:
    'Learn about JR Real Estate Varanasi, our Director Mr. Umesh Yadav, and our mission to provide verified plots, flats, and turnkey construction with absolute transparency at Pandeypur Chauraha.',
};

export default function AboutPage() {
  return (
    <div className="py-12 bg-charcoal min-h-screen relative overflow-hidden">
      {/* Background Banarasi weave */}
      <div className="absolute inset-0 bg-banarasi-pattern opacity-30 pointer-events-none" />
      <DiyaGlow className="top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
            <BanarasiMedallion size={13} />
            <span>Rooted in Kashi &bull; Built on Lifelong Relationships</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight">
            About JR Real Estate Varanasi
          </h1>

          <p className="text-base text-gold italic font-serif">
            &ldquo;{BRAND.tagline}&rdquo;
          </p>

          <p className="text-sm text-ivory/80 leading-relaxed max-w-2xl mx-auto">
            Headquartered at Pandeypur Chauraha, JR Real Estate is Varanasi’s dedicated property consultancy and turnkey construction firm, serving families, home seekers, and investors with grounded local expertise.
          </p>
        </div>

        {/* Visual Heritage Panel: Varanasi Architecture */}
        <div className="relative aspect-[21/8] w-full rounded-3xl overflow-hidden border border-charcoal-100 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1800&q=85"
            alt="Historic stone pavilions and morning golden light over the holy river Ganga in Varanasi"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-ivory">
            <div>
              <span className="text-gold font-mono uppercase text-[10px] tracking-wider font-semibold">
                Timeless Ethos
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-ivory">
                The Heritage of Honouring One&apos;s Word in Varanasi
              </h2>
            </div>
            <span className="text-xs text-ivory/70 italic font-serif">
              Pandeypur Chauraha &bull; Since Established
            </span>
          </div>
        </div>

        {/* Director Umesh Yadav Spotlight */}
        <div className="relative bg-charcoal-200/95 border border-gold/40 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden backdrop-blur-md">
          <BanarasiCornerAccent position="top-right" />
          <BanarasiCornerAccent position="bottom-left" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center lg:text-left space-y-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-gold to-gold-light p-1 mx-auto lg:mx-0 shadow-gold">
                <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center font-serif text-3xl sm:text-4xl font-bold text-gold">
                  UY
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-ivory">
                  {BRAND.director}
                </h2>
                <p className="text-xs text-gold font-medium mt-0.5">
                  Director &bull; JR Real Estate Varanasi
                </p>
                <div className="mt-2 text-xs text-ivory/60 flex items-center justify-center lg:justify-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>Pandeypur Chauraha, Varanasi</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 fill-charcoal" />
                  <span>Call: +91 {BRAND.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-sm text-ivory/80 leading-relaxed border-t lg:border-t-0 lg:border-l border-charcoal-100 lg:pl-8 pt-6 lg:pt-0">
              <h3 className="font-serif font-bold text-xl text-ivory">
                A Message from the Director
              </h3>
              <p>
                &ldquo;Varanasi is experiencing extraordinary infrastructural modernization. From the 4-lane Airport Expressway and outer Ring Roads to new residential growth corridors in Shivpur, Pandeypur, Paharia, and Rohania, the city is expanding rapidly.
              </p>
              <p>
                However, for a family or an individual purchasing land or building a home, real estate transactions are fraught with complexities: boundary demarcations, circle rate calculations, Tehsil revenue record verification, and construction quality management.
              </p>
              <p>
                At JR Real Estate, our single guiding principle is simple: <strong>Your Dream Home, Our Responsibility.</strong> We do not offer unverified properties, we do not make inflated promises, and we take personal accountability for every contract, title search, and cubic foot of concrete poured.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative p-8 rounded-3xl bg-charcoal-200/90 border border-charcoal-100 space-y-3 overflow-hidden shadow-lg">
            <BanarasiCornerAccent position="top-right" />
            <div className="w-12 h-12 rounded-xl bg-charcoal-300 border border-gold/30 text-gold flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-ivory">Our Mission</h3>
            <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed">
              To bring institutional-grade transparency, rigorous revenue title verification, and world-class architectural construction standards to every residential and commercial client in Varanasi.
            </p>
          </div>

          <div className="relative p-8 rounded-3xl bg-charcoal-200/90 border border-charcoal-100 space-y-3 overflow-hidden shadow-lg">
            <BanarasiCornerAccent position="top-right" />
            <div className="w-12 h-12 rounded-xl bg-charcoal-300 border border-gold/30 text-gold flex items-center justify-center mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-ivory">Our Vision</h3>
            <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed">
              To be the most respected, trustworthy real estate and turnkey construction organization in Eastern Uttar Pradesh, synonymous with unyielding legal diligence and client-first execution.
            </p>
          </div>
        </div>

        {/* Office Location & Contact */}
        <div className="p-8 rounded-3xl bg-charcoal-300 border border-charcoal-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-ivory">
              Visit Our Head Office at Pandeypur Chauraha
            </h3>
            <p className="text-xs text-ivory/70">
              Address: {BRAND.address} &bull; Open all 7 days from 9:30 AM to 8:00 PM.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors flex-shrink-0"
          >
            Get Office Directions
          </Link>
        </div>
      </div>
    </div>
  );
}
