import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from './components/SiteChrome';
import { SITE_URL } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: 'AHWAN LAB', type: 'website', locale: 'en_IN' },
  title: 'AHWAN LAB | Animal Health, Wellness and Nutrition',
  description: 'Customized enzyme, probiotic and yeast solutions for animal health, food and industry — Calshell, Progrow, Livoshield, Phytomin Pro, Digesmo-Pro and XP-Zyme.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto+Condensed:ital,wght@0,400;0,700;1,700&display=swap" rel="stylesheet"/></head><body id="top">{children}<SiteChrome /></body></html>;
}
