import { NextResponse } from 'next/server';
import { getProperties } from '@/lib/data/properties';

export async function GET() {
  try {
    const { properties } = await getProperties({ includeInactive: true, limit: 1000 });

    const headers = [
      'Reference ID',
      'Title',
      'Transaction Type',
      'Category',
      'Locality',
      'Price (INR)',
      'Price Display',
      'Status',
      'Carpet Area (sq.ft)',
      'Bedrooms',
      'Verified',
      'Featured',
      'Created Date',
    ];

    const rows = properties.map((p) => [
      `"${p.referenceId}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.transactionType}"`,
      `"${p.category}"`,
      `"${p.localityName}"`,
      `"${p.price}"`,
      `"${p.priceDisplay}"`,
      `"${p.status}"`,
      `"${p.carpetArea || ''}"`,
      `"${p.bedrooms || ''}"`,
      `"${p.verified ? 'Yes' : 'No'}"`,
      `"${p.featured ? 'Yes' : 'No'}"`,
      `"${p.createdAt.split('T')[0]}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="jr-real-estate-properties-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

