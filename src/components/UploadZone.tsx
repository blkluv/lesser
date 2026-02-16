'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Loader2 } from 'lucide-react'

export function UploadZone({ onUpload, isLoading }: { onUpload: (file: File) => void, isLoading: boolean }) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === 'application/pdf') {
        onUpload(file)
      }
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-150 ${
        dragActive ? 'border-accent bg-accent/10' : 'border-white/20 hover:border-white/40 bg-white/[.03]'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input 
        ref={inputRef}
        type="file" 
        accept=".pdf" 
        onChange={handleChange}
        className="hidden"
      />
      
      {isLoading ? (
        <div className="flex flex-col items-center gap-3 py-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <div className="text-sm text-white/70">
            <div className="font-medium">Analyzing lease with AI...</div>
            <div className="text-xs text-white/50 mt-1">Extracting terms and calculating costs</div>
          </div>
        </div>
      ) : (
        <div 
          className="flex flex-col items-center gap-3 cursor-pointer py-4"
          onClick={() => inputRef.current?.click()}
        >
          <div className="w-12 h-12 rounded-full bg-white/[.07] flex items-center justify-center border border-white/[.1]">
            <Upload className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-white font-medium mb-1">Drop your lease PDF here</p>
            <p className="text-xs text-white/50">or click to browse • Supports scanned and digital PDFs up to 10MB</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/[.05] text-white/40 border border-white/[.1]">PDF</span>
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/[.05] text-white/40 border border-white/[.1]">AI Analysis</span>
          </div>
        </div>
      )}
    </div>
  )
}