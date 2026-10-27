import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from './components/SiteChrome';
import SiteMenu from './components/SiteMenu';
import { SITE_URL } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: 'AHWAN LAB', type: 'website', locale: 'en_IN' },
  title: 'AHWAN LAB | Industrial Enzyme Solutions',
  description: 'Industrial enzymes, microbial cultures and tailored formulations for food, starch, textile, paper, detergents and other industrial applications.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto+Condensed:ital,wght@0,400;0,700;1,700&display=swap" rel="stylesheet"/></head><body id="top"><SiteMenu>{children}<SiteChrome /></SiteMenu></body></html>;
}
