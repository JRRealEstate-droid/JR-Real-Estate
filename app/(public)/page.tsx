import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickCategories } from '@/components/home/QuickCategories';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { ConstructionHighlight } from '@/components/home/ConstructionHighlight';
import { ProjectsSpotlight } from '@/components/home/ProjectsSpotlight';
import { DirectorTrustSection } from '@/components/home/DirectorTrustSection';
import { FaqSection } from '@/components/home/FaqSection';
import { LeadCaptureSection } from '@/components/home/LeadCaptureSection';
import { getProperties } from '@/lib/data/properties';
import { getProjects } from '@/lib/data/projects';
import { getFaqs } from '@/lib/data/content';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [{ properties }, projects, faqs] = await Promise.all([
    getProperties({ limit: 6 }),
    getProjects(),
    getFaqs(),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <QuickCategories />
      <FeaturedProperties properties={properties} />
      <ConstructionHighlight />
      <ProjectsSpotlight projects={projects} />
      <DirectorTrustSection />
      <FaqSection faqs={faqs} />
      <LeadCaptureSection />
    </div>
  );
}

