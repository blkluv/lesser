'use client'

import { Moon, Sun, Download, User, Mail, Shield } from 'lucide-react'

export function Settings({ 
  userName, 
  setUserName, 
  darkMode, 
  setDarkMode, 
  onExport 
}: { 
  userName: string, 
  setUserName: (name: string) => void,
  darkMode: boolean,
  setDarkMode: (dark: boolean) => void,
  onExport: () => void
}) {
  return (
    <div className="p-6 max-w-[600px] mx-auto">
      <div className="mb-8">
        <h2 className="text-white font-semibold text-lg tracking-tight mb-1">Settings</h2>
        <p className="text-white/50 text-sm">Manage your preferences and account</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white/[.07] border border-white/[.1] rounded-lg p-4">
          <h3 className="text-white font-medium text-sm mb-4 flex items-center gap-2">
            <User size={16} className="text-accent" />
            Profile Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/60 block mb-1.5 font-medium">Display Name</label>
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-white/[.05] border border-white/[.1] rounded-md px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none transition-colors"
                placeholder="Enter your name"
              />
              <p className="text-xs text-white/40 mt-1.5">This will be displayed in the sidebar</p>
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1.5 font-medium">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/[.03] border border-white/[.1] rounded-md text-sm text-white/50">
                <Mail size={14} className="text-white/30" />
                <span>alex.johnson@example.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/[.07] border border-white/[.1] rounded-lg p-4">
          <h3 className="text-white font-medium text-sm mb-4 flex items-center gap-2">
            {darkMode ? <Moon size={16} className="text-accent" /> : <Sun size={16} className="text-accent" />}
            Appearance
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white font-medium">Dark Mode</div>
              <div className="text-xs text-white/50">Toggle between light and dark themes</div>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-accent' : 'bg-white/20'}`}
              aria-label="Toggle dark mode"
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-150 ${darkMode ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </div>
        
        <div className="bg-white/[.07] border border-white/[.1] rounded-lg p-4">
          <h3 className="text-white font-medium text-sm mb-4 flex items-center gap-2">
            <Shield size={16} className="text-accent" />
            Data & Privacy
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm text-white">Export Data</div>
                <div className="text-xs text-white/50">Copy all lease data to clipboard as JSON</div>
              </div>
              <button 
                onClick={onExport}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/[.05] hover:bg-white/[.1] border border-white/[.1] rounded-md text-sm text-white transition-colors"
              >
                <Download size={14} />
                Export
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-white/[.05]">
              <div>
                <div className="text-sm text-white">Local Storage</div>
                <div className="text-xs text-white/50">Data is stored locally in your browser</div>
              </div>
              <div className="text-xs text-emerald-400 font-medium px-2 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                Active
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/[.03] border border-white/[.05] rounded-lg p-4">
          <div className="text-xs text-white/40 text-center">
            LeaseLens v1.0 • AI-Powered Lease Analysis
          </div>
        </div>
      </div>
    </div>
  )
}