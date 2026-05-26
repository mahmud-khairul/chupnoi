import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Noto_Serif_Bengali } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
})

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  variable: '--font-noto-bengali',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Safeguard BD - Name the Culprit',
  description: 'A transparent public record of child abuse and sexual violence perpetrators in Bangladesh.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} ${notoSerifBengali.variable} font-sans bg-brand-black text-brand-cream`}>
        {children}
      </body>
    </html>
  )
}
