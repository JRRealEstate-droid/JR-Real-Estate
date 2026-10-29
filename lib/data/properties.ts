import prisma from '@/lib/prisma';
import { SAMPLE_PROPERTIES, SampleProperty } from './sample-data';
import { slugify } from '@/lib/utils';

export interface PropertyFilterParams {
  transactionType?: 'BUY' | 'RENT' | 'LEASE';
  category?: string;
  locality?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  possessionStatus?: string;
  verifiedOnly?: boolean;
  query?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'area_desc';
  page?: number;
  limit?: number;
  includeInactive?: boolean; // For admin view only
}

// In-memory store for dev changes fallback if DB not connected
let inMemoryProperties: SampleProperty[] = [...SAMPLE_PROPERTIES];

export async function getProperties(
  filters: PropertyFilterParams = {}
): Promise<{ properties: SampleProperty[]; total: number; totalPages: number; currentPage: number }> {
  const {
    transactionType,
    category,
    locality,
    minPrice,
    maxPrice,
    bedrooms,
    possessionStatus,
    verifiedOnly,
    query,
    sort = 'newest',
    page = 1,
    limit = 12,
    includeInactive = false,
  } = filters;

  try {
    // Attempt Prisma query
    const where: any = {};

    if (!includeInactive) {
      where.status = 'PUBLISHED';
    }

    if (transactionType) {
      where.transactionType = transactionType;
    }

    if (category && category !== 'ALL') {
      where.category = category;
    }

    if (locality && locality !== 'ALL') {
      where.locality = {
        slug: locality,
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (bedrooms) {
      where.bedrooms = bedrooms;
    }

    if (possessionStatus && possessionStatus !== 'ALL') {
      where.possessionStatus = possessionStatus;
    }

    if (verifiedOnly) {
      where.verified = true;
    }

    if (query && query.trim()) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { address: { contains: query, mode: 'insensitive' } },
        { referenceId: { contains: query, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };
    if (sort === 'area_desc') orderBy = { carpetArea: 'desc' };

    const [total, properties] = await Promise.all([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        include: {
          locality: true,
          images: { orderBy: { displayOrder: 'asc' } },
          amenities: { include: { amenity: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    // Format DB properties
    const formatted: SampleProperty[] = properties.map((p) => ({
      id: p.id,
      referenceId: p.referenceId,
      slug: p.slug,
      title: p.title,
      description: p.description,
      transactionType: p.transactionType as 'BUY' | 'RENT' | 'LEASE',
      category: p.category as any,
      status: p.status as any,
      localityName: p.locality.name,
      localitySlug: p.locality.slug,
      address: p.address,
      landmark: p.landmark || undefined,
      price: p.price,
      priceDisplay: p.priceDisplay,
      isPriceNegotiable: p.isPriceNegotiable,
      carpetArea: p.carpetArea || undefined,
      builtUpArea: p.builtUpArea || undefined,
      plotArea: p.plotArea || undefined,
      areaUnit: p.areaUnit,
      bedrooms: p.bedrooms || undefined,
      bathrooms: p.bathrooms || undefined,
      balconies: p.balconies || undefined,
      floorNumber: p.floorNumber || undefined,
      totalFloors: p.totalFloors || undefined,
      facing: p.facing || undefined,
      furnishingStatus: p.furnishingStatus || undefined,
      possessionStatus: p.possessionStatus || undefined,
      verified: p.verified,
      featured: p.featured,
      isSampleData: false,
      images: p.images.map((img) => ({
        url: img.url,
        altText: img.altText || p.title,
        isPrimary: img.isPrimary,
      })),
      amenities: p.amenities.map((a) => a.amenity.name),
      createdAt: p.createdAt.toISOString(),
    }));

    return {
      properties: formatted,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
    };
  } catch (dbError) {
    // Graceful fallback to sample data when database is initializing
    let items = [...inMemoryProperties];

    if (!includeInactive) {
      items = items.filter((p) => p.status === 'PUBLISHED');
    }

    if (transactionType) {
      items = items.filter((p) => p.transactionType === transactionType);
    }

    if (category && category !== 'ALL') {
      items = items.filter((p) => p.category === category);
    }

    if (locality && locality !== 'ALL') {
      items = items.filter(
        (p) => p.localitySlug.toLowerCase() === locality.toLowerCase() || p.localityName.toLowerCase().includes(locality.toLowerCase())
      );
    }

    if (minPrice !== undefined) {
      items = items.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      items = items.filter((p) => p.price <= maxPrice);
    }

    if (bedrooms) {
      items = items.filter((p) => p.bedrooms === bedrooms);
    }

    if (possessionStatus && possessionStatus !== 'ALL') {
      items = items.filter((p) => p.possessionStatus === possessionStatus);
    }

    if (verifiedOnly) {
      items = items.filter((p) => p.verified === true);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.localityName.toLowerCase().includes(q) ||
          p.referenceId.toLowerCase().includes(q)
      );
    }

    if (sort === 'price_asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      items.sort((a, b) => b.price - a.price);
    } else {
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const total = items.length;
    const paginated = items.slice((page - 1) * limit, page * limit);

    return {
      properties: paginated,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
    };
  }
}

export async function getPropertyBySlug(slugOrRef: string): Promise<SampleProperty | null> {
  try {
    const prop = await prisma.property.findFirst({
      where: {
        OR: [{ slug: slugOrRef }, { referenceId: slugOrRef }],
      },
      include: {
        locality: true,
        images: { orderBy: { displayOrder: 'asc' } },
        amenities: { include: { amenity: true } },
      },
    });

    if (prop) {
      return {
        id: prop.id,
        referenceId: prop.referenceId,
        slug: prop.slug,
        title: prop.title,
        description: prop.description,
        transactionType: prop.transactionType as 'BUY' | 'RENT' | 'LEASE',
        category: prop.category as any,
        status: prop.status as any,
        localityName: prop.locality.name,
        localitySlug: prop.locality.slug,
        address: prop.address,
        landmark: prop.landmark || undefined,
        price: prop.price,
        priceDisplay: prop.priceDisplay,
        isPriceNegotiable: prop.isPriceNegotiable,
        carpetArea: prop.carpetArea || undefined,
        builtUpArea: prop.builtUpArea || undefined,
        plotArea: prop.plotArea || undefined,
        areaUnit: prop.areaUnit,
        bedrooms: prop.bedrooms || undefined,
        bathrooms: prop.bathrooms || undefined,
        balconies: prop.balconies || undefined,
        floorNumber: prop.floorNumber || undefined,
        totalFloors: prop.totalFloors || undefined,
        facing: prop.facing || undefined,
        furnishingStatus: prop.furnishingStatus || undefined,
        possessionStatus: prop.possessionStatus || undefined,
        verified: prop.verified,
        featured: prop.featured,
        isSampleData: false,
        images: prop.images.map((img) => ({
          url: img.url,
          altText: img.altText || prop.title,
          isPrimary: img.isPrimary,
        })),
        amenities: prop.amenities.map((a) => a.amenity.name),
        createdAt: prop.createdAt.toISOString(),
      };
    }
  } catch (err) {
    // DB offline fallback
  }

  const found = inMemoryProperties.find(
    (p) => p.slug === slugOrRef || p.referenceId.toLowerCase() === slugOrRef.toLowerCase()
  );

  return found || null;
}

export async function createProperty(data: any) {
  const count = inMemoryProperties.length + 101;
  const refCode = data.referenceId || `JR-${data.category?.substring(0, 3) || 'PRP'}-${count}`;
  const slug = `${slugify(data.title || 'property')}-${refCode.toLowerCase()}`;

  const newProperty: SampleProperty = {
    id: `prop-${Date.now()}`,
    referenceId: refCode,
    slug,
    title: data.title,
    description: data.description,
    transactionType: data.transactionType || 'BUY',
    category: data.category || 'PLOT_LAND',
    status: data.status || 'DRAFT',
    localityName: data.localityName || 'Pandeypur Chauraha',
    localitySlug: slugify(data.localityName || 'pandeypur-chauraha'),
    address: data.address,
    landmark: data.landmark,
    price: Number(data.price) || 0,
    priceDisplay: data.priceDisplay || `₹ ${Number(data.price || 0).toLocaleString('en-IN')}`,
    isPriceNegotiable: Boolean(data.isPriceNegotiable),
    carpetArea: data.carpetArea ? Number(data.carpetArea) : undefined,
    builtUpArea: data.builtUpArea ? Number(data.builtUpArea) : undefined,
    plotArea: data.plotArea ? Number(data.plotArea) : undefined,
    areaUnit: data.areaUnit || 'sq.ft',
    bedrooms: data.bedrooms ? Number(data.bedrooms) : undefined,
    bathrooms: data.bathrooms ? Number(data.bathrooms) : undefined,
    facing: data.facing,
    furnishingStatus: data.furnishingStatus,
    possessionStatus: data.possessionStatus || 'READY_TO_MOVE',
    verified: Boolean(data.verified),
    featured: Boolean(data.featured),
    isSampleData: false,
    images: data.images?.length
      ? data.images
      : [
          {
            url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
            altText: data.title,
            isPrimary: true,
          },
        ],
    amenities: data.amenities || ['24x7 Water Supply', 'Road Access'],
    createdAt: new Date().toISOString(),
  };

  inMemoryProperties.unshift(newProperty);
  return newProperty;
}

export async function updateProperty(id: string, data: any) {
  const index = inMemoryProperties.findIndex((p) => p.id === id);
  if (index !== -1) {
    inMemoryProperties[index] = {
      ...inMemoryProperties[index],
      ...data,
      price: data.price !== undefined ? Number(data.price) : inMemoryProperties[index].price,
    };
    return inMemoryProperties[index];
  }
  return null;
}

export async function duplicateProperty(id: string) {
  const existing = inMemoryProperties.find((p) => p.id === id);
  if (!existing) return null;

  const count = inMemoryProperties.length + 102;
  const newRef = `JR-CLONE-${count}`;
  const newSlug = `${slugify(existing.title)}-copy-${newRef.toLowerCase()}`;

  const duplicated: SampleProperty = {
    ...existing,
    id: `prop-${Date.now()}`,
    referenceId: newRef,
    slug: newSlug,
    title: `${existing.title} (Draft Copy)`,
    status: 'DRAFT',
    featured: false,
    createdAt: new Date().toISOString(),
  };

  inMemoryProperties.unshift(duplicated);
  return duplicated;
}

export async function archiveProperty(id: string) {
  return updateProperty(id, { status: 'ARCHIVED' });
}

export async function publishProperty(id: string) {
  return updateProperty(id, { status: 'PUBLISHED' });
}
