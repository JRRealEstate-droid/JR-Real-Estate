import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'JR Real Estate Varanasi | Property & Construction Solutions',
    template: '%s | JR Real Estate Varanasi',
  },
  description:
    'Varanasi premier real estate consultancy and construction firm led by Director Mr. Umesh Yadav. Residential plots, luxury apartments, independent villas, commercial spaces, and turnkey building at Pandeypur Chauraha, Varanasi.',
  keywords: [
    'Real Estate Varanasi',
    'Plots in Varanasi',
    'Flats in Varanasi',
    'Pandeypur Chauraha property',
    'House Construction Varanasi',
    'VDA approved plots',
    'JR Real Estate Umesh Yadav',
    'Commercial shop Varanasi',
  ],
  authors: [{ name: 'JR Real Estate Varanasi' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://jrrealestate.in'),
  openGraph: {
    title: 'JR Real Estate Varanasi | Your Dream Home, Our Responsibility',
    description:
      'Verified property sales, rental leasing, and turnkey architectural construction in Varanasi. Office at S9/90A, Pandeypur Chauraha.',
    url: 'https://jrrealestate.in',
    siteName: 'JR Real Estate Varanasi',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/images/jr-logo.jpg',
    apple: '/images/jr-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-charcoal text-ivory">
        {children}
      </body>
    </html>
  );
}
