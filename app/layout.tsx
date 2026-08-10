import type { Metadata } from 'next'
import { Cinzel, Geist } from 'next/font/google'

import { Container } from '@/components/layout/container/container'
import { Footer } from '@/components/layout/footer/footer'
import { Header } from '@/components/layout/header/header'
import { SettingsDrawerProvider } from '@/components/layout/header/settings-drawer-context'
import { ThemeProvider } from '@/components/theme/theme-provider'

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
    <html
      lang="en"
      className={`${geistSans.variable} ${cinzel.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsDrawerProvider>
            <Header />
            <Container className="flex-1 py-8">{children}</Container>
            <Footer />
          </SettingsDrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
