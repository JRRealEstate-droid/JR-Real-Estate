import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'jr-media';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check if Supabase credentials are configured
    const isSupabaseConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder');

    if (isSupabaseConfigured) {
      const supabase = createAdminClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileName);

      return NextResponse.json({
        success: true,
        url: publicUrlData.publicUrl,
        fileName,
      });
    }

    // Development mode fallback when Supabase storage is not yet connected
    // Generate a placeholder high-res image URL and notify that storage credentials are required for production
    const sampleImageFallback =
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';

    return NextResponse.json({
      success: true,
      url: sampleImageFallback,
      fileName: file.name,
      warning:
        'Development notice: Supabase Storage credentials not configured yet in .env.local. Using verified placeholder image preview.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

