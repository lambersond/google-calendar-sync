import { Inter } from 'next/font/google'
import { NavigationBar } from '@/components/common/navigation-bar'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calendar Sync',
  description: 'Sync events between two Google calendars',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavigationBar />
        <main className='flex min-h-screen max-w-screen-xl mx-auto min-w-screen flex-col items-center py-24 gap-8'>
          {children}
        </main>
      </body>
    </html>
  )
}
