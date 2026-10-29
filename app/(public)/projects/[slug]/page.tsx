import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug } from '@/lib/data/projects';
import { BRAND } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { MapPin, Building, Calendar, ArrowRight, ShieldAlert, CheckCircle2, Phone, MessageSquare, Download, FileText } from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found | JR Real Estate' };

  return {
    title: `${project.title} | New Project in ${project.localityName}, Varanasi`,
    description: `${project.title} by ${project.builderName}. Price: ${project.priceRangeDisplay}. Located at ${project.address}. Detailed highlights and site inspection by JR Real Estate.`,
  };
}

export default async function SingleProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const whatsappMessage = `Namaste JR Real Estate, I am inquiring about "${project.title}" (Ref: ${project.referenceId}). Please share brochure, unit layouts, and site visit availability.`;
  const whatsappUrl = getWhatsAppUrl(BRAND.whatsappNumber, whatsappMessage);

  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-ivory/60">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-gold">Projects</Link>
          <span>/</span>
          <span className="text-gold truncate">{project.title}</span>
        </div>

        {/* Title and Price Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-charcoal-100">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-gold text-charcoal">
                {project.status.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-gold/80 font-mono font-medium">{project.referenceId}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
              {project.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gold">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{project.address}</span>
            </div>
          </div>

          <div className="md:text-right">
            <div className="text-xs text-ivory/60 uppercase">Price Range</div>
            <div className="text-3xl font-serif font-bold text-gold">
              {project.priceRangeDisplay}
            </div>
          </div>
        </div>

        {/* Gallery & Project Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Primary Render Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-charcoal-300 border border-charcoal-100 shadow-xl">
              <Image
                src={project.images[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Overview */}
            <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-lg">
              <h2 className="font-serif font-bold text-xl text-ivory pb-2 border-b border-charcoal-100">
                Project Overview &amp; Masterplan
              </h2>
              <p className="text-sm text-ivory/80 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            {project.highlights?.length > 0 && (
              <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-lg">
                <h3 className="font-serif font-bold text-xl text-ivory pb-2 border-b border-charcoal-100">
                  Project Highlights &amp; Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-lg bg-charcoal-300 border border-charcoal-100 text-xs text-ivory/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statutory RERA Note */}
            <div className="p-5 rounded-xl bg-charcoal-300 border border-charcoal-100 text-xs text-ivory/70 space-y-2">
              <div className="flex items-center gap-2 text-gold font-semibold">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>Statutory Compliance &amp; UP-RERA</span>
              </div>
              <p>
                RERA Registration: <strong className="text-ivory font-mono">{project.reraNumber || 'Details available upon consultation'}</strong>. All floor layouts, specifications, and club amenities shown are indicative artist impressions. Buyers must verify sanctions prior to allotment.
              </p>
            </div>
          </div>

          {/* Sticky Inquiry Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-charcoal-200 border border-gold/40 rounded-2xl p-6 space-y-5 shadow-2xl sticky top-28">
              <div className="border-b border-charcoal-100 pb-3">
                <h3 className="font-serif font-bold text-lg text-ivory">
                  Request Project Brochure &amp; Price List
                </h3>
                <p className="text-xs text-ivory/60 mt-0.5">
                  Get official unit floor plans and payment schedule directly via WhatsApp or Email.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Receive Brochure on WhatsApp</span>
                </a>

                <a
                  href={`tel:${BRAND.phone}`}
                  className="w-full py-3 px-4 rounded-lg bg-gold hover:bg-gold-hover text-charcoal font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-gold"
                >
                  <Phone className="w-4 h-4 fill-charcoal" />
                  <span>Call Director: {BRAND.phone}</span>
                </a>

                <Link
                  href={`/contact?intent=visit&project=${project.referenceId}`}
                  className="w-full py-2.5 px-4 rounded-lg bg-charcoal-300 hover:bg-charcoal-100 border border-charcoal-100 text-ivory font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Schedule Site Inspection</span>
                </Link>
              </div>

              <div className="pt-3 border-t border-charcoal-100 text-[11px] text-ivory/60 space-y-1">
                <div>Developer: <strong className="text-ivory">{project.builderName}</strong></div>
                <div>Location: <strong className="text-ivory">{project.localityName}, Varanasi</strong></div>
                <div>Office: <strong className="text-ivory">{BRAND.address}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

