import { SAMPLE_PROJECTS } from './sample-data';
import { slugify } from '@/lib/utils';

export interface ProjectItem {
  id: string;
  referenceId: string;
  slug: string;
  title: string;
  builderName: string;
  reraNumber?: string;
  localityName: string;
  address: string;
  status: 'UPCOMING' | 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE' | 'COMPLETED';
  minPrice?: number;
  maxPrice?: number;
  priceRangeDisplay?: string;
  completionDate?: string;
  description: string;
  highlights: string[];
  brochureUrl?: string;
  images: { url: string; caption?: string }[];
  isSampleData: boolean;
}

let inMemoryProjects: ProjectItem[] = [...SAMPLE_PROJECTS];

export async function getProjects(filters?: { locality?: string; status?: string }) {
  let list = [...inMemoryProjects];
  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter((p) => p.status === filters.status);
  }
  if (filters?.locality && filters.locality !== 'ALL') {
    list = list.filter((p) => p.localityName.toLowerCase().includes(filters.locality!.toLowerCase()));
  }
  return list;
}

export async function getProjectBySlug(slug: string) {
  return inMemoryProjects.find((p) => p.slug === slug || p.referenceId.toLowerCase() === slug.toLowerCase()) || null;
}

export async function createProject(data: any) {
  const ref = data.referenceId || `JR-PRJ-${inMemoryProjects.length + 101}`;
  const slug = `${slugify(data.title)}-${ref.toLowerCase()}`;

  const newProject: ProjectItem = {
    id: `prj-${Date.now()}`,
    referenceId: ref,
    slug,
    title: data.title,
    builderName: data.builderName || 'JR Real Estate & Builders',
    reraNumber: data.reraNumber || 'Pending Owner Confirmation',
    localityName: data.localityName,
    address: data.address,
    status: data.status || 'UNDER_CONSTRUCTION',
    minPrice: Number(data.minPrice) || undefined,
    maxPrice: Number(data.maxPrice) || undefined,
    priceRangeDisplay: data.priceRangeDisplay || 'Price on Request',
    completionDate: data.completionDate,
    description: data.description,
    highlights: Array.isArray(data.highlights) ? data.highlights : [data.highlights].filter(Boolean),
    images: data.images?.length
      ? data.images
      : [
          {
            url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
            caption: data.title,
          },
        ],
    isSampleData: false,
  };

  inMemoryProjects.unshift(newProject);
  return newProject;
}
