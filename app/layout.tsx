import type { Metadata } from "next";
import { Open_Sans, PT_Serif } from "next/font/google";
import "./globals.css";
import DevelopmentDisclaimer from "@/components/DevelopmentDisclaimer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oct.edmonton.ca'),
  title: {
    default: 'Open City & Technology | City of Edmonton',
    template: '%s | Open City & Technology',
  },
  description: 'Connecting Edmonton Through Technology - Financial and Corporate Services',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://oct.edmonton.ca',
    siteName: 'Open City & Technology - City of Edmonton',
    title: 'Open City & Technology | City of Edmonton',
    description: 'Connecting Edmonton Through Technology - Financial and Corporate Services',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Open City & Technology - City of Edmonton',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open City & Technology | City of Edmonton',
    description: 'Connecting Edmonton Through Technology - Financial and Corporate Services',
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#004A8F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="OCT" />
        <meta name="msapplication-TileColor" content="#004A8F" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
      </head>
      <body
        className={`${openSans.variable} ${ptSerif.variable} antialiased`}
      >
        <DevelopmentDisclaimer />
        {children}
      </body>
    </html>
  );
}
