'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Upload, Copy, Check, AlertCircle, Database } from 'lucide-react';

const DEFAULT_MEDIA = [
  {
    id: 'm-1',
    name: 'varanasi-plot-pandeypur.jpg',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    size: '1.2 MB',
    type: 'Plot Land',
  },
  {
    id: 'm-2',
    name: 'sigra-luxury-flat.jpg',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    size: '850 KB',
    type: 'Apartment',
  },
  {
    id: 'm-3',
    name: 'shivpur-duplex-kothi.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    size: '1.4 MB',
    type: 'Villa',
  },
  {
    id: 'm-4',
    name: 'orderly-bazar-shop.jpg',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    size: '920 KB',
    type: 'Commercial',
  },
  {
    id: 'm-5',
    name: 'construction-site-slab.jpg',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    size: '1.8 MB',
    type: 'Construction',
  },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState(DEFAULT_MEDIA);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadNotice(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        setMediaList([
          {
            id: `m-${Date.now()}`,
            name: file.name,
            url: data.url,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            type: 'Uploaded Asset',
          },
          ...mediaList,
        ]);
        if (data.warning) {
          setUploadNotice(data.warning);
        } else {
          setUploadNotice('Image uploaded successfully to Supabase Storage!');
        }
      } else {
        setUploadNotice(data.error || 'Failed to upload image.');
      }
    } catch (err: any) {
      setUploadNotice(err.message || 'Network error during upload.');
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (id: string, url: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ivory">
            Media Library &amp; Supabase Storage
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Store and manage property photographs, project elevations, and site documentation.
          </p>
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {uploadNotice && (
        <div className="p-3.5 rounded-xl bg-charcoal-200 border border-gold/40 text-xs text-ivory/80 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gold flex-shrink-0" />
          <span>{uploadNotice}</span>
        </div>
      )}

      {/* Storage Infrastructure Notice */}
      <div className="p-4 rounded-xl bg-charcoal-200 border border-charcoal-100 flex items-center justify-between text-xs text-ivory/70">
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-gold flex-shrink-0" />
          <span>
            Storage Engine: <strong className="text-ivory">Supabase Storage (`jr-media` bucket)</strong>. Service-role operations restricted to server-side only.
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Ready
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map((item) => (
          <div
            key={item.id}
            className="bg-charcoal-200 border border-charcoal-100 rounded-xl overflow-hidden shadow-lg group hover:border-gold/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full bg-charcoal-300">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-charcoal/80 text-gold border border-charcoal-100 backdrop-blur-sm">
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-3 space-y-1 text-xs">
                <div className="font-semibold text-ivory truncate">{item.name}</div>
                <div className="text-[10px] text-ivory/50">{item.size}</div>
              </div>
            </div>

            <div className="p-3 pt-0 border-t border-charcoal-100/60 mt-2">
              <button
                type="button"
                onClick={() => copyUrl(item.id, item.url)}
                className="w-full py-1.5 rounded bg-charcoal-300 hover:bg-gold hover:text-charcoal border border-charcoal-100 text-gold text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
