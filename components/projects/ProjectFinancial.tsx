'use client';

interface ProjectFinancialProps {
  totalBudget?: string | null;
  fundingSources?: string | null;
  expenditureAuthority?: string | null;
}

export default function ProjectFinancial({ totalBudget, fundingSources, expenditureAuthority }: ProjectFinancialProps) {
  if (!totalBudget && !fundingSources && !expenditureAuthority) return null;

  return (
    <div className="bg-gray-100 rounded-xl p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#003962]/5 rounded-full -mr-12 -mt-12"></div>
      <h2 className="text-[#173858] font-black uppercase text-xs tracking-widest mb-6">Financial Overview</h2>
      <div className="space-y-6">
        {totalBudget && (
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Total Project Budget</label>
            <span className="text-3xl font-black text-[#003962]">{totalBudget}</span>
          </div>
        )}
        {(fundingSources || expenditureAuthority) && (
          <div className="space-y-4 pt-4 border-t border-gray-200/50">
            {fundingSources && (
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Funding Sources</label>
                <p className="text-sm font-semibold text-[#173858] mt-1">{fundingSources}</p>
              </div>
            )}
            {expenditureAuthority && (
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Expenditure Authority</label>
                <p className="text-sm font-semibold text-[#173858] mt-1">{expenditureAuthority}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
