import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LeaseLens - AI Lease Analyzer',
  description: 'AI-powered rental lease analyzer that extracts critical terms, calculates total move-in costs, and identifies risky clauses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}