interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  valueColor?: string;
  className?: string;
}

export default function MetricCard({ title, value, subtitle, valueColor = 'text-primary-blue', className = '' }: MetricCardProps) {
  return (
    <div className={`p-4 rounded-lg bg-gray-50 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <p className={`text-4xl font-bold ${valueColor}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  );
}
