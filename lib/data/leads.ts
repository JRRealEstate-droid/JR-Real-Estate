import prisma from '@/lib/prisma';

export interface LeadActivityItem {
  id: string;
  type: 'NOTE' | 'STATUS_CHANGE' | 'CALL' | 'WHATSAPP' | 'SITE_VISIT' | 'MERGE';
  description: string;
  authorName: string;
  createdAt: string;
}

export interface LeadItem {
  id: string;
  referenceCode: string;
  fullName: string;
  phone: string;
  email?: string;
  localityPreference?: string;
  budgetRange?: string;
  propertyType?: string;
  leadSource: 'PROPERTY_INQUIRY' | 'WEBSITE_CONTACT' | 'SELL_PROPERTY' | 'CONSTRUCTION_FORM' | 'ESTIMATE_CALCULATOR' | 'PHONE_INBOUND' | 'WALK_IN' | 'SITE_VISIT_REQUEST';
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'VISIT_SCHEDULED' | 'VISIT_COMPLETED' | 'NEGOTIATION' | 'CONVERTED' | 'LOST_ON_HOLD';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  requirementDetails?: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyRef?: string;
  projectId?: string;
  projectTitle?: string;
  assignedToName?: string;
  followUpDate?: string;
  activities: LeadActivityItem[];
  constructionDetails?: {
    plotOwnership: string;
    plotAreaSqFt?: number;
    plotLocation?: string;
    plannedFloors?: string;
    estimatedBudget?: string;
    drawingsAvailable: boolean;
    preferredPackage?: string;
    siteInspectionRequested: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// Development in-memory leads storage
let inMemoryLeads: LeadItem[] = [
  {
    id: 'lead-01',
    referenceCode: 'LEAD-2026-001',
    fullName: 'Rajeshwar Mishra',
    phone: '9839012345',
    email: 'mishra.rajeshwar@gmail.com',
    localityPreference: 'Pandeypur Chauraha',
    budgetRange: '₹ 40 Lakh - ₹ 50 Lakh',
    propertyType: 'PLOT_LAND',
    leadSource: 'PROPERTY_INQUIRY',
    status: 'VISIT_SCHEDULED',
    priority: 'HIGH',
    requirementDetails: 'Looking for 1200-1500 sq.ft residential plot near Pandeypur for immediate house construction. Family prefers East or North facing.',
    propertyId: 'prop-sample-01',
    propertyTitle: 'VDA Layout Residential Plot near Pandeypur Chauraha',
    propertyRef: 'JR-PLT-101',
    assignedToName: 'Umesh Yadav',
    followUpDate: '2026-11-02T10:30:00Z',
    activities: [
      {
        id: 'act-1',
        type: 'STATUS_CHANGE',
        description: 'Lead created from website property enquiry for JR-PLT-101',
        authorName: 'System',
        createdAt: '2026-10-27T11:20:00Z',
      },
      {
        id: 'act-2',
        type: 'CALL',
        description: 'Called customer. Discussed registry paperwork and circle rate. Client confirmed available for site inspection on Saturday morning.',
        authorName: 'Umesh Yadav',
        createdAt: '2026-10-27T14:45:00Z',
      },
    ],
    createdAt: '2026-10-27T11:20:00Z',
    updatedAt: '2026-10-27T14:45:00Z',
  },
  {
    id: 'lead-02',
    referenceCode: 'LEAD-2026-002',
    fullName: 'Dr. Anand Srivastava',
    phone: '9415209876',
    email: 'dranand.srivastava@yahoo.com',
    localityPreference: 'Sigra / Mahmoorganj',
    budgetRange: '₹ 80 Lakh - ₹ 1 Crore',
    propertyType: 'FLAT_APARTMENT',
    leadSource: 'PROPERTY_INQUIRY',
    status: 'NEW',
    priority: 'HIGH',
    requirementDetails: 'Looking for 3 BHK flat with lift and reserved parking near Sigra/Mahmoorganj. Required for senior parents.',
    propertyId: 'prop-sample-02',
    propertyTitle: '3 BHK Modern Luxury Apartment with Covered Parking in Sigra',
    propertyRef: 'JR-APT-102',
    assignedToName: 'Unassigned',
    activities: [
      {
        id: 'act-3',
        type: 'STATUS_CHANGE',
        description: 'Enquiry received via website property page for JR-APT-102',
        authorName: 'System',
        createdAt: '2026-10-28T09:15:00Z',
      },
    ],
    createdAt: '2026-10-28T09:15:00Z',
    updatedAt: '2026-10-28T09:15:00Z',
  },
  {
    id: 'lead-03',
    referenceCode: 'LEAD-2026-003',
    fullName: 'Sunil Kumar Gupta',
    phone: '9918456789',
    localityPreference: 'Shivpur',
    budgetRange: '₹ 35 Lakh - ₹ 45 Lakh',
    leadSource: 'CONSTRUCTION_FORM',
    status: 'CONTACTED',
    priority: 'MEDIUM',
    requirementDetails: 'Owns 1400 sq.ft plot in Shivpur Tarna colony. Wants G+1 turnkey construction. Inquired about Premium package specifications and milestone payment structure.',
    assignedToName: 'Umesh Yadav',
    activities: [
      {
        id: 'act-4',
        type: 'STATUS_CHANGE',
        description: 'Submitted Home Construction Enquiry with indicative cost calculation',
        authorName: 'System',
        createdAt: '2026-10-28T16:00:00Z',
      },
    ],
    constructionDetails: {
      plotOwnership: 'OWNED',
      plotAreaSqFt: 1400,
      plotLocation: 'Tarna, Shivpur',
      plannedFloors: 'G+1',
      estimatedBudget: '₹ 40 Lakh',
      drawingsAvailable: false,
      preferredPackage: 'PREMIUM',
      siteInspectionRequested: true,
    },
    createdAt: '2026-10-28T16:00:00Z',
    updatedAt: '2026-10-28T16:00:00Z',
  },
];

export async function getLeads(filters: {
  status?: string;
  source?: string;
  search?: string;
  priority?: string;
} = {}) {
  try {
    const where: any = {};
    if (filters.status && filters.status !== 'ALL') where.status = filters.status;
    if (filters.source && filters.source !== 'ALL') where.leadSource = filters.source;
    if (filters.priority && filters.priority !== 'ALL') where.priority = filters.priority;
    if (filters.search) {
      where.OR = [
        { fullName: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search, mode: 'insensitive' } },
        { referenceCode: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        property: true,
        project: true,
        assignedTo: true,
        activities: { orderBy: { createdAt: 'desc' } },
        constructionLead: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return leads.map((l) => ({
      id: l.id,
      referenceCode: l.referenceCode,
      fullName: l.fullName,
      phone: l.phone,
      email: l.email || undefined,
      localityPreference: l.localityPreference || undefined,
      budgetRange: l.budgetRange || undefined,
      propertyType: l.propertyType || undefined,
      leadSource: l.leadSource as any,
      status: l.status as any,
      priority: l.priority as any,
      requirementDetails: l.requirementDetails || undefined,
      propertyId: l.propertyId || undefined,
      propertyTitle: l.property?.title || undefined,
      propertyRef: l.property?.referenceId || undefined,
      projectId: l.projectId || undefined,
      projectTitle: l.project?.title || undefined,
      assignedToName: l.assignedTo?.fullName || 'Unassigned',
      followUpDate: l.followUpDate ? l.followUpDate.toISOString() : undefined,
      activities: l.activities.map((a) => ({
        id: a.id,
        type: a.activityType as any,
        description: a.description,
        authorName: 'Staff',
        createdAt: a.createdAt.toISOString(),
      })),
      constructionDetails: l.constructionLead
        ? {
            plotOwnership: l.constructionLead.plotOwnership,
            plotAreaSqFt: l.constructionLead.plotAreaSqFt || undefined,
            plotLocation: l.constructionLead.plotLocation || undefined,
            plannedFloors: l.constructionLead.plannedFloors || undefined,
            estimatedBudget: l.constructionLead.estimatedBudget || undefined,
            drawingsAvailable: l.constructionLead.drawingsAvailable,
            preferredPackage: l.constructionLead.preferredPackage || undefined,
            siteInspectionRequested: l.constructionLead.siteInspectionRequested,
          }
        : undefined,
      createdAt: l.createdAt.toISOString(),
      updatedAt: l.updatedAt.toISOString(),
    }));
  } catch (err) {
    // Return memory leads
    let items = [...inMemoryLeads];
    if (filters.status && filters.status !== 'ALL') {
      items = items.filter((l) => l.status === filters.status);
    }
    if (filters.source && filters.source !== 'ALL') {
      items = items.filter((l) => l.leadSource === filters.source);
    }
    if (filters.priority && filters.priority !== 'ALL') {
      items = items.filter((l) => l.priority === filters.priority);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.referenceCode.toLowerCase().includes(q)
      );
    }
    return items;
  }
}

/**
 * Check if a lead with this phone number already exists
 */
export async function findDuplicatePhone(phone: string): Promise<LeadItem | null> {
  const clean = phone.replace(/[^0-9]/g, '');
  const found = inMemoryLeads.find((l) => l.phone.replace(/[^0-9]/g, '') === clean);
  return found || null;
}

/**
 * Create a new lead from web form or admin input
 */
export async function createLead(data: {
  fullName: string;
  phone: string;
  email?: string;
  localityPreference?: string;
  budgetRange?: string;
  propertyType?: string;
  leadSource: 'PROPERTY_INQUIRY' | 'WEBSITE_CONTACT' | 'SELL_PROPERTY' | 'CONSTRUCTION_FORM' | 'ESTIMATE_CALCULATOR' | 'PHONE_INBOUND' | 'WALK_IN' | 'SITE_VISIT_REQUEST';
  requirementDetails?: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyRef?: string;
  projectId?: string;
  projectTitle?: string;
  constructionDetails?: any;
}) {
  const codeCount = inMemoryLeads.length + 101;
  const refCode = `LEAD-2026-${codeCount}`;
  const now = new Date().toISOString();

  // Duplicate phone check
  const existingWithPhone = await findDuplicatePhone(data.phone);

  const newLead: LeadItem = {
    id: `lead-${Date.now()}`,
    referenceCode: refCode,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    localityPreference: data.localityPreference,
    budgetRange: data.budgetRange,
    propertyType: data.propertyType,
    leadSource: data.leadSource,
    status: 'NEW',
    priority: 'HIGH',
    requirementDetails: data.requirementDetails,
    propertyId: data.propertyId,
    propertyTitle: data.propertyTitle,
    propertyRef: data.propertyRef,
    projectId: data.projectId,
    projectTitle: data.projectTitle,
    assignedToName: 'Umesh Yadav',
    constructionDetails: data.constructionDetails,
    activities: [
      {
        id: `act-${Date.now()}`,
        type: 'STATUS_CHANGE',
        description: `Lead created from source: ${data.leadSource}${data.propertyTitle ? ` for "${data.propertyTitle}"` : ''}`,
        authorName: 'System',
        createdAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  if (existingWithPhone) {
    newLead.activities.push({
      id: `act-${Date.now() + 1}`,
      type: 'NOTE',
      description: `Note: Phone number ${data.phone} already matches existing lead (${existingWithPhone.referenceCode} - ${existingWithPhone.fullName}). Check for potential merge.`,
      authorName: 'System Audit',
      createdAt: now,
    });
  }

  inMemoryLeads.unshift(newLead);
  return { lead: newLead, isDuplicate: Boolean(existingWithPhone), existingLead: existingWithPhone };
}

/**
 * Update lead status, priority, or assignee
 */
export async function updateLead(id: string, updates: Partial<LeadItem>, author = 'Staff') {
  const index = inMemoryLeads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const current = inMemoryLeads[index];
  const changes: string[] = [];

  if (updates.status && updates.status !== current.status) {
    changes.push(`Status changed from ${current.status} to ${updates.status}`);
  }
  if (updates.priority && updates.priority !== current.priority) {
    changes.push(`Priority changed from ${current.priority} to ${updates.priority}`);
  }
  if (updates.assignedToName && updates.assignedToName !== current.assignedToName) {
    changes.push(`Assigned to ${updates.assignedToName}`);
  }
  if (updates.followUpDate && updates.followUpDate !== current.followUpDate) {
    changes.push(`Follow-up scheduled for ${updates.followUpDate}`);
  }

  const updated: LeadItem = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (changes.length > 0) {
    updated.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'STATUS_CHANGE',
      description: changes.join('. '),
      authorName: author,
      createdAt: new Date().toISOString(),
    });
  }

  inMemoryLeads[index] = updated;
  return updated;
}

/**
 * Add note or activity to lead
 */
export async function addLeadActivity(
  id: string,
  activity: { type: 'NOTE' | 'CALL' | 'WHATSAPP' | 'SITE_VISIT'; description: string; authorName: string }
) {
  const index = inMemoryLeads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const lead = inMemoryLeads[index];
  const newActivity: LeadActivityItem = {
    id: `act-${Date.now()}`,
    type: activity.type,
    description: activity.description,
    authorName: activity.authorName || 'Staff',
    createdAt: new Date().toISOString(),
  };

  lead.activities.unshift(newActivity);
  lead.updatedAt = new Date().toISOString();
  return lead;
}

/**
 * Safe merge two leads with identical phone numbers
 */
export async function mergeLeads(primaryLeadId: string, secondaryLeadId: string, author = 'Staff') {
  const primaryIndex = inMemoryLeads.findIndex((l) => l.id === primaryLeadId);
  const secondaryIndex = inMemoryLeads.findIndex((l) => l.id === secondaryLeadId);

  if (primaryIndex === -1 || secondaryIndex === -1) return null;

  const primary = inMemoryLeads[primaryIndex];
  const secondary = inMemoryLeads[secondaryIndex];

  // Merge notes and activities
  const mergedActivities = [
    {
      id: `act-merge-${Date.now()}`,
      type: 'MERGE' as const,
      description: `Merged with duplicate lead record ${secondary.referenceCode} (${secondary.fullName}). Notes and history consolidated.`,
      authorName: author,
      createdAt: new Date().toISOString(),
    },
    ...secondary.activities,
    ...primary.activities,
  ];

  primary.activities = mergedActivities;
  if (!primary.email && secondary.email) primary.email = secondary.email;
  if (!primary.budgetRange && secondary.budgetRange) primary.budgetRange = secondary.budgetRange;
  if (!primary.localityPreference && secondary.localityPreference) {
    primary.localityPreference = secondary.localityPreference;
  }
  primary.updatedAt = new Date().toISOString();

  // Remove secondary lead
  inMemoryLeads.splice(secondaryIndex, 1);
  return primary;
}
