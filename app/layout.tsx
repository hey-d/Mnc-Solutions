import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MNC Solutions | Web Apps, AI, ML & Automation',
  description:
    'MNC Solutions builds high-impact web apps, machine learning systems, GenAI products, and AI agents for ambitious brands.',
  keywords: ['web development', 'machine learning', 'gen ai', 'ai agents', 'blockchain', 'software development'],
  openGraph: {
    title: 'MNC Solutions | Web Apps, AI, ML & Automation',
    description:
      'We design and build modern digital products that blend strategy, engineering, and AI to unlock growth.',
    type: 'website',
    url: 'https://mnc-solutions.com',
    siteName: 'MNC Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MNC Solutions | Web Apps, AI, ML & Automation',
    description:
      'We design and build modern digital products that blend strategy, engineering, and AI to unlock growth.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
