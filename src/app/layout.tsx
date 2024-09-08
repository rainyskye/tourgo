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
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-blue-600 text-white py-4 text-center">
          © 2024 My Map App
        </footer>
      </body>
    </html>
  )
}