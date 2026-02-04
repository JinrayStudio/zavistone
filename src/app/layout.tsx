import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zavistone | Decoding Reality, Hardening Value',
  description: 'Zavistone transforms insights into digital assets. A digital asset management platform with 15 years of market foresight. Intelligence, Portfolio, and Exclusive Tools.',
  keywords: ['digital assets', 'investment', 'AI', 'fintech', 'market analysis', 'Searfit', 'VASO'],
  openGraph: {
    title: 'Zavistone | Decoding Reality, Hardening Value',
    description: 'Zavistone transforms insights into digital assets.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="notranslate">{children}</body>
    </html>
  );
}
