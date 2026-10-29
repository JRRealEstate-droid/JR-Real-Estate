import React from 'react';
import { ROLE_PERMISSIONS } from '@/lib/auth';
import { ShieldCheck, Users, CheckCircle2, UserPlus, Key } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 'usr-1',
    name: 'Mr. Umesh Yadav',
    email: 'director@jrrealestate.in',
    phone: '8948301111',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 'usr-2',
    name: 'Amitabh Tiwari',
    email: 'sales@jrrealestate.in',
    phone: '9839123456',
    role: 'SALES_MANAGER',
    status: 'ACTIVE',
  },
  {
    id: 'usr-3',
    name: 'Er. Sandeep Singh',
    email: 'construction@jrrealestate.in',
    phone: '9415876543',
    role: 'CONSTRUCTION_MANAGER',
    status: 'ACTIVE',
  },
  {
    id: 'usr-4',
    name: 'Pooja Verma',
    email: 'content@jrrealestate.in',
    phone: '9918234567',
    role: 'CONTENT_MANAGER',
    status: 'ACTIVE',
  },
  {
    id: 'usr-5',
    name: 'Vikas Maurya',
    email: 'property@jrrealestate.in',
    phone: '9838765432',
    role: 'PROPERTY_MANAGER',
    status: 'ACTIVE',
  },
];

export default function AdminTeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ivory">
            Team Accounts &amp; Server-Side Role Permissions
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Map Supabase Auth users to application roles stored in PostgreSQL.
          </p>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-charcoal-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gold" />
            <h2 className="font-serif font-bold text-base text-ivory">Authorized Staff Members</h2>
          </div>
          <span className="text-xs text-ivory/60 font-mono">{TEAM_MEMBERS.length} Active Accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-charcoal-300 text-ivory/60 border-b border-charcoal-100">
                <th className="py-3 px-4 font-semibold">Staff Member</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Phone</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Access Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100/50">
              {TEAM_MEMBERS.map((member) => (
                <tr key={member.id} className="hover:bg-charcoal-100/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-ivory flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-[11px] border border-gold/30">
                      {member.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span>{member.name}</span>
                  </td>
                  <td className="py-3 px-4 text-ivory/70 font-mono">{member.email}</td>
                  <td className="py-3 px-4 text-gold/90 font-mono">{member.phone}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-charcoal-300 text-gold border border-gold/30">
                      {member.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-[11px] text-ivory/60">
                    {member.role === 'SUPER_ADMIN' ? 'Full System & Logs' : 'Restricted Module'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Matrix Card */}
      <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="font-serif font-bold text-lg text-ivory pb-2 border-b border-charcoal-100 flex items-center gap-2">
          <Key className="w-4 h-4 text-gold" />
          <span>Server-Side RBAC Permission Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {Object.entries(ROLE_PERMISSIONS).map(([role, perms]) => (
            <div
              key={role}
              className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100/70 space-y-1.5"
            >
              <div className="font-serif font-bold text-gold text-sm">{role.replace(/_/g, ' ')}</div>
              <ul className="text-[11px] text-ivory/70 space-y-1">
                {perms.map((p, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-gold/80 flex-shrink-0" />
                    <span className="font-mono">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
