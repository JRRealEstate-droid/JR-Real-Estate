export interface SiteVisitItem {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyRef?: string;
  scheduledAt: string;
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  visitNotes?: string;
  outcome?: string;
  staffName: string;
  createdAt: string;
}

let inMemoryVisits: SiteVisitItem[] = [
  {
    id: 'visit-01',
    leadId: 'lead-01',
    leadName: 'Rajeshwar Mishra',
    leadPhone: '9839012345',
    propertyId: 'prop-sample-01',
    propertyTitle: 'VDA Layout Residential Plot near Pandeypur Chauraha',
    propertyRef: 'JR-PLT-101',
    scheduledAt: '2026-11-02T10:30:00Z',
    status: 'CONFIRMED',
    visitNotes: 'Client wants to see road width and nearby sewer line connection.',
    staffName: 'Umesh Yadav',
    createdAt: '2026-10-27T14:45:00Z',
  },
  {
    id: 'visit-02',
    leadId: 'lead-02',
    leadName: 'Dr. Anand Srivastava',
    leadPhone: '9415209876',
    propertyId: 'prop-sample-02',
    propertyTitle: '3 BHK Modern Luxury Apartment with Covered Parking in Sigra',
    propertyRef: 'JR-APT-102',
    scheduledAt: '2026-11-04T16:00:00Z',
    status: 'SCHEDULED',
    visitNotes: 'Family visit with elderly father. Check lift working condition.',
    staffName: 'Umesh Yadav',
    createdAt: '2026-10-28T10:00:00Z',
  },
];

export async function getSiteVisits() {
  return [...inMemoryVisits];
}

export async function createSiteVisit(data: {
  leadId: string;
  leadName: string;
  leadPhone: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyRef?: string;
  scheduledAt: string;
  visitNotes?: string;
  staffName?: string;
}) {
  const newVisit: SiteVisitItem = {
    id: `visit-${Date.now()}`,
    leadId: data.leadId,
    leadName: data.leadName,
    leadPhone: data.leadPhone,
    propertyId: data.propertyId,
    propertyTitle: data.propertyTitle,
    propertyRef: data.propertyRef,
    scheduledAt: data.scheduledAt,
    status: 'SCHEDULED',
    visitNotes: data.visitNotes,
    staffName: data.staffName || 'Umesh Yadav',
    createdAt: new Date().toISOString(),
  };

  inMemoryVisits.unshift(newVisit);
  return newVisit;
}

export async function updateSiteVisit(
  id: string,
  updates: Partial<Pick<SiteVisitItem, 'status' | 'outcome' | 'visitNotes' | 'scheduledAt' | 'staffName'>>
) {
  const index = inMemoryVisits.findIndex((v) => v.id === id);
  if (index === -1) return null;

  inMemoryVisits[index] = {
    ...inMemoryVisits[index],
    ...updates,
  };

  return inMemoryVisits[index];
}

