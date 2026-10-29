import React from 'react';
import { getLeads } from '@/lib/data/leads';
import { LeadsCrmClient } from '@/components/admin/LeadsCrmClient';

export const revalidate = 0;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: { id?: string; status?: string };
}) {
  const leads = await getLeads({ status: searchParams.status });

  return <LeadsCrmClient initialLeads={leads} selectedLeadId={searchParams.id} />;
}

