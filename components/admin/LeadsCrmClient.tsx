'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LeadItem } from '@/lib/data/leads';
import {
  adminUpdateLeadStatus,
  adminAddLeadNote,
  adminMergeLeadsAction,
} from '@/app/actions/leads';
import { formatDateTime, formatDate, getWhatsAppUrl } from '@/lib/utils';
import { BRAND } from '@/lib/constants';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  GitMerge,
  Send,
  Plus,
  ShieldCheck,
  Tag,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface LeadsCrmClientProps {
  initialLeads: LeadItem[];
  selectedLeadId?: string;
}

export function LeadsCrmClient({ initialLeads, selectedLeadId }: LeadsCrmClientProps) {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(
    leads.find((l) => l.id === selectedLeadId) || leads[0] || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');

  // New Note state
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState<'NOTE' | 'CALL' | 'WHATSAPP' | 'SITE_VISIT'>('CALL');
  const [submittingNote, setSubmittingNote] = useState(false);

  // Merge state
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [mergeSecondaryId, setMergeSecondaryId] = useState('');

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== 'ALL' && lead.status !== statusFilter) return false;
    if (sourceFilter !== 'ALL' && lead.leadSource !== sourceFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        lead.fullName.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.referenceCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Check if current selected lead has duplicates
  const duplicateLeads = selectedLead
    ? leads.filter((l) => l.id !== selectedLead.id && l.phone === selectedLead.phone)
    : [];

  const handleStatusChange = async (newStatus: any) => {
    if (!selectedLead) return;
    const res = await adminUpdateLeadStatus(selectedLead.id, newStatus, 'Mr. Umesh Yadav');
    if (res.success && res.updated) {
      const updatedList = leads.map((l) => (l.id === selectedLead.id ? res.updated! : l));
      setLeads(updatedList);
      setSelectedLead(res.updated);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !noteText.trim()) return;

    setSubmittingNote(true);
    const res = await adminAddLeadNote(selectedLead.id, noteText, noteType, 'Mr. Umesh Yadav');
    setSubmittingNote(false);

    if (res.success && res.updated) {
      const updatedList = leads.map((l) => (l.id === selectedLead.id ? res.updated! : l));
      setLeads(updatedList);
      setSelectedLead(res.updated);
      setNoteText('');
    }
  };

  const handleMergeConfirm = async () => {
    if (!selectedLead || !mergeSecondaryId) return;
    const res = await adminMergeLeadsAction(selectedLead.id, mergeSecondaryId, 'Mr. Umesh Yadav');
    if (res.success && res.merged) {
      const remainingLeads = leads
        .filter((l) => l.id !== mergeSecondaryId)
        .map((l) => (l.id === selectedLead.id ? res.merged! : l));
      setLeads(remainingLeads);
      setSelectedLead(res.merged);
      setShowMergeModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ivory">
            Leads CRM &amp; Pipeline Management
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Capture, follow-up, status progression, and duplicate phone resolution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/reports/leads"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-charcoal-200 hover:bg-charcoal-100 border border-charcoal-100 text-xs text-ivory/80 font-medium transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-gold" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Main 2-Column CRM Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[680px]">
        {/* Left Column: Leads Table & Filter (7 Cols) */}
        <div className="lg:col-span-7 bg-charcoal-200 border border-charcoal-100 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xl">
          <div className="p-4 border-b border-charcoal-100 space-y-3">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-ivory/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lead name, phone or ref..."
                  className="w-full pl-8 pr-3 py-1.5 bg-charcoal-300 border border-charcoal-100 rounded-lg text-xs text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-charcoal-300 border border-charcoal-100 rounded-lg px-2.5 py-1.5 text-xs text-ivory focus:outline-none focus:border-gold"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New (Uncontacted)</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="VISIT_SCHEDULED">Visit Scheduled</option>
                <option value="VISIT_COMPLETED">Visit Completed</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="CONVERTED">Converted</option>
                <option value="LOST_ON_HOLD">Lost / On Hold</option>
              </select>

              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="bg-charcoal-300 border border-charcoal-100 rounded-lg px-2.5 py-1.5 text-xs text-ivory focus:outline-none focus:border-gold"
              >
                <option value="ALL">All Sources</option>
                <option value="PROPERTY_INQUIRY">Property Page</option>
                <option value="CONSTRUCTION_FORM">Construction</option>
                <option value="SELL_PROPERTY">Sell Listing</option>
                <option value="WEBSITE_CONTACT">General Contact</option>
              </select>
            </div>
          </div>

          {/* Leads List */}
          <div className="divide-y divide-charcoal-100/60 overflow-y-auto max-h-[600px] flex-1">
            {filteredLeads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              const hasDupes = leads.some((l) => l.id !== lead.id && l.phone === lead.phone);

              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-charcoal-100 border-l-4 border-gold shadow-inner'
                      : 'hover:bg-charcoal-100/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gold text-xs">
                          {lead.referenceCode}
                        </span>
                        {hasDupes && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            Duplicate Phone
                          </span>
                        )}
                        <span className="text-[10px] text-ivory/50">
                          {formatDate(lead.createdAt)}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-sm text-ivory mt-1">
                        {lead.fullName}
                      </h3>

                      <div className="text-xs text-ivory/70 flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gold/80" />
                          <span>{lead.phone}</span>
                        </span>
                        {lead.localityPreference && (
                          <span>&bull; {lead.localityPreference}</span>
                        )}
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.status === 'NEW'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : lead.status === 'VISIT_SCHEDULED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : lead.status === 'CONVERTED'
                            ? 'bg-gold/20 text-gold border border-gold/40'
                            : 'bg-charcoal-300 text-ivory/70 border border-charcoal-100'
                        }`}
                      >
                        {lead.status.replace(/_/g, ' ')}
                      </span>
                      <div className="text-[10px] text-ivory/50">
                        {lead.leadSource.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredLeads.length === 0 && (
              <div className="p-8 text-center text-ivory/60 text-xs">
                No leads found matching your criteria.
              </div>
            )}
          </div>

          <div className="p-3 bg-charcoal-300 border-t border-charcoal-100 text-[11px] text-ivory/50 flex justify-between">
            <span>Showing {filteredLeads.length} of {leads.length} leads</span>
            <span>Assigned Officer: Mr. Umesh Yadav</span>
          </div>
        </div>

        {/* Right Column: Lead Detail & Action Drawer (5 Cols) */}
        <div className="lg:col-span-5 bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 flex flex-col justify-between overflow-y-auto max-h-[720px] shadow-xl">
          {selectedLead ? (
            <div className="space-y-6">
              {/* Header with Duplicate Alert */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-charcoal-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gold text-sm">
                      {selectedLead.referenceCode}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-300 text-ivory/70 border border-charcoal-100 font-mono">
                      {selectedLead.priority} Priority
                    </span>
                  </div>

                  {duplicateLeads.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setMergeSecondaryId(duplicateLeads[0].id);
                        setShowMergeModal(true);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-colors"
                    >
                      <GitMerge className="w-3 h-3" />
                      <span>Merge Duplicate ({duplicateLeads.length})</span>
                    </button>
                  )}
                </div>

                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-ivory">
                      {selectedLead.fullName}
                    </h2>
                    <div className="text-xs text-gold mt-0.5 flex items-center gap-2">
                      <a href={`tel:${selectedLead.phone}`} className="hover:underline font-bold">
                        {selectedLead.phone}
                      </a>
                      {selectedLead.email && (
                        <span className="text-ivory/60">&bull; {selectedLead.email}</span>
                      )}
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl(selectedLead.phone, `Namaste ${selectedLead.fullName}, this is Umesh Yadav from JR Real Estate Varanasi regarding your inquiry.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30"
                    title="Send WhatsApp message"
                  >
                    <MessageSquare className="w-4 h-4 fill-emerald-400" />
                  </a>
                </div>
              </div>

              {/* Status Progression Dropdown */}
              <div className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100 space-y-2">
                <label className="block text-[11px] font-semibold text-ivory/60 uppercase tracking-wider">
                  Pipeline Status Progression
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full bg-charcoal-200 border border-gold/40 rounded-lg p-2 text-xs font-bold text-gold focus:outline-none"
                >
                  <option value="NEW">New (Uncontacted)</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified Buyer / Builder</option>
                  <option value="VISIT_SCHEDULED">Visit Scheduled</option>
                  <option value="VISIT_COMPLETED">Visit Completed</option>
                  <option value="NEGOTIATION">Token Negotiation</option>
                  <option value="CONVERTED">Converted / Deal Done</option>
                  <option value="LOST_ON_HOLD">Lost / On Hold</option>
                </select>
              </div>

              {/* Inquiry & Property Linked */}
              <div className="space-y-2 text-xs">
                <div className="text-[11px] font-semibold text-ivory/60 uppercase">
                  Requirement Details
                </div>
                <div className="p-3 rounded-xl bg-charcoal-300 border border-charcoal-100/70 text-ivory/80 leading-relaxed">
                  {selectedLead.requirementDetails || 'No additional note provided.'}
                </div>

                {selectedLead.propertyTitle && (
                  <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-ivory/60 uppercase">Linked Property:</div>
                      <div className="font-semibold text-xs">{selectedLead.propertyTitle}</div>
                    </div>
                    {selectedLead.propertyRef && (
                      <span className="font-mono text-xs">{selectedLead.propertyRef}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Add Note & Activity Logger */}
              <div className="space-y-3 pt-3 border-t border-charcoal-100">
                <div className="text-[11px] font-semibold text-ivory/60 uppercase">
                  Log Interaction / Call Note
                </div>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'CALL', label: 'Call Log' },
                      { id: 'NOTE', label: 'Note' },
                      { id: 'WHATSAPP', label: 'WhatsApp' },
                      { id: 'SITE_VISIT', label: 'Site Visit' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setNoteType(t.id as any)}
                        className={`py-1 rounded text-[10px] font-semibold transition-colors ${
                          noteType === t.id
                            ? 'bg-gold text-charcoal font-bold'
                            : 'bg-charcoal-300 text-ivory/60 hover:text-white border border-charcoal-100'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={2}
                    placeholder="Enter call notes, client budget feedback, agreed visit time..."
                    className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-xs text-ivory focus:outline-none focus:border-gold"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={submittingNote || !noteText.trim()}
                    className="w-full py-2 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingNote ? 'Saving...' : 'Add Activity to History'}</span>
                  </button>
                </form>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-2.5 pt-3 border-t border-charcoal-100">
                <div className="text-[11px] font-semibold text-ivory/60 uppercase">
                  Activity Timeline ({selectedLead.activities?.length || 0})
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedLead.activities?.map((act) => (
                    <div
                      key={act.id}
                      className="p-2.5 rounded-lg bg-charcoal-300 border border-charcoal-100/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-ivory/50">
                        <span className="font-bold text-gold uppercase">{act.type}</span>
                        <span>{formatDateTime(act.createdAt)}</span>
                      </div>
                      <p className="text-ivory/80 leading-snug">{act.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-ivory/50 text-xs">
              Select a lead from the list to view details and log activities.
            </div>
          )}
        </div>
      </div>

      {/* Merge Duplicate Leads Modal */}
      {showMergeModal && duplicateLeads.length > 0 && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-charcoal-200 border border-gold/40 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
                <GitMerge className="w-5 h-5 text-gold" />
                <span>Merge Duplicate Leads</span>
              </h3>
              <button
                onClick={() => setShowMergeModal(false)}
                className="text-ivory/60 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-ivory/70 leading-relaxed">
              We detected duplicate lead submissions for phone number <strong className="text-gold">{selectedLead.phone}</strong>. Merging will consolidate all notes and timelines into the primary record <strong className="font-mono text-white">{selectedLead.referenceCode}</strong> without losing history.
            </p>

            <div className="space-y-2 text-xs">
              <label className="block text-ivory/60 font-medium">Select duplicate to merge into this record:</label>
              <select
                value={mergeSecondaryId}
                onChange={(e) => setMergeSecondaryId(e.target.value)}
                className="w-full bg-charcoal-300 border border-charcoal-100 rounded-lg p-2.5 text-ivory focus:outline-none focus:border-gold"
              >
                {duplicateLeads.map((dup) => (
                  <option key={dup.id} value={dup.id}>
                    {dup.referenceCode} - {dup.fullName} ({dup.leadSource})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 text-xs">
              <button
                type="button"
                onClick={() => setShowMergeModal(false)}
                className="px-4 py-2 rounded-lg bg-charcoal-300 text-ivory/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleMergeConfirm}
                className="px-4 py-2 rounded-lg bg-gold text-charcoal font-bold shadow-gold hover:bg-gold-hover"
              >
                Confirm Merge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

