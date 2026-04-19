import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LocaleEffect from '@/components/LocaleEffect'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Shaoke — Portfolio',
  description:
    'Business Analytics Student with global experience across China, London, and the U.S.',
  keywords: ['portfolio', 'business analytics', 'data', 'Shaoke'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-[#1D1D1F]">
        <LanguageProvider>
          <LocaleEffect />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
