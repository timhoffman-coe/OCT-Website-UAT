'use client';

import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { generateDashboardAnalysis } from '@/app/vendor-command-center/actions';
import { KPIData, Vendor } from './types';
import { Sparkles, RefreshCw } from 'lucide-react';

interface AIInsightsProps {
    kpiData: KPIData;
    criticalVendors: Vendor[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ kpiData, criticalVendors }) => {
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const result = await generateDashboardAnalysis(kpiData, criticalVendors);
            setAnalysis(result);
        } catch (error) {
            console.error("AI Generation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-blue-400 opacity-10 rounded-full blur-xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                            <h3 className="font-bold text-lg">AI Executive Summary</h3>
                        </div>
                        {!analysis && (
                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-white/10"
                            >
                                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                {loading ? 'Analyzing...' : 'Generate Insights'}
                            </button>
                        )}
                    </div>

                    {analysis ? (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 animate-fade-in">
                            <div
                                className="prose prose-invert prose-sm max-w-none [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(analysis) }}
                            />
                            <button
                                onClick={() => setAnalysis(null)}
                                className="mt-4 text-xs text-indigo-200 hover:text-white underline decoration-dashed"
                            >
                                Clear Analysis
                            </button>
                        </div>
                    ) : (
                        <p className="text-indigo-100 text-sm max-w-2xl">
                            Leverage Gemini 2.5 Flash to analyze your vendor portfolio instantly. Identify hidden risks, budget overruns, and upcoming renewal bottlenecks with a single click.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIInsights;
