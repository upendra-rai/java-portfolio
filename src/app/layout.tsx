import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SiteNav } from '@/components/navigation/SiteNav'
import { StoryHud } from '@/components/navigation/StoryHud'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { SITE } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://upendrarai.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Upendra Rai — Java Software Engineer',
    template: '%s — Upendra Rai',
  },
  description: SITE.description,
  keywords: [
    'Java',
    'Spring Boot',
    'Backend Engineer',
    'Distributed Systems',
    'Payment Infrastructure',
    'REST APIs',
    'System Design',
  ],
  authors: [{ name: SITE.name, url: siteUrl }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: SITE.name,
    title: 'Upendra Rai — Java Software Engineer',
    description: SITE.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upendra Rai — Java Software Engineer',
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#050608',
  width: 'device-width',
  initialScale: 1,
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: 'Java Software Engineer',
  url: siteUrl,
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.github, SITE.linkedin],
  knowsAbout: [
    'Java',
    'Spring Boot',
    'Distributed Systems',
    'REST API Design',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Payment Infrastructure',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-bg font-sans text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:bg-panel focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <CustomCursor />
        <SiteNav />
        <StoryHud />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
