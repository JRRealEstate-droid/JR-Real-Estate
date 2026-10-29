import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPropertyBySlug, getProperties } from '@/lib/data/properties';
import { PropertyDetailView } from '@/components/properties/PropertyDetailView';

interface PropertyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    return {
      title: 'Property Not Found | JR Real Estate Varanasi',
    };
  }

  const title = `${property.title} | ${property.priceDisplay} | JR Real Estate Varanasi`;
  const description = `${property.category.replace(/_/g, ' ')} for ${property.transactionType === 'BUY' ? 'sale' : 'rent'} in ${property.localityName}, Varanasi. Price: ${property.priceDisplay}. Ref: ${property.referenceId}. Contact JR Real Estate 8948301111.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: property.images?.[0]?.url ? [{ url: property.images[0].url }] : [],
    },
  };
}

export default async function SinglePropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  // Fetch similar properties in same category or locality
  const { properties: similar } = await getProperties({
    category: property.category,
    limit: 4,
  });

  const filteredSimilar = similar.filter((p) => p.id !== property.id);

  return <PropertyDetailView property={property} similarProperties={filteredSimilar} />;
}
