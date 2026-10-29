import React from 'react';
import { getProperties } from '@/lib/data/properties';
import { PropertyManagerClient } from '@/components/admin/PropertyManagerClient';

export const revalidate = 0;

export default async function AdminPropertiesPage() {
  const { properties } = await getProperties({
    includeInactive: true,
    limit: 100,
  });

  return <PropertyManagerClient initialProperties={properties} />;
}

