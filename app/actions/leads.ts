'use server';

import { createLead, updateLead, addLeadActivity, mergeLeads } from '@/lib/data/leads';
import { createSiteVisit } from '@/lib/data/site-visits';
import { addAuditLog } from '@/lib/data/content';
import { revalidatePath } from 'next/cache';

export async function submitPropertyInquiry(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const propertyId = formData.get('propertyId') as string;
    const propertyTitle = formData.get('propertyTitle') as string;
    const propertyRef = formData.get('propertyRef') as string;
    const message = formData.get('message') as string;
    const preferredVisitDate = formData.get('preferredVisitDate') as string;

    if (!fullName || !phone) {
      return { success: false, error: 'Please enter your name and phone number.' };
    }

    const { lead, isDuplicate } = await createLead({
      fullName,
      phone,
      email: email || undefined,
      propertyId: propertyId || undefined,
      propertyTitle: propertyTitle || undefined,
      propertyRef: propertyRef || undefined,
      leadSource: 'PROPERTY_INQUIRY',
      requirementDetails: message || `Enquired about property: ${propertyTitle} (${propertyRef})`,
    });

    // If site visit date was requested
    if (preferredVisitDate) {
      await createSiteVisit({
        leadId: lead.id,
        leadName: fullName,
        leadPhone: phone,
        propertyId,
        propertyTitle,
        propertyRef,
        scheduledAt: new Date(preferredVisitDate).toISOString(),
        visitNotes: `Requested via property page enquiry. Note: ${message || 'No additional note'}`,
      });
      await updateLead(lead.id, { status: 'VISIT_SCHEDULED' });
    }

    revalidatePath('/admin/leads');
    revalidatePath('/admin');

    return {
      success: true,
      referenceCode: lead.referenceCode,
      message: 'Thank you! Our property specialist will contact you shortly.',
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Something went wrong. Please try again.' };
  }
}

export async function submitConstructionInquiry(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const plotLocation = formData.get('plotLocation') as string;
    const plotOwnership = (formData.get('plotOwnership') as string) || 'OWNED';
    const plotAreaSqFt = Number(formData.get('plotAreaSqFt')) || 0;
    const plannedFloors = formData.get('plannedFloors') as string;
    const estimatedBudget = formData.get('estimatedBudget') as string;
    const preferredPackage = formData.get('preferredPackage') as string;
    const drawingsAvailable = formData.get('drawingsAvailable') === 'true';
    const siteInspectionRequested = formData.get('siteInspectionRequested') === 'true';
    const notes = formData.get('notes') as string;

    if (!fullName || !phone) {
      return { success: false, error: 'Name and phone number are required.' };
    }

    const { lead } = await createLead({
      fullName,
      phone,
      email: email || undefined,
      localityPreference: plotLocation,
      budgetRange: estimatedBudget,
      leadSource: 'CONSTRUCTION_FORM',
      requirementDetails: `Turnkey Construction Request: ${plotAreaSqFt} sq.ft in ${plotLocation}. Floors: ${plannedFloors}. Package: ${preferredPackage}. Drawings ready: ${drawingsAvailable ? 'Yes' : 'No'}. Notes: ${notes || 'None'}`,
      constructionDetails: {
        plotOwnership,
        plotAreaSqFt,
        plotLocation,
        plannedFloors,
        estimatedBudget,
        drawingsAvailable,
        preferredPackage,
        siteInspectionRequested,
      },
    });

    if (siteInspectionRequested) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      await createSiteVisit({
        leadId: lead.id,
        leadName: fullName,
        leadPhone: phone,
        scheduledAt: tomorrow.toISOString(),
        visitNotes: `Complimentary site inspection requested at plot location: ${plotLocation}`,
        staffName: 'Umesh Yadav',
      });
      await updateLead(lead.id, { status: 'VISIT_SCHEDULED' });
    }

    revalidatePath('/admin/leads');
    revalidatePath('/admin/construction');

    return {
      success: true,
      referenceCode: lead.referenceCode,
      message: 'Your construction request has been received! Our engineer will review the details and reach out within 24 hours.',
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Submission failed.' };
  }
}

export async function submitSellProperty(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const propertyType = formData.get('propertyType') as string;
    const locality = formData.get('locality') as string;
    const address = formData.get('address') as string;
    const expectedPrice = formData.get('expectedPrice') as string;
    const area = formData.get('area') as string;
    const details = formData.get('details') as string;

    if (!fullName || !phone) {
      return { success: false, error: 'Full name and phone number are required.' };
    }

    const { lead } = await createLead({
      fullName,
      phone,
      localityPreference: locality,
      budgetRange: expectedPrice,
      propertyType,
      leadSource: 'SELL_PROPERTY',
      requirementDetails: `Sell Property Listing Request: ${propertyType} in ${locality}. Expected Price: ${expectedPrice}. Area: ${area}. Address: ${address}. Details: ${details || 'N/A'}`,
    });

    revalidatePath('/admin/leads');
    return {
      success: true,
      referenceCode: lead.referenceCode,
      message: 'Property listing submission received. Our team will verify the details and contact you for listing assistance.',
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Submission failed.' };
  }
}

export async function submitGeneralContact(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const serviceType = formData.get('serviceType') as string;
    const message = formData.get('message') as string;

    if (!fullName || !phone) {
      return { success: false, error: 'Name and phone are required.' };
    }

    const { lead } = await createLead({
      fullName,
      phone,
      email,
      leadSource: 'WEBSITE_CONTACT',
      requirementDetails: `Service: ${serviceType || 'General Inquiry'}. Message: ${message}`,
    });

    revalidatePath('/admin/leads');
    return {
      success: true,
      referenceCode: lead.referenceCode,
      message: 'Thank you for contacting JR Real Estate. We will get back to you shortly.',
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminUpdateLeadStatus(leadId: string, newStatus: any, authorName: string) {
  const updated = await updateLead(leadId, { status: newStatus }, authorName);
  await addAuditLog('LEAD_STATUS_UPDATE', 'Lead', `Status changed to ${newStatus}`, leadId);
  revalidatePath('/admin/leads');
  revalidatePath('/admin');
  return { success: true, updated };
}

export async function adminAddLeadNote(leadId: string, description: string, type: any, authorName: string) {
  const updated = await addLeadActivity(leadId, {
    type,
    description,
    authorName,
  });
  revalidatePath('/admin/leads');
  return { success: true, updated };
}

export async function adminMergeLeadsAction(primaryId: string, secondaryId: string, authorName: string) {
  const merged = await mergeLeads(primaryId, secondaryId, authorName);
  await addAuditLog('LEAD_MERGE', 'Lead', `Merged lead ${secondaryId} into ${primaryId}`, primaryId);
  revalidatePath('/admin/leads');
  return { success: true, merged };
}

