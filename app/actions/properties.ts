'use server';

import {
  createProperty,
  updateProperty,
  duplicateProperty,
  archiveProperty,
  publishProperty,
} from '@/lib/data/properties';
import { addAuditLog } from '@/lib/data/content';
import { revalidatePath } from 'next/cache';

export async function adminCreatePropertyAction(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const transactionType = formData.get('transactionType') as any;
    const category = formData.get('category') as any;
    const localityName = formData.get('localityName') as string;
    const address = formData.get('address') as string;
    const landmark = formData.get('landmark') as string;
    const price = Number(formData.get('price')) || 0;
    const priceDisplay = formData.get('priceDisplay') as string;
    const carpetArea = formData.get('carpetArea') ? Number(formData.get('carpetArea')) : undefined;
    const bedrooms = formData.get('bedrooms') ? Number(formData.get('bedrooms')) : undefined;
    const bathrooms = formData.get('bathrooms') ? Number(formData.get('bathrooms')) : undefined;
    const facing = formData.get('facing') as string;
    const possessionStatus = formData.get('possessionStatus') as any;
    const status = (formData.get('status') as any) || 'DRAFT';
    const featured = formData.get('featured') === 'true';
    const verified = formData.get('verified') === 'true';

    const prop = await createProperty({
      title,
      description,
      transactionType,
      category,
      localityName,
      address,
      landmark,
      price,
      priceDisplay: priceDisplay || `₹ ${price.toLocaleString('en-IN')}`,
      carpetArea,
      bedrooms,
      bathrooms,
      facing,
      possessionStatus,
      status,
      featured,
      verified,
    });

    await addAuditLog('PROPERTY_CREATED', 'Property', `Created property draft: ${title} (${prop.referenceId})`, prop.id);

    revalidatePath('/admin/properties');
    revalidatePath('/properties');
    revalidatePath('/buy');
    revalidatePath('/rent');

    return { success: true, property: prop };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminUpdatePropertyAction(id: string, updates: any) {
  try {
    const updated = await updateProperty(id, updates);
    await addAuditLog('PROPERTY_UPDATED', 'Property', `Updated property ${id} details/price`, id);

    revalidatePath('/admin/properties');
    revalidatePath('/properties');
    revalidatePath(`/properties/${updated?.slug}`);

    return { success: true, property: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminDuplicatePropertyAction(id: string) {
  try {
    const dup = await duplicateProperty(id);
    if (!dup) return { success: false, error: 'Property not found' };

    await addAuditLog('PROPERTY_DUPLICATED', 'Property', `Duplicated property ${id} to ${dup.referenceId}`, dup.id);
    revalidatePath('/admin/properties');
    return { success: true, property: dup };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminPublishPropertyAction(id: string) {
  try {
    const published = await publishProperty(id);
    await addAuditLog('PROPERTY_PUBLISHED', 'Property', `Published property ${id} to public website`, id);
    revalidatePath('/admin/properties');
    revalidatePath('/properties');
    return { success: true, property: published };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminArchivePropertyAction(id: string) {
  try {
    const archived = await archiveProperty(id);
    await addAuditLog('PROPERTY_ARCHIVED', 'Property', `Archived property ${id}`, id);
    revalidatePath('/admin/properties');
    revalidatePath('/properties');
    return { success: true, property: archived };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
