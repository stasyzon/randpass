import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Password Generator - RandPass',
  description: 'Strong passwords made simple. Customize your security level and generate passwords you can trust',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9980612679743872"
            crossOrigin="anonymous"></script>
      <Analytics/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
