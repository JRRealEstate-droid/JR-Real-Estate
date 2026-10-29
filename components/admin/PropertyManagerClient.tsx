'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SampleProperty } from '@/lib/data/sample-data';
import {
  adminCreatePropertyAction,
  adminUpdatePropertyAction,
  adminDuplicatePropertyAction,
  adminPublishPropertyAction,
  adminArchivePropertyAction,
} from '@/app/actions/properties';
import { PROPERTY_CATEGORIES, VARANASI_LOCALITIES } from '@/lib/constants';
import { formatCurrencyINR, getCategoryLabel } from '@/lib/utils';
import {
  Plus,
  Copy,
  Archive,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileSpreadsheet,
  Building,
  MapPin,
  Search,
  Filter,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface PropertyManagerClientProps {
  initialProperties: SampleProperty[];
}

export function PropertyManagerClient({ initialProperties }: PropertyManagerClientProps) {
  const [properties, setProperties] = useState<SampleProperty[]>(initialProperties);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const filtered = properties.filter((p) => {
    if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
    if (selectedStatus !== 'ALL' && p.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.referenceId.toLowerCase().includes(q) ||
        p.localityName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = await adminCreatePropertyAction(formData);

    setSubmitting(false);
    if (res.success && res.property) {
      setProperties([res.property, ...properties]);
      setShowCreateModal(false);
      setMessage({ text: `Property "${res.property.title}" created successfully as ${res.property.status}!` });
    } else {
      setMessage({ text: res.error || 'Failed to create property', isError: true });
    }
  };

  const handleDuplicate = async (id: string) => {
    const res = await adminDuplicatePropertyAction(id);
    if (res.success && res.property) {
      setProperties([res.property, ...properties]);
      setMessage({ text: `Cloned property as draft (${res.property.referenceId})` });
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: string) => {
    if (currentStatus === 'PUBLISHED') {
      const res = await adminArchivePropertyAction(id);
      if (res.success) {
        setProperties(properties.map((p) => (p.id === id ? { ...p, status: 'ARCHIVED' } : p)));
        setMessage({ text: 'Listing moved to Archived status. Removed from public view.' });
      }
    } else {
      const res = await adminPublishPropertyAction(id);
      if (res.success) {
        setProperties(properties.map((p) => (p.id === id ? { ...p, status: 'PUBLISHED' } : p)));
        setMessage({ text: 'Property published! Now visible in public search.' });
      }
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    const res = await adminUpdatePropertyAction(id, { featured: !currentFeatured });
    if (res.success) {
      setProperties(properties.map((p) => (p.id === id ? { ...p, featured: !currentFeatured } : p)));
      setMessage({ text: `Featured status updated to ${!currentFeatured ? 'Yes' : 'No'}` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ivory">
            Property Listings &amp; Inventory Workflow
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Manage drafts, published listings, pricing, and archive history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/reports/properties"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-charcoal-200 hover:bg-charcoal-100 border border-charcoal-100 text-xs text-ivory/80 font-medium transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-gold" />
            <span>Export Properties CSV</span>
          </a>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create New Property</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
            message.isError
              ? 'bg-red-500/10 border border-red-500/30 text-red-300'
              : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
          }`}
        >
          {message.isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Filter Row */}
      <div className="bg-charcoal-200 border border-charcoal-100 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-ivory/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, title or locality..."
              className="pl-8 pr-3 py-1.5 bg-charcoal-300 border border-charcoal-100 rounded-lg text-xs text-ivory focus:outline-none focus:border-gold w-56 sm:w-64"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-charcoal-300 border border-charcoal-100 rounded-lg px-3 py-1.5 text-xs text-ivory focus:outline-none focus:border-gold"
          >
            <option value="ALL">All Categories</option>
            {PROPERTY_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-charcoal-300 border border-charcoal-100 rounded-lg px-3 py-1.5 text-xs text-ivory focus:outline-none focus:border-gold"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published (Public)</option>
            <option value="DRAFT">Draft</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="SOLD">Sold</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="text-xs text-ivory/60">
          Showing <strong>{filtered.length}</strong> properties
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-charcoal-300/80 text-ivory/60 border-b border-charcoal-100">
                <th className="py-3 px-4 font-semibold">Ref ID</th>
                <th className="py-3 px-4 font-semibold">Property Title</th>
                <th className="py-3 px-4 font-semibold">Locality</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Featured</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100/50">
              {filtered.map((property) => (
                <tr key={property.id} className="hover:bg-charcoal-100/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gold">
                    {property.referenceId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-ivory line-clamp-1 max-w-sm">
                      {property.title}
                    </div>
                    <div className="text-[10px] text-ivory/50 flex items-center gap-2 mt-0.5">
                      <span>{getCategoryLabel(property.category)}</span>
                      {property.carpetArea && <span>&bull; {property.carpetArea} sq.ft</span>}
                      {property.isSampleData && <span className="text-amber-400 font-medium">(Sample)</span>}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-ivory/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold/70" />
                      <span>{property.localityName}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-serif font-bold text-gold">
                    {property.priceDisplay}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-charcoal-300 border border-charcoal-100 text-ivory/80">
                      {property.transactionType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        property.status === 'PUBLISHED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : property.status === 'DRAFT'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-charcoal-300 text-ivory/60 border border-charcoal-100'
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(property.id, property.featured)}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                        property.featured
                          ? 'bg-gold/20 text-gold border border-gold/40'
                          : 'text-ivory/40 hover:text-ivory'
                      }`}
                    >
                      {property.featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Link */}
                      <Link
                        href={`/properties/${property.slug}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-charcoal-100 text-ivory/70 hover:text-gold transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      {/* Duplicate action */}
                      <button
                        type="button"
                        onClick={() => handleDuplicate(property.id)}
                        className="p-1.5 rounded hover:bg-charcoal-100 text-ivory/70 hover:text-gold transition-colors"
                        title="Clone as Draft"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Publish / Unpublish Toggle */}
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(property.id, property.status)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                          property.status === 'PUBLISHED'
                            ? 'bg-charcoal-300 text-amber-300 hover:bg-amber-500/20 border border-charcoal-100'
                            : 'bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/40 border border-emerald-500/40'
                        }`}
                      >
                        {property.status === 'PUBLISHED' ? 'Archive' : 'Publish'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-8 text-center text-ivory/60 text-xs">
              No properties found matching the selected filter criteria.
            </div>
          )}
        </div>
      </div>

      {/* Create Property Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-charcoal-200 border border-gold/40 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
              <h2 className="font-serif font-bold text-xl text-ivory">
                Create New Property Listing
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-ivory/60 hover:text-white text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-ivory/80 font-medium mb-1">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. 3 BHK Luxury Apartment in Sigra"
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ivory/80 font-medium mb-1">Transaction Type</label>
                  <select
                    name="transactionType"
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="BUY">Buy / For Sale</option>
                    <option value="RENT">Rent / For Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/80 font-medium mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                  >
                    {PROPERTY_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ivory/80 font-medium mb-1">Locality in Varanasi *</label>
                  <select
                    name="localityName"
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                  >
                    {VARANASI_LOCALITIES.map((l) => (
                      <option key={l.slug} value={l.name}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/80 font-medium mb-1">Price in INR (e.g. 4500000) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    placeholder="4500000"
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-ivory/80 font-medium mb-1">Display Price Label</label>
                  <input
                    type="text"
                    name="priceDisplay"
                    placeholder="e.g. ₹ 45 Lakh"
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/80 font-medium mb-1">Carpet Area (sq.ft)</label>
                  <input
                    type="number"
                    name="carpetArea"
                    placeholder="1350"
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/80 font-medium mb-1">Bedrooms (BHK)</label>
                  <input
                    type="number"
                    name="bedrooms"
                    placeholder="3"
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">Address &amp; Landmark</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Near Pandeypur Chauraha..."
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-medium mb-1">Detailed Description *</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  placeholder="Describe road width, facing, water connection, registry status..."
                  className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-charcoal-300 border border-charcoal-100 cursor-pointer">
                  <input type="checkbox" name="featured" value="true" className="w-4 h-4 accent-gold" />
                  <span className="text-ivory/80">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-charcoal-300 border border-charcoal-100 cursor-pointer">
                  <input type="checkbox" name="verified" value="true" className="w-4 h-4 accent-gold" />
                  <span className="text-ivory/80">Title Verified Badge</span>
                </label>
              </div>

              <div className="pt-3 border-t border-charcoal-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-charcoal-300 text-ivory/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg bg-gold text-charcoal font-bold shadow-gold hover:bg-gold-hover transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Save as Draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
