import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Paul Global | Animal Nutrition & Feed Solutions',
  description: 'Global animal nutrition and feed solutions for poultry, dairy, cattle and aquaculture markets.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}