import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'ProductivityHub - Time Management & Productivity Tools',
    template: '%s | ProductivityHub',
  },
  description: 'Learn about time management, productivity tools, and motivation to boost your efficiency.',
  keywords: ['productivity', 'time management', 'motivation', 'productivity tools'],
  authors: [{ name: 'ProductivityHub Team' }],
  creator: 'ProductivityHub',
  publisher: 'ProductivityHub',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'ProductivityHub',
    images: [
      {
        url: '/default-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ProductivityHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProductivityHub - Time Management & Productivity Tools',
    description: 'Learn about time management, productivity tools, and motivation to boost your efficiency.',
    images: ['/default-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}