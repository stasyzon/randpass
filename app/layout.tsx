import './globals.css'
import type {Metadata} from 'next'
import {Analytics} from '@vercel/analytics/react';
import {ThemeProvider} from "@/components/theme-provider"

export const metadata: Metadata = {
  title: 'Password Generator - RandPass',
  description: 'Strong passwords made simple. Customize your security level and generate passwords you can trust',
  themeColor: '#171717',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon-light.png',
        href: '/icon-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icon.png',
        href: '/icon-dark.png',
      },
    ],
  },
  keywords: [
    "Password Generator",
    "Secure Password",
    "Customizable Password",
    "Free Password Generator",
    "Strong Password",
    "Password Length",
    "Special Symbols",
    "Lowercase",
    "Uppercase",
    "Numbers",
    "One-Click Copy",
    "Regenerate Password"
  ],
  creator: 'Stanislav',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9980612679743872"
            crossOrigin="anonymous"></script>
    <Analytics/>

    <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
    </body>
    </html>
  )
}
