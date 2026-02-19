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
        <meta name="theme-color" content="#004A8F" />
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
