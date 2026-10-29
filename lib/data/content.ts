import { SAMPLE_FAQS, SAMPLE_BLOGS } from './sample-data';
import { slugify } from '@/lib/utils';

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  displayOrder: number;
}

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  published: boolean;
  publishedAt: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  userEmail: string;
  entityType: string;
  entityId?: string;
  details: string;
  timestamp: string;
}

let inMemoryFaqs: FaqItemData[] = SAMPLE_FAQS.map((f, i) => ({
  id: `faq-${i + 1}`,
  question: f.question,
  answer: f.answer,
  category: f.category,
  published: true,
  displayOrder: i + 1,
}));

let inMemoryBlogs: BlogPostData[] = SAMPLE_BLOGS.map((b, i) => ({
  id: `blog-${i + 1}`,
  title: b.title,
  slug: b.slug,
  excerpt: b.excerpt,
  content: b.content,
  coverImage: b.coverImage,
  author: b.author,
  category: b.category,
  published: true,
  publishedAt: b.publishedAt,
}));

let inMemoryAuditLogs: AuditLogItem[] = [
  {
    id: 'log-01',
    action: 'PROPERTY_PUBLISHED',
    userEmail: 'director@jrrealestate.in',
    entityType: 'Property',
    entityId: 'JR-PLT-101',
    details: 'Published VDA Layout Residential Plot near Pandeypur Chauraha',
    timestamp: '2026-10-27T10:00:00Z',
  },
  {
    id: 'log-02',
    action: 'RATE_REVISION',
    userEmail: 'director@jrrealestate.in',
    entityType: 'Construction',
    details: 'Updated Standard package construction rate to ₹ 1,550/sq.ft',
    timestamp: '2026-10-28T09:30:00Z',
  },
  {
    id: 'log-03',
    action: 'LEAD_STATUS_UPDATE',
    userEmail: 'director@jrrealestate.in',
    entityType: 'Lead',
    entityId: 'LEAD-2026-001',
    details: 'Status changed from CONTACTED to VISIT_SCHEDULED',
    timestamp: '2026-10-28T14:45:00Z',
  },
];

export async function getFaqs(category?: string) {
  let list = inMemoryFaqs.filter((f) => f.published);
  if (category && category !== 'ALL') {
    list = list.filter((f) => f.category === category);
  }
  return list;
}

export async function getBlogPosts() {
  return inMemoryBlogs.filter((b) => b.published);
}

export async function getBlogPostBySlug(slug: string) {
  return inMemoryBlogs.find((b) => b.slug === slug) || null;
}

export async function createBlogPost(data: {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category?: string;
  author?: string;
}) {
  const slug = slugify(data.title);
  const newPost: BlogPostData = {
    id: `blog-${Date.now()}`,
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.coverImage,
    author: data.author || 'JR Editorial Team',
    category: data.category || 'Real Estate Guide',
    published: true,
    publishedAt: new Date().toISOString().split('T')[0],
  };

  inMemoryBlogs.unshift(newPost);
  return newPost;
}

export async function getAuditLogs() {
  return [...inMemoryAuditLogs];
}

export async function addAuditLog(action: string, entityType: string, details: string, entityId?: string, userEmail = 'director@jrrealestate.in') {
  inMemoryAuditLogs.unshift({
    id: `log-${Date.now()}`,
    action,
    userEmail,
    entityType,
    entityId,
    details,
    timestamp: new Date().toISOString(),
  });
}

