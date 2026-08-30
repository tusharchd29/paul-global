import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from './components/SiteChrome';

export const metadata: Metadata = {
  title: 'Paul Global | Animal Nutrition & Feed Solutions',
  description: 'Global animal nutrition and feed solutions for poultry, dairy, cattle and aquaculture markets.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top">{children}<SiteChrome /></body></html>;
}
