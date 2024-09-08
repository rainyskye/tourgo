import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'My Map App',
  description: 'A map app built with NextJS and Google Maps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-white shadow-md p-4 z-10 relative">
          <h1 className="text-xl font-bold text-center">TourGo</h1>
        </header>
        <main className="flex-grow relative">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  )
}