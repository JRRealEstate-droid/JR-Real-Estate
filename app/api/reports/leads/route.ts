import { NextResponse } from 'next/server';
import { getLeads } from '@/lib/data/leads';

export async function GET() {
  try {
    const leads = await getLeads();

    // Generate CSV
    const headers = [
      'Reference Code',
      'Name',
      'Phone',
      'Email',
      'Locality Preference',
      'Budget Range',
      'Source',
      'Status',
      'Priority',
      'Property / Project Ref',
      'Assigned To',
      'Created Date',
    ];

    const rows = leads.map((l) => [
      `"${l.referenceCode}"`,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.localityPreference || ''}"`,
      `"${l.budgetRange || ''}"`,
      `"${l.leadSource}"`,
      `"${l.status}"`,
      `"${l.priority}"`,
      `"${l.propertyRef || l.projectTitle || ''}"`,
      `"${l.assignedToName || 'Unassigned'}"`,
      `"${l.createdAt.split('T')[0]}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="jr-real-estate-leads-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

