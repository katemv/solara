import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Bebas_Neue } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap'
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
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
    <html lang={'en'} className={`${plusJakarta.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  )
} 