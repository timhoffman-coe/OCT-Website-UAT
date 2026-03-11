import React from 'react';
import { Public_Sans } from 'next/font/google';
import Sidebar from '@/components/nic/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';

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
            {/* Material Symbols font - only loaded on NIC routes */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <DashboardDisclaimer dashboardName="Network Information Centre" />
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
