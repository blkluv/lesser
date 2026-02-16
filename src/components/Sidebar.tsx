'use client'

import { FileText, LayoutDashboard, Settings, Menu, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const [collapsed, setCollapsed] = useState(false)
  
  const navItems = [
    { id: 'home', label: 'Leases', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]
  
  return (
    <aside className={`${collapsed ? 'w-12' : 'w-56'} bg-[#0f172a]/80 backdrop-blur-xl border-r border-white/[.1] flex flex-col transition-all duration-150 flex-shrink-0`}>
      <div className="h-12 flex items-center justify-between px-3 border-b border-white/[.1]">
        {!collapsed && <span className="text-white font-semibold text-sm tracking-tight">LeaseLens</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1.5 hover:bg-white/[.1] rounded-md text-white/70 transition-colors"
        >
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-accent/10 text-accent' 
                : 'text-white/70 hover:bg-white/[.05] hover:text-white'
            }`}
          >
            <item.icon size={16} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/[.1]">
        <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-semibold">
            AL
          </div>
          {!collapsed && <span className="text-xs text-white/70">Alex Johnson</span>}
        </div>
      </div>
    </aside>
  )
}