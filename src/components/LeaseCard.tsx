"use client";

import { AlertTriangle, Calendar, MapPin, Trash2, User, FileText } from "lucide-react";

interface Lease {
  id: string;
  propertyName: string;
  address: string;
  landlordName: string;
  monthlyRent: number;
  securityDeposit: number;
  petDeposit: number;
  applicationFee: number;
  adminFee: number;
  parkingFee: number;
  utilities: string;
  leaseTermMonths: number;
  startDate: string;
  autoRenewal: boolean;
  terminationNoticeDays: number;
  riskyClauses: string[];
  status: string;
  uploadDate: string;
  totalFirstYearCost: number;
}

export function LeaseCard({
  lease,
  onDelete,
}: {
  lease: Lease;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white/[.07] backdrop-blur-xl border border-white/[.1] rounded-lg p-4 hover:bg-white/[.1] hover:border-white/[.2] transition-all duration-150 group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
            <FileText size={14} className="text-accent" />
          </div>
          <h3 className="text-white font-medium text-sm truncate pr-2">
            {lease.propertyName}
          </h3>
        </div>
        <button
          onClick={() => onDelete(lease.id)}
          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 text-white/50 hover:text-red-400 rounded-md transition-all flex-shrink-0"
          aria-label="Delete lease"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="text-white/60 text-xs space-y-2 mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin size={12} className="text-accent flex-shrink-0" />
          <span className="truncate">{lease.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={12} className="text-accent flex-shrink-0" />
          <span className="truncate">{lease.landlordName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-accent flex-shrink-0" />
          <span>
            {new Date(lease.startDate).toLocaleDateString()} •{" "}
            {lease.leaseTermMonths}mo
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[.05]">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/40 font-medium mb-0.5">
            Monthly
          </div>
          <div className="text-white font-semibold tabular-nums">
            ${lease.monthlyRent.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-white/40 font-medium mb-0.5">
            First Year
          </div>
          <div className="text-accent font-semibold tabular-nums">
            ${lease.totalFirstYearCost.toLocaleString()}
          </div>
        </div>
      </div>

      {lease.riskyClauses.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-2">
            <AlertTriangle size={12} />
            <span className="font-medium">
              {lease.riskyClauses.length} Risky Clauses
            </span>
          </div>
          <ul className="space-y-1">
            {lease.riskyClauses.slice(0, 2).map((clause, idx) => (
              <li
                key={idx}
                className="text-[11px] text-white/50 truncate leading-tight"
              >
                • {clause}
              </li>
            ))}
            {lease.riskyClauses.length > 2 && (
              <li className="text-[11px] text-white/40">
                + {lease.riskyClauses.length - 2} more
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}