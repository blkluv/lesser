'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

export function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])
  
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${
        type === 'success' 
          ? 'bg-[#0f172a] border-green-500/30 text-green-400 shadow-black/20' 
          : 'bg-[#0f172a] border-red-500/30 text-red-400 shadow-black/20'
      }`}>
        {type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
        <span className="text-sm text-white font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="ml-2 text-white/50 hover:text-white transition-colors"
          aria-label="Close toast"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}