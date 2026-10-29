import { getProperties } from './properties';
import { getLeads } from './leads';
import { getSiteVisits } from './site-visits';
import { getProjects } from './projects';

export async function getDashboardStats() {
  const [propertyResult, leads, visits, projects] = await Promise.all([
    getProperties({ includeInactive: true }),
    getLeads(),
    getSiteVisits(),
    getProjects(),
  ]);

  const activePropertiesCount = propertyResult.properties.filter(
    (p) => p.status === 'PUBLISHED'
  ).length;

  const draftPropertiesCount = propertyResult.properties.filter(
    (p) => p.status === 'DRAFT' || p.status === 'UNDER_REVIEW'
  ).length;

  const newUncontactedLeadsCount = leads.filter((l) => l.status === 'NEW').length;

  const upcomingVisitsCount = visits.filter(
    (v) => v.status === 'SCHEDULED' || v.status === 'CONFIRMED'
  ).length;

  const openConstructionLeadsCount = leads.filter(
    (l) => l.leadSource === 'CONSTRUCTION_FORM' || l.leadSource === 'ESTIMATE_CALCULATOR' || Boolean(l.constructionDetails)
  ).length;

  const leadStatusCounts: Record<string, number> = {};
  leads.forEach((l) => {
    leadStatusCounts[l.status] = (leadStatusCounts[l.status] || 0) + 1;
  });

  return {
    activeProperties: activePropertiesCount,
    draftProperties: draftPropertiesCount,
    totalProperties: propertyResult.properties.length,
    uncontactedLeads: newUncontactedLeadsCount,
    totalLeads: leads.length,
    upcomingVisits: upcomingVisitsCount,
    openConstructionLeads: openConstructionLeadsCount,
    totalProjects: projects.length,
    recentLeads: leads.slice(0, 5),
    upcomingVisitsList: visits.slice(0, 4),
    leadStatusCounts,
  };
}

