import { Inter } from 'next/font/google'
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
        <main className='flex min-h-screen min-w-screen flex-col items-center py-24 gap-8'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold text-center text-gray-200'>Google Calendar Sync</h1>
            <p className='text-xl text-center text-gray-300'>
              Sync events between two Google calendars
            </p>
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
