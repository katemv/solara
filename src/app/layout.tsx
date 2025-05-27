import type { Metadata } from 'next'
import { Play, Zen_Dots } from 'next/font/google'
import { Header } from '@/components/Organisms/Header/Header'
import './globals.css'

const play = Play({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-play',
  display: 'swap'
})

const zenDots = Zen_Dots({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-zen-dots',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Product List',
  description: 'A simple product listing application'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={'en'} className={`${play.variable} ${zenDots.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
} 