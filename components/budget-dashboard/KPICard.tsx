import React from 'react';

interface KPICardProps {
    title: string;
    value: string | number;
    subValue?: string;
    color?: 'primary' | 'success' | 'warning' | 'danger' | 'accent';
    icon?: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subValue, color = 'primary', icon }) => {
    const getBorderColor = () => {
        switch (color) {
            case 'success': return 'border-[#109D7E]'; // Sea Green
            case 'warning': return 'border-[#FAB840]'; // Sunrise
            case 'danger': return 'border-red-500';
            case 'accent': return 'border-[#0081BC]'; // Process Blue
            case 'primary': return 'border-[#005087]'; // Primary Blue
            default: return 'border-gray-300';
        }
    };

    const getIconColor = () => {
        switch (color) {
            case 'success': return 'text-[#109D7E]';
            case 'warning': return 'text-[#FAB840]';
            case 'danger': return 'text-red-500';
            case 'accent': return 'text-[#0081BC]';
            case 'primary': return 'text-[#005087]';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className={`bg-white rounded-xl p-6 border-l-4 ${getBorderColor()} shadow-md flex flex-col justify-between h-full`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider font-sans">{title}</h3>
                {icon && <div className={`${getIconColor()} opacity-80`}>{icon}</div>}
            </div>
            <div>
                <p className="text-2xl font-bold text-[#212529] truncate font-sans">{value}</p>
                {subValue && <p className="text-xs text-gray-500 mt-1 font-sans">{subValue}</p>}
            </div>
        </div>
    );
};

export default KPICard;
