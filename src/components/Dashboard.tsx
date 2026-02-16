'use client'

import { DollarSign, FileText, AlertTriangle, TrendingUp, Calendar } from 'lucide-react'

interface Lease {
  id: string
  propertyName: string
  monthlyRent: number
  securityDeposit: number
  petDeposit: number
  applicationFee: number
  adminFee: number
  parkingFee: number
  riskyClauses: string[]
  uploadDate: string
  totalFirstYearCost: number
  leaseTermMonths: number
}

export function Dashboard({ leases }: { leases: Lease[] }) {
  const totalLeases = leases.length
  const avgRent = leases.reduce((acc, l) => acc + l.monthlyRent, 0) / totalLeases || 0
  const totalFees = leases.reduce((acc, l) => acc + l.securityDeposit + l.petDeposit + l.applicationFee + l.adminFee, 0)
  const avgFirstYear = leases.reduce((acc, l) => acc + l.totalFirstYearCost, 0) / totalLeases || 0
  const riskCount = leases.reduce((acc, l) => acc + l.riskyClauses.length, 0)
  const autoRenewalCount = leases.filter(l => l.autoRenewal).length
  
  const stats = [
    { label: 'Leases Analyzed', value: totalLeases, icon: FileText, color: 'text-blue-400' },
    { label: 'Avg Monthly Rent', value: `$${Math.round(avgRent).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Total Move-in Fees', value: `$${totalFees.toLocaleString()}`, icon: TrendingUp, color: 'text-violet-400' },
    { label: 'Risky Clauses Found', value: riskCount, icon: AlertTriangle, color: 'text-amber-400' },
  ]
  
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h2 className="text-white font-semibold text-lg tracking-tight mb-1">Dashboard Overview</h2>
        <p className="text-white/50 text-sm">Financial summary and risk analysis across all leases</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/[.07] border border-white/[.1] rounded-lg p-4 hover:bg-white/[.08] transition-colors">
            <div className="flex items-center gap-2 text-white/50 mb-3">
              <stat.icon size={16} className={stat.color} />
              <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-2xl font-semibold text-white tabular-nums tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/[.07] border border-white/[.1] rounded-lg p-4">
          <h3 className="text-white font-medium text-sm mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-accent" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {leases.slice(0, 6).map((lease) => (
              <div key={lease.id} className="flex items-center justify-between text-sm py-2 border-b border-white/[.05] last:border-0">
                <div className="min-w-0 flex-1">
                  <div className="text-white font-medium truncate">{lease.propertyName}</div>
                  <div className="text-xs text-white/50">{new Date(lease.uploadDate).toLocaleDateString()} • {lease.leaseTermMonths} months</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-accent font-semibold tabular-nums">${lease.monthlyRent.toLocaleString()}/mo</div>
                  <div className="text-xs text-white/40">{lease.riskyClauses.length} risks</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/[.07] border border-white/[.1] rounded-lg p-4">
          <h3 className="text-white font-medium text-sm mb-4">Risk Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'Auto-renewal clauses', count: autoRenewalCount },
              { label: 'Non-refundable fees', count: leases.filter(l => l.adminFee > 0).length },
              { label: 'High termination notice', count: leases.filter(l => l.terminationNoticeDays > 30).length },
              { label: 'Pet restrictions', count: leases.filter(l => l.petDeposit > 0).length }
            ].map((item, idx) => {
              const percentage = totalLeases > 0 ? (item.count / totalLeases) * 100 : 0
              return (
                <div key={idx}>
                  <div className="flex justify-between text-xs text-white/70 mb-1.5">
                    <span>{item.label}</span>
                    <span className="tabular-nums">{item.count} leases</span>
                  </div>
                  <div className="h-1.5 bg-white/[.1] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/[.1]">
            <div className="text-xs text-white/50 mb-2">Average First Year Cost</div>
            <div className="text-2xl font-semibold text-white tabular-nums">${Math.round(avgFirstYear).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}