import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee currency standardly (e.g., ₹ 45 Lakh, ₹ 1.25 Cr, ₹ 25,000)
 */
export function formatCurrencyINR(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) return 'Price on Request';
  if (amount === 0) return 'Price on Request';

  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹ ${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹ ${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)} Lakh`;
  }
  if (amount >= 1000) {
    return `₹ ${amount.toLocaleString('en-IN')}`;
  }
  return `₹ ${amount}`;
}

/**
 * Format date in Indian readable format (e.g., 29 Oct 2026)
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format date and time for site visits and activities
 */
export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Clean phone number for WhatsApp links (stripping spaces, hyphens, plus)
 */
export function getWhatsAppUrl(phone: string, text?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = text ? encodeURIComponent(text) : '';
  return `https://wa.me/${cleanPhone}${encodedText ? `?text=${encodedText}` : ''}`;
}

/**
 * Human readable label for property category
 */
export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    PLOT_LAND: 'Plots & Land',
    FLAT_APARTMENT: 'Flats & Apartments',
    VILLA_HOUSE: 'Villas & Kothi',
    COMMERCIAL_SHOP: 'Commercial Shops',
    COMMERCIAL_OFFICE: 'Commercial Office Space',
    AGRICULTURAL_LAND: 'Agricultural Land',
    WAREHOUSE: 'Warehouse / Godown',
  };
  return map[category] || category;
}

/**
 * Human readable label for transaction type
 */
export function getTransactionLabel(type: string): string {
  const map: Record<string, string> = {
    BUY: 'For Sale',
    RENT: 'For Rent',
    LEASE: 'For Lease',
  };
  return map[type] || type;
}

/**
 * Slugify string helper
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

