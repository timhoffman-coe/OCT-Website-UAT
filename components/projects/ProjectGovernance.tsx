'use client';

interface ProjectGovernanceProps {
  department?: string | null;
  branch?: string | null;
  projectSponsor?: string | null;
  projectManager?: string | null;
  octProgramManager?: string | null;
  octltRepresentative?: string | null;
  programManagerBusiness?: string | null;
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</label>
      <p className="text-gray-900 font-semibold text-lg">{value}</p>
    </div>
  );
}

export default function ProjectGovernance(props: ProjectGovernanceProps) {
  const fields = [
    { label: 'Department & Branch', value: [props.department, props.branch].filter(Boolean).join(' — ') || null },
    { label: 'Project Sponsor', value: props.projectSponsor },
    { label: 'Project Manager', value: props.projectManager },
    { label: 'OCT Program Manager (MRP)', value: props.octProgramManager },
    { label: 'OCTLT Representative', value: props.octltRepresentative },
    { label: 'Program Manager (Business)', value: props.programManagerBusiness },
  ];

  const hasAny = fields.some((f) => f.value);
  if (!hasAny) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden p-8">
      <h2 className="text-[#173858] font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#003962] rounded-full"></span>
        Project Governance
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {fields.map((f) => (
          <Field key={f.label} label={f.label} value={f.value} />
        ))}
      </div>
    </div>
  );
}
