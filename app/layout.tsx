import './globals.css';
import type { ReactNode } from 'react';

export const metadata = { title: 'Real Deriv Bot', description: 'Deriv Bot-style visual trading workspace' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
