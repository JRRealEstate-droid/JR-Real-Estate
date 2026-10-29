import { createServerSupabaseClient } from './supabase/server';
import prisma from './prisma';
import { Role } from '@prisma/client';

export type UserRole = Role;

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  phone?: string | null;
  isActive: boolean;
}

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ['*'],
  PROPERTY_MANAGER: [
    'properties:read',
    'properties:create',
    'properties:update',
    'properties:publish',
    'properties:archive',
    'taxonomies:manage',
    'media:manage',
  ],
  SALES_MANAGER: [
    'properties:read',
    'leads:read',
    'leads:manage',
    'leads:assign',
    'leads:export',
    'site_visits:manage',
    'reports:read',
  ],
  SALES_EXECUTIVE: [
    'properties:read',
    'leads:read_assigned',
    'leads:update_assigned',
    'site_visits:manage_assigned',
  ],
  CONTENT_MANAGER: [
    'properties:read',
    'content:manage',
    'blog:manage',
    'faqs:manage',
    'media:manage',
    'seo:manage',
  ],
  CONSTRUCTION_MANAGER: [
    'construction:manage',
    'projects:manage',
    'leads:read_construction',
    'site_visits:manage',
  ],
  VIEWER: [
    'properties:read',
    'leads:read',
    'reports:read',
  ],
};

/**
 * Checks if a user has a specific permission
 */
export function hasPermission(userRole: Role, permission: string): boolean {
  const allowed = ROLE_PERMISSIONS[userRole] || [];
  if (allowed.includes('*')) return true;
  return allowed.includes(permission);
}

/**
 * Get current session user with role mapped from database
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      // Check for development mock admin cookie or header if in dev
      if (process.env.NODE_ENV === 'development') {
        return getDevMockUser();
      }
      return null;
    }

    // Lookup user profile in database
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!profile) {
      // Auto-create viewer profile or super_admin if first user
      const count = await prisma.user.count();
      const initialRole: Role = count === 0 ? 'SUPER_ADMIN' : 'VIEWER';
      
      const newProfile = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || 'user@jrrealestate.in',
          fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Team Member',
          role: initialRole,
          isActive: true,
        },
      });

      return {
        id: newProfile.id,
        email: newProfile.email,
        fullName: newProfile.fullName,
        role: newProfile.role,
        phone: newProfile.phone,
        isActive: newProfile.isActive,
      };
    }

    if (!profile.isActive) return null;

    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.fullName,
      role: profile.role,
      phone: profile.phone,
      isActive: profile.isActive,
    };
  } catch (err) {
    console.warn('getCurrentUser warning:', err);
    if (process.env.NODE_ENV === 'development') {
      return getDevMockUser();
    }
    return null;
  }
}

/**
 * Development fallback mock user (Owner / Director Umesh Yadav)
 */
function getDevMockUser(): AuthUser {
  return {
    id: 'dev-owner-umesh-yadav',
    email: 'director@jrrealestate.in',
    fullName: 'Mr. Umesh Yadav (Director)',
    role: 'SUPER_ADMIN',
    phone: '8948301111',
    isActive: true,
  };
}
