import { NextRequest, NextResponse } from 'next/server'
import pdf from 'pdf-parse'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 })
    }
    
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const data = await pdf(buffer)
    
    return NextResponse.json({ 
      text: data.text, 
      pages: data.numpages,
      info: data.info 
    })
  } catch (error: any) {
    console.error('PDF parsing error:', error)
    return NextResponse.json({ error: 'Failed to parse PDF: ' + error.message }, { status: 500 })
  }
}