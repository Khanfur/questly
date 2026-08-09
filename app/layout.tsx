import type { Metadata } from 'next'
import { Cinzel, Geist } from 'next/font/google'

import { Container } from '@/components/layout/container'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Questly',
  description: 'An old school Runescape Companion',
}

export default function RootLayout({ children }: { children: import('react').ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${cinzel.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <Container className="flex-1 py-8">{children}</Container>
        <Footer />
      </body>
    </html>
  )
}
