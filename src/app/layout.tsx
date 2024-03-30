import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Provider from '@/providers/Provider'
import NavIndex from '@/components/nav/Index'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Onyx',
  description: 'Pseudonymous Social Forum',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <NavIndex />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
