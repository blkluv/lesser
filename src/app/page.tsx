'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { LeaseCard } from '@/components/LeaseCard'
import { UploadZone } from '@/components/UploadZone'
import { Toast } from '@/components/Toast'
import { Dashboard } from '@/components/Dashboard'
import { Settings } from '@/components/Settings'
import { askAI } from '@/lib/ai'
import { Search, Plus } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [leases, setLeases] = useState([
    {
      id: '1',
      propertyName: 'The Metropolitan at Midtown',
      address: '1425 Westheimer Rd, Houston, TX 77006',
      landlordName: 'Greystar Property Management',
      monthlyRent: 2450,
      securityDeposit: 2450,
      petDeposit: 500,
      applicationFee: 75,
      adminFee: 200,
      parkingFee: 150,
      utilities: 'Tenant pays electricity and internet',
      leaseTermMonths: 12,
      startDate: '2024-06-01',
      autoRenewal: true,
      terminationNoticeDays: 60,
      riskyClauses: ['Auto-renewal requires 60-day written notice to terminate', 'Non-refundable $200 admin fee', 'Carpet cleaning fee deducted from deposit regardless of condition'],
      status: 'analyzed',
      uploadDate: '2024-03-15T10:30:00Z',
      totalFirstYearCost: 31975
    },
    {
      id: '2',
      propertyName: 'Parkside Gardens',
      address: '8920 Memorial Dr, Houston, TX 77024',
      landlordName: 'AvalonBay Communities',
      monthlyRent: 1895,
      securityDeposit: 1895,
      petDeposit: 300,
      applicationFee: 50,
      adminFee: 150,
      parkingFee: 100,
      utilities: 'Water and trash included',
      leaseTermMonths: 13,
      startDate: '2024-07-01',
      autoRenewal: false,
      terminationNoticeDays: 30,
      riskyClauses: ['13-month lease term (unusual)', 'Mandatory renter insurance $15/month'],
      status: 'analyzed',
      uploadDate: '2024-03-14T14:22:00Z',
      totalFirstYearCost: 25990
    },
    {
      id: '3',
      propertyName: 'Riverfront Lofts',
      address: '1500 Allen Pkwy, Houston, TX 77019',
      landlordName: 'Camden Property Trust',
      monthlyRent: 3200,
      securityDeposit: 3200,
      petDeposit: 600,
      applicationFee: 100,
      adminFee: 250,
      parkingFee: 200,
      utilities: 'All utilities included except electricity',
      leaseTermMonths: 15,
      startDate: '2024-08-15',
      autoRenewal: true,
      terminationNoticeDays: 90,
      riskyClauses: ['90-day termination notice required', '15-month minimum lease', 'No early termination option', 'Pet rent $50/month non-refundable'],
      status: 'analyzed',
      uploadDate: '2024-03-13T09:15:00Z',
      totalFirstYearCost: 44250
    },
    {
      id: '4',
      propertyName: 'The Heights at 2121',
      address: '2121 Yale St, Houston, TX 77008',
      landlordName: 'Lincoln Property Company',
      monthlyRent: 1650,
      securityDeposit: 1650,
      petDeposit: 0,
      applicationFee: 45,
      adminFee: 0,
      parkingFee: 75,
      utilities: 'Tenant pays all utilities',
      leaseTermMonths: 12,
      startDate: '2024-05-01',
      autoRenewal: false,
      terminationNoticeDays: 30,
      riskyClauses: ['Strict noise policy fines $200 per violation'],
      status: 'analyzed',
      uploadDate: '2024-03-12T16:45:00Z',
      totalFirstYearCost: 21920
    },
    {
      id: '5',
      propertyName: 'Midtown Arbor Place',
      address: '650 W Alabama St, Houston, TX 77006',
      landlordName: 'Morgan Properties',
      monthlyRent: 2100,
      securityDeposit: 2100,
      petDeposit: 400,
      applicationFee: 60,
      adminFee: 175,
      parkingFee: 125,
      utilities: 'Valet trash included',
      leaseTermMonths: 12,
      startDate: '2024-06-15',
      autoRenewal: true,
      terminationNoticeDays: 60,
      riskyClauses: ['Auto-renewal with 5% rent increase', 'Non-refundable pet deposit', 'Mandatory quarterly pest control $35'],
      status: 'analyzed',
      uploadDate: '2024-03-11T11:20:00Z',
      totalFirstYearCost: 28460
    },
    {
      id: '6',
      propertyName: 'The Sovereign at Regent',
      address: '3233 West Dallas St, Houston, TX 77019',
      landlordName: 'Equity Residential',
      monthlyRent: 2850,
      securityDeposit: 2850,
      petDeposit: 500,
      applicationFee: 85,
      adminFee: 225,
      parkingFee: 175,
      utilities: 'Gas and water included',
      leaseTermMonths: 12,
      startDate: '2024-07-01',
      autoRenewal: true,
      terminationNoticeDays: 60,
      riskyClauses: ['Concierge fee $35/month mandatory', 'Package receiving fee $5 per package after 3 days'],
      status: 'analyzed',
      uploadDate: '2024-03-10T13:10:00Z',
      totalFirstYearCost: 38150
    },
    {
      id: '7',
      propertyName: 'Gables River Oaks',
      address: '3939 W Alabama St, Houston, TX 77027',
      landlordName: 'Gables Residential',
      monthlyRent: 3400,
      securityDeposit: 3400,
      petDeposit: 700,
      applicationFee: 125,
      adminFee: 300,
      parkingFee: 0,
      utilities: 'All utilities included',
      leaseTermMonths: 12,
      startDate: '2024-08-01',
      autoRenewal: false,
      terminationNoticeDays: 30,
      riskyClauses: ['Move-out cleaning fee $350 mandatory', 'Carpet replacement fee $800 if pets present'],
      status: 'analyzed',
      uploadDate: '2024-03-09T15:30:00Z',
      totalFirstYearCost: 44925
    },
    {
      id: '8',
      propertyName: 'The Carter',
      address: '1111 Austin St, Houston, TX 77010',
      landlordName: 'Wood Residential',
      monthlyRent: 1950,
      securityDeposit: 1950,
      petDeposit: 350,
      applicationFee: 55,
      adminFee: 125,
      parkingFee: 150,
      utilities: 'Internet included in rent',
      leaseTermMonths: 14,
      startDate: '2024-09-01',
      autoRenewal: true,
      terminationNoticeDays: 60,
      riskyClauses: ['14-month lease with no prorated early move-out', 'Smart home device fee $25/month', 'Trash valet $35/month'],
      status: 'analyzed',
      uploadDate: '2024-03-08T10:00:00Z',
      totalFirstYearCost: 30580
    },
    {
      id: '9',
      propertyName: 'Alexan Lofts at the Ballpark',
      address: '1515 Texas Ave, Houston, TX 77003',
      landlordName: 'Trammell Crow Residential',
      monthlyRent: 1750,
      securityDeposit: 1750,
      petDeposit: 250,
      applicationFee: 50,
      adminFee: 100,
      parkingFee: 100,
      utilities: 'Electricity only included',
      leaseTermMonths: 12,
      startDate: '2024-05-15',
      autoRenewal: true,
      terminationNoticeDays: 45,
      riskyClauses: ['45-day notice required (unusual)', 'Stadium event parking restrictions', 'Noise curfew 10pm weekdays'],
      status: 'analyzed',
      uploadDate: '2024-03-07T14:15:00Z',
      totalFirstYearCost: 23900
    },
    {
      id: '10',
      propertyName: 'The Preserve at Woodway',
      address: '10101 Woodway Dr, Houston, TX 77057',
      landlordName: 'MAAC',
      monthlyRent: 2200,
      securityDeposit: 2200,
      petDeposit: 450,
      applicationFee: 70,
      adminFee: 200,
      parkingFee: 0,
      utilities: 'Water and trash included',
      leaseTermMonths: 12,
      startDate: '2024-06-01',
      autoRenewal: false,
      terminationNoticeDays: 30,
      riskyClauses: ['Window tinting fee $150 if removed', 'Blind replacement $75 per blind if damaged'],
      status: 'analyzed',
      uploadDate: '2024-03-06T09:45:00Z',
      totalFirstYearCost: 29120
    },
    {
      id: '11',
      propertyName: 'Hanover Post Oak',
      address: '1990 Post Oak Blvd, Houston, TX 77056',
      landlordName: 'Hanover Company',
      monthlyRent: 4500,
      securityDeposit: 4500,
      petDeposit: 1000,
      applicationFee: 150,
      adminFee: 500,
      parkingFee: 300,
      utilities: 'All utilities included',
      leaseTermMonths: 12,
      startDate: '2024-07-15',
      autoRenewal: true,
      terminationNoticeDays: 90,
      riskyClauses: ['90-day notice required', 'Luxury tax fee $100/month', 'Concierge package fee $50/month', 'Non-refundable amenity fee $400'],
      status: 'analyzed',
      uploadDate: '2024-03-05T16:00:00Z',
      totalFirstYearCost: 62500
    },
    {
      id: '12',
      propertyName: 'The Village at Bellaire',
      address: '5353 Bissonnet St, Bellaire, TX 77401',
      landlordName: 'The Village Management',
      monthlyRent: 1450,
      securityDeposit: 1450,
      petDeposit: 200,
      applicationFee: 40,
      adminFee: 0,
      parkingFee: 50,
      utilities: 'Tenant pays all',
      leaseTermMonths: 12,
      startDate: '2024-04-01',
      autoRenewal: true,
      terminationNoticeDays: 30,
      riskyClauses: ['Month-to-month after 12 months at 150% rent', 'No painting walls without $500 deposit'],
      status: 'analyzed',
      uploadDate: '2024-03-04T11:30:00Z',
      totalFirstYearCost: 19390
    }
  ])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [userName, setUserName] = useState('Alex Johnson')
  const [darkMode, setDarkMode] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  
  const [newLease, setNewLease] = useState({
    propertyName: '',
    monthlyRent: '',
    securityDeposit: '',
    address: ''
  })

  useEffect(() => {
    const savedLeases = localStorage.getItem('leases')
    const savedUser = localStorage.getItem('userName')
    if (savedLeases) {
      try {
        setLeases(JSON.parse(savedLeases))
      } catch (e) {
        console.error('Failed to parse saved leases')
      }
    }
    if (savedUser) setUserName(savedUser)
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('leases', JSON.stringify(leases))
  }, [leases])
  
  useEffect(() => {
    localStorage.setItem('userName', userName)
  }, [userName])

  const filteredLeases = leases
    .filter(l => l.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 l.address.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      if (sortBy === 'rent') return b.monthlyRent - a.monthlyRent
      if (sortBy === 'risk') return b.riskyClauses.length - a.riskyClauses.length
      return 0
    })

  const handleDelete = (id: string) => {
    setLeases(prev => prev.filter(l => l.id !== id))
    setToast({ message: 'Lease removed successfully', type: 'success' })
  }

  const handleExport = () => {
    const data = JSON.stringify(leases, null, 2)
    navigator.clipboard.writeText(data)
    setToast({ message: 'Lease data copied to clipboard', type: 'success' })
  }
  
  const handleSortChange = (value: string) => {
    setSortBy(value)
    setToast({ message: `Sorted by ${value}`, type: 'success' })
  }
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    if (!newLease.propertyName.trim()) errors.propertyName = 'Property name is required'
    if (!newLease.monthlyRent || isNaN(Number(newLease.monthlyRent))) errors.monthlyRent = 'Valid monthly rent is required'
    if (!newLease.securityDeposit || isNaN(Number(newLease.securityDeposit))) errors.securityDeposit = 'Valid security deposit is required'
    if (!newLease.address.trim()) errors.address = 'Address is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      setToast({ message: 'Please fix form errors', type: 'error' })
      return
    }
    
    const lease = {
      id: Date.now().toString(),
      propertyName: newLease.propertyName,
      address: newLease.address,
      landlordName: 'Manual Entry',
      monthlyRent: Number(newLease.monthlyRent),
      securityDeposit: Number(newLease.securityDeposit),
      petDeposit: 0,
      applicationFee: 0,
      adminFee: 0,
      parkingFee: 0,
      utilities: '',
      leaseTermMonths: 12,
      startDate: new Date().toISOString().split('T')[0],
      autoRenewal: false,
      terminationNoticeDays: 30,
      riskyClauses: [],
      status: 'analyzed',
      uploadDate: new Date().toISOString(),
      totalFirstYearCost: Number(newLease.monthlyRent) * 12 + Number(newLease.securityDeposit)
    }
    
    setLeases(prev => [lease, ...prev])
    setNewLease({ propertyName: '', monthlyRent: '', securityDeposit: '', address: '' })
    setShowAddForm(false)
    setToast({ message: 'Lease added manually', type: 'success' })
  }

  const handleFileUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setToast({ message: 'File too large (max 10MB)', type: 'error' })
      return
    }
    
    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!res.ok) throw new Error('Failed to process PDF')
      const { text } = await res.json()
      
      if (!text || text.length < 100) throw new Error('Could not extract text from PDF')
      
      const analysis = await askAI(
        `Analyze this lease agreement and extract the following information in JSON format:
        {
          "propertyName": "string",
          "address": "string", 
          "landlordName": "string",
          "monthlyRent": number,
          "securityDeposit": number,
          "petDeposit": number,
          "applicationFee": number,
          "adminFee": number,
          "parkingFee": number,
          "leaseTermMonths": number,
          "startDate": "YYYY-MM-DD",
          "autoRenewal": boolean,
          "terminationNoticeDays": number,
          "riskyClauses": ["string", "string"],
          "utilities": "string"
        }
        
        Lease text: ${text.substring(0, 8000)}`,
        'You are a legal document analyzer specializing in rental agreements. Extract accurate financial and legal terms. Return only valid JSON.'
      )
      
      let data
      try {
        const jsonMatch = analysis.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          data = JSON.parse(jsonMatch[0])
        } else {
          data = JSON.parse(analysis)
        }
      } catch (e) {
        throw new Error('Failed to parse AI response')
      }
      
      const totalFirstYear = (data.monthlyRent * (data.leaseTermMonths || 12)) + 
                             (data.securityDeposit || 0) + 
                             (data.petDeposit || 0) + 
                             (data.applicationFee || 0) + 
                             (data.adminFee || 0) + 
                             ((data.parkingFee || 0) * 12)
      
      const newLeaseData = {
        id: Date.now().toString(),
        ...data,
        uploadDate: new Date().toISOString(),
        status: 'analyzed',
        totalFirstYearCost: totalFirstYear
      }
      
      setLeases(prev => [newLeaseData, ...prev])
      setToast({ message: 'Lease analyzed successfully', type: 'success' })
    } catch (err: any) {
      setToast({ message: err.message || 'Analysis failed', type: 'error' })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#0f172a] mesh-bg">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {activeTab === 'home' && (
          <div className="min-h-full">
            <div className="sticky top-0 z-10 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/[.1] h-12 flex items-center px-6 justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-white font-semibold text-sm tracking-tight">LeaseLens</h1>
                <span className="text-white/30 text-xs hidden sm:inline">AI-Powered Lease Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/[.05] border border-white/[.1] rounded-md pl-8 pr-3 py-1.5 text-sm text-white placeholder:text-white/40 w-48 sm:w-64 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-white/[.05] border border-white/[.1] rounded-md px-2 py-1.5 text-sm text-white focus:border-accent focus:outline-none cursor-pointer"
                >
                  <option value="date">Newest</option>
                  <option value="rent">Rent (High-Low)</option>
                  <option value="risk">Risk Level</option>
                </select>
                <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-accent hover:bg-accent/90 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 max-w-[1200px] mx-auto">
              {showAddForm && (
                <form onSubmit={handleSubmit} className="mb-6 bg-white/[.07] border border-white/[.1] rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <h3 className="text-white font-medium text-sm mb-3">Add Lease Manually</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                    <div>
                      <label className="text-xs text-white/60 block mb-1">Property Name</label>
                      <input 
                        type="text"
                        value={newLease.propertyName}
                        onChange={(e) => setNewLease({...newLease, propertyName: e.target.value})}
                        className={`w-full bg-white/[.05] border ${formErrors.propertyName ? 'border-red-400' : 'border-white/[.1]'} rounded-md px-3 py-2 text-sm text-white focus:border-accent focus:outline-none`}
                        placeholder="e.g., The Grand Apartments"
                      />
                      {formErrors.propertyName && <span className="text-xs text-red-400 mt-1">{formErrors.propertyName}</span>}
                    </div>
                    <div>
                      <label className="text-xs text-white/60 block mb-1">Monthly Rent ($)</label>
                      <input 
                        type="number"
                        value={newLease.monthlyRent}
                        onChange={(e) => setNewLease({...newLease, monthlyRent: e.target.value})}
                        className={`w-full bg-white/[.05] border ${formErrors.monthlyRent ? 'border-red-400' : 'border-white/[.1]'} rounded-md px-3 py-2 text-sm text-white focus:border-accent focus:outline-none`}
                        placeholder="e.g., 2000"
                      />
                      {formErrors.monthlyRent && <span className="text-xs text-red-400 mt-1">{formErrors.monthlyRent}</span>}
                    </div>
                    <div>
                      <label className="text-xs text-white/60 block mb-1">Security Deposit ($)</label>
                      <input 
                        type="number"
                        value={newLease.securityDeposit}
                        onChange={(e) => setNewLease({...newLease, securityDeposit: e.target.value})}
                        className={`w-full bg-white/[.05] border ${formErrors.securityDeposit ? 'border-red-400' : 'border-white/[.1]'} rounded-md px-3 py-2 text-sm text-white focus:border-accent focus:outline-none`}
                        placeholder="e.g., 2000"
                      />
                      {formErrors.securityDeposit && <span className="text-xs text-red-400 mt-1">{formErrors.securityDeposit}</span>}
                    </div>
                    <div>
                      <label className="text-xs text-white/60 block mb-1">Address</label>
                      <input 
                        type="text"
                        value={newLease.address}
                        onChange={(e) => setNewLease({...newLease, address: e.target.value})}
                        className={`w-full bg-white/[.05] border ${formErrors.address ? 'border-red-400' : 'border-white/[.1]'} rounded-md px-3 py-2 text-sm text-white focus:border-accent focus:outline-none`}
                        placeholder="e.g., 123 Main St"
                      />
                      {formErrors.address && <span className="text-xs text-red-400 mt-1">{formErrors.address}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      className="bg-accent hover:bg-accent/90 text-white text-xs font-medium px-4 py-2 rounded-md transition-colors"
                    >
                      Save Lease
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="bg-white/[.05] hover:bg-white/[.1] text-white text-xs font-medium px-4 py-2 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              
              <div className="mb-6">
                <UploadZone onUpload={handleFileUpload} isLoading={isAnalyzing} />
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-64 bg-white/[.05] rounded-lg animate-pulse border border-white/[.05]" />
                  ))}
                </div>
              ) : filteredLeases.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/[.05] flex items-center justify-center mb-4">
                    <Search className="text-white/30" size={24} />
                  </div>
                  <h3 className="text-white font-medium mb-1">No leases found</h3>
                  <p className="text-white/50 text-sm mb-4">Upload your first lease document to get started</p>
                  <button 
                    onClick={() => setShowAddForm(true)}
                    className="bg-white/[.05] hover:bg-white/[.1] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    Add your first lease
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLeases.map((lease) => (
                    <LeaseCard 
                      key={lease.id} 
                      lease={lease} 
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'dashboard' && <Dashboard leases={leases} />}
        
        {activeTab === 'settings' && (
          <Settings 
            userName={userName}
            setUserName={setUserName}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onExport={handleExport}
          />
        )}
      </main>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}