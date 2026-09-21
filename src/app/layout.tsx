import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { PreferencesScript } from '@/components/preferences-script';
import { LocaleProvider } from '@/i18n/context';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Han | Startup & SME Consultant — AI Enablement, Pitching & Sales',
  description:
    'AI didn’t remove the work. It moved it. Strategic advisory, founder coaching, AI enablement training, investor pitch decks, and reverse funnel sales math.',
  keywords: [
    'Startup Consultant',
    'SME Advisor',
    'AI Enablement',
    'Eval-Driven Development',
    'Pitch Decks',
    'Reverse Funnel Math',
    'Germany',
  ],
  authors: [{ name: 'Han' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PreferencesScript />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-accent/25">
        <LocaleProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
