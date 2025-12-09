'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Dashboard from '@/components/budget-dashboard/Dashboard';
import { BudgetType } from '@/components/budget-dashboard/types';
import BudgetLayout from '@/components/budget-dashboard/BudgetLayout';

export default function CapitalBudgetPage() {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header />
            <div className="bg-red-600 text-white text-center py-3 px-4">
                <p className="font-sans text-lg font-bold uppercase tracking-wide">
                    ⚠️ SAMPLE DATA ONLY - NOT LIVE ⚠️
                </p>
            </div>
            <div className="flex-1 overflow-hidden">
                <BudgetLayout>
                    <div className="p-8">
                        <Dashboard focusedType={BudgetType.CAPITAL} />
                    </div>
                </BudgetLayout>
            </div>
            <Footer />
        </div>
    );
}
