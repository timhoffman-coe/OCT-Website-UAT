import React from 'react';
import { Public_Sans } from 'next/font/google';
import Sidebar from '@/components/nic/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const publicSans = Public_Sans({
    subsets: ['latin'],
    variable: '--font-public-sans',
    display: 'swap',
});

export default function NICLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen bg-[#f6f6f8] flex flex-col ${publicSans.className}`}>
            <Header />

            {/* Main Content Area with Sidebar - adjusted for fixed header */}
            <div className="flex flex-1 pt-[104px] md:pt-[128px]">
                <Sidebar />
                <main className="flex-1 overflow-x-hidden p-6 relative">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}
