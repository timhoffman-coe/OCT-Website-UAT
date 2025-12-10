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
  title: "Open City & Technology | City of Edmonton",
  description: "Connecting Edmonton Through Technology - Financial and Corporate Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
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
