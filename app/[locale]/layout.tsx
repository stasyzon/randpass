import '../globals.css'
import type {Metadata} from 'next'
import {Analytics} from '@vercel/analytics/react';
import {ThemeProvider} from "@/components/theme-provider"
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { LayoutProps, Locale } from "@/types/common";

export const viewport = {
  themeColor: '#171717',
}

export const metadata: Metadata = {
  title: 'Password Generator - RandPass',
  description: 'Strong passwords made simple. Customize your security level and generate passwords you can trust',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon-light.svg',
        href: '/icon-light.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icon-dark.svg',
        href: '/icon-dark.svg',
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

export default async function RootLayout({
  children,
  params
}: LayoutProps) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
    <Analytics/>
    <SpeedInsights/>

    <body>
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  )
}
