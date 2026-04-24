'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Intake type definitions                                            */
/* ------------------------------------------------------------------ */
const INTAKE_TYPES = [
  {
    id: 'new_application',
    label: 'New Application or System',
    subtitle: 'Build or acquire a new solution',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    id: 'enhancement',
    label: 'Enhance Existing System',
    subtitle: 'Upgrade, extend, or improve current tech',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-2.55a.75.75 0 010-1.34l5.1-2.55a.75.75 0 01.66 0l5.1 2.55a.75.75 0 010 1.34l-5.1 2.55a.75.75 0 01-.66 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.72 10.83L12 14.5l7.28-3.67M4.72 14.17L12 17.84l7.28-3.67" />
      </svg>
    ),
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    subtitle: 'Cloud migration, hosting, compute, storage',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    id: 'integration',
    label: 'Integration & APIs',
    subtitle: 'Connect systems, data exchange, middleware',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    id: 'security',
    label: 'Security & Compliance',
    subtitle: 'Security controls, audits, governance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: 'network',
    label: 'Network & Connectivity',
    subtitle: 'Network upgrades, cabling, WiFi, bandwidth',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
  {
    id: 'other',
    label: 'Other Initiative',
    subtitle: 'General technology initiative',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const TIMELINE_OPTIONS = [
  { value: 'tbd', label: 'TBD' },
  { value: '3mo', label: '3 months' },
  { value: '6mo', label: '6 months' },
  { value: '12mo', label: '12 months' },
  { value: '2yr', label: '2 years' },
  { value: '4yr', label: '4 years' },
  { value: '4yr_plus', label: '4 years+' },
] as const;

const DEPARTMENTS: { name: string; branches: string[] }[] = [
  {
    name: 'Community Services',
    branches: [
      'Community Recreation and Culture',
      'Community Standards',
      'Fire Rescue Services',
      'Social Development',
    ],
  },
  {
    name: 'City Operations',
    branches: [
      'Edmonton Transit Service',
      'Fleet and Facility Services',
      'Parks and Roads Services',
      'Waste Services',
    ],
  },
  {
    name: 'Financial and Corporate Services',
    branches: [
      'Assessment and Taxation',
      'Corporate Procurement and Supply Services',
      'Deputy City Treasurer and Financial Services',
      'Enterprise Commons',
      'Open City and Technology',
      'Real Estate',
      'Service Innovation and Performance',
    ],
  },
  {
    name: 'Integrated Infrastructure Services',
    branches: [
      'Blatchford Redevelopment',
      'Building Great Neighbourhoods',
      'Infrastructure Delivery',
      'Infrastructure Planning and Design',
      'LRT Expansion and Renewal',
    ],
  },
  {
    name: 'Urban Planning and Economy',
    branches: [
      'Development Services',
      'Economic Investment Services',
      'Planning and Environment Services',
    ],
  },
  {
    name: 'Employee and Legal Services',
    branches: [
      'Corporate HR Programs and Services',
      'HR Client Services',
      'Workforce Safety and Employee Health',
      'Legal Services',
    ],
  },
];

const STEP_LABELS = ['Type', 'Details', 'Review'];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
interface TechIntakeFormProps {
  userEmail: string;
  userName: string;
}

export default function TechIntakeForm({ userEmail, userName }: TechIntakeFormProps) {
  const [step, setStep] = useState(0);
  const [animDir, setAnimDir] = useState<'forward' | 'back'>('forward');
  const [animating, setAnimating] = useState(false);

  // form state
  const [intakeType, setIntakeType] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [justification, setJustification] = useState('');
  const [department, setDepartment] = useState('');
  const [branch, setBranch] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('tbd');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedType = INTAKE_TYPES.find((t) => t.id === intakeType);
  const selectedTimeline = TIMELINE_OPTIONS.find((t) => t.value === timeline);
  const selectedDept = DEPARTMENTS.find((d) => d.name === department);

  const canProceedToReview = projectTitle.trim().length > 0 && justification.trim().length > 0 && department.length > 0;

  /* step transitions */
  const goTo = (target: number) => {
    if (animating || target === step) return;
    setAnimDir(target > step ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => {
      setStep(target);
      setAnimating(false);
    }, 250);
  };

  const handleSubmit = () => {
    // TODO: Replace with ServiceNow / intake API call
    setSubmitted(true);
    setTimeout(() => setShowSuccess(true), 100);
  };

  const resetForm = () => {
    setSubmitted(false);
    setShowSuccess(false);
    setIntakeType('');
    setProjectTitle('');
    setJustification('');
    setDepartment('');
    setBranch('');
    setSponsor('');
    setBudget('');
    setTimeline('tbd');
    setAdditionalDetails('');
    setStep(0);
  };

  /* ---------------------------------------------------------------- */
  /*  Success state                                                    */
  /* ---------------------------------------------------------------- */
  if (submitted) {
    return (
      <div className={`transition-all duration-700 ease-out ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-blue via-primary-blue to-process-blue p-12 md:p-16 text-center text-white">
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="w-[600px] h-[600px] rounded-full border border-white/40" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-white/30" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-white/20" />
          </div>

          <div className="relative z-10">
            <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"
                  className="animate-[drawCheck_0.6s_ease-out_0.3s_forwards]"
                  style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
                />
              </svg>
            </div>

            <h2 className="font-sans text-3xl md:text-4xl font-bold mb-4 tracking-tight">Intake Submitted</h2>
            <p className="text-white/80 text-lg max-w-lg mx-auto mb-3 leading-relaxed">
              Your technology intake has been received by the Business Engagement team.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-200 text-sm font-semibold rounded-lg px-4 py-2 mb-6">
              <svg className="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              Integration coming soon &mdash; no action was taken.
            </div>
            <p className="text-white/60 text-sm mb-10">
              Expect a preliminary review within 5 business days.
            </p>

            {/* Summary card */}
            <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-md w-full border border-white/10">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">Type</span>
                  <span className="font-semibold text-right">{selectedType?.label}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">Project</span>
                  <span className="font-semibold text-right truncate max-w-[200px]">{projectTitle}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">Department</span>
                  <span className="font-semibold text-right truncate max-w-[200px]">{department}</span>
                </div>
                {branch && (
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">Branch</span>
                    <span className="font-semibold text-right truncate max-w-[200px]">{branch}</span>
                  </div>
                )}
                {budget && (
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">Budget</span>
                    <span className="font-semibold text-right truncate max-w-[200px]">{budget}</span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">Timeline</span>
                  <span className="font-semibold">{selectedTimeline?.label}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">Submitted by</span>
                  <span className="font-semibold text-right truncate max-w-[200px]">{userName || userEmail}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-white text-primary-blue font-bold rounded-lg hover:bg-white/90 transition-colors"
              >
                Submit Another Intake
              </button>
              <Link
                href="/technology-planning"
                className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                View Technology Planning
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Wizard                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div>
      {/* Header row: title + user badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-process-blue mb-4 block">
            Business Engagement
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-dark-blue tracking-tight leading-tight">
            Technology Intake
          </h1>
        </div>

        {/* Authenticated user badge */}
        {userEmail && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-structural-light-gray border border-structural-gray-blue">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-blue to-process-blue flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {(userName || userEmail).charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              {userName && <p className="text-sm font-bold text-dark-blue truncate">{userName}</p>}
              <p className="text-xs text-text-secondary truncate">{userEmail}</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1 last:flex-initial">
              <button
                onClick={() => {
                  if (i === 0) goTo(0);
                  else if (i === 1 && intakeType) goTo(1);
                  else if (i === 2 && intakeType && canProceedToReview) goTo(2);
                }}
                disabled={
                  (i === 1 && !intakeType) ||
                  (i === 2 && (!intakeType || !canProceedToReview))
                }
                className={`flex items-center gap-2 transition-colors disabled:cursor-default ${
                  i <= step ? 'cursor-pointer' : ''
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  i < step
                    ? 'bg-edmonton-success text-white scale-100'
                    : i === step
                      ? 'bg-primary-blue text-white scale-110 ring-4 ring-primary-blue/20'
                      : 'bg-structural-gray-blue text-text-secondary'
                }`}>
                  {i < step ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className={`text-sm font-semibold hidden sm:inline transition-colors ${
                  i <= step ? 'text-dark-blue' : 'text-text-secondary'
                }`}>
                  {label}
                </span>
              </button>
              {i < STEP_LABELS.length - 1 && (
                <div className="flex-1 h-0.5 rounded-full overflow-hidden bg-structural-gray-blue">
                  <div
                    className="h-full bg-primary-blue transition-all duration-500 ease-out"
                    style={{ width: i < step ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step container with transition */}
      <div
        className={`transition-all duration-250 ease-out ${
          animating
            ? animDir === 'forward'
              ? 'opacity-0 translate-x-8'
              : 'opacity-0 -translate-x-8'
            : 'opacity-100 translate-x-0'
        }`}
      >
        {/* ============ STEP 0: Intake type selection ============ */}
        {step === 0 && (
          <div>
            <h2 className="font-sans text-xl font-bold text-dark-blue mb-2">What type of technology initiative is this?</h2>
            <p className="text-sm text-text-secondary mb-8">Select the category that best describes your request.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INTAKE_TYPES.map((type, i) => {
                const isSelected = intakeType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setIntakeType(type.id);
                      setTimeout(() => goTo(1), 350);
                    }}
                    className={`group relative text-left p-6 rounded-xl border-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${
                      isSelected
                        ? 'border-process-blue bg-process-blue/5 shadow-lg shadow-process-blue/10 -translate-y-1'
                        : 'border-structural-gray-blue bg-white hover:border-process-blue/40'
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {/* Selection indicator */}
                    <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected ? 'border-process-blue bg-process-blue scale-100' : 'border-structural-gray-blue scale-90'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>

                    <div className={`mb-4 transition-colors duration-300 ${
                      isSelected ? 'text-process-blue' : 'text-text-secondary group-hover:text-process-blue'
                    }`}>
                      {type.icon}
                    </div>
                    <h3 className={`font-sans text-base font-bold mb-1 transition-colors duration-300 ${
                      isSelected ? 'text-primary-blue' : 'text-dark-blue'
                    }`}>
                      {type.label}
                    </h3>
                    <p className="text-xs text-text-secondary">{type.subtitle}</p>
                  </button>
                );
              })}
            </div>

            {/* Intake process note */}
            <div className="mt-10 flex items-start gap-3 bg-process-blue/5 border border-process-blue/15 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-process-blue flex-shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p className="text-sm text-text-secondary">
                <span className="font-bold text-dark-blue">How it works:</span>{' '}
                Your submission is reviewed by the Business Engagement team. Requests are classified into Tier A ($75K+), B, or C based on scope and budget, then routed for architectural review and resource allocation.
              </p>
            </div>
          </div>
        )}

        {/* ============ STEP 1: Project details ============ */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Selected type chip */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => goTo(0)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-process-blue/10 text-process-blue text-sm font-semibold hover:bg-process-blue/20 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  {selectedType?.label}
                </button>
              </div>

              <h2 className="font-sans text-xl font-bold text-dark-blue">Project Details</h2>

              {/* Project Title */}
              <div>
                <label htmlFor="projectTitle" className="block text-sm font-bold text-dark-blue mb-2">
                  Project Title <span className="text-edmonton-error">*</span>
                </label>
                <input
                  id="projectTitle"
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g., Customer Portal Modernization"
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all"
                />
              </div>

              {/* Business Justification */}
              <div>
                <label htmlFor="justification" className="block text-sm font-bold text-dark-blue mb-2">
                  Business Justification <span className="text-edmonton-error">*</span>
                </label>
                <p className="text-xs text-text-secondary mb-2">
                  What problem does this solve? What outcome do you expect?
                </p>
                <textarea
                  id="justification"
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  rows={4}
                  placeholder="Describe the business need and expected value..."
                  className="w-full px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all resize-y"
                />
              </div>

              {/* Department / Branch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="department" className="block text-sm font-bold text-dark-blue mb-2">
                    Department <span className="text-edmonton-error">*</span>
                  </label>
                  <select
                    id="department"
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                      setBranch('');
                    }}
                    className="w-full px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all"
                    required
                  >
                    <option value="" disabled>Select a department...</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.name} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="branch" className="block text-sm font-bold text-dark-blue mb-2">
                    Branch <span className="text-text-secondary font-normal">(optional)</span>
                  </label>
                  <select
                    id="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    disabled={!selectedDept}
                    className="w-full px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">{selectedDept ? 'Select a branch...' : 'Select a department first'}</option>
                    {selectedDept?.branches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Sponsor */}
              <div>
                <label htmlFor="sponsor" className="block text-sm font-bold text-dark-blue mb-2">
                  Project Sponsor <span className="text-text-secondary font-normal">(optional)</span>
                </label>
                <p className="text-xs text-text-secondary mb-2">Director or above championing this initiative</p>
                <input
                  id="sponsor"
                  type="text"
                  value={sponsor}
                  onChange={(e) => setSponsor(e.target.value)}
                  placeholder="Full name"
                  className="w-full md:w-1/2 px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all"
                />
              </div>

              {/* Estimated Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-bold text-dark-blue mb-2">
                  Estimated Budget <span className="text-text-secondary font-normal">(optional)</span>
                </label>
                <input
                  id="budget"
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., $250,000 or TBD"
                  className="w-full md:w-1/2 px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all"
                />
              </div>

              {/* Estimated Timeline */}
              <div>
                <label className="block text-sm font-bold text-dark-blue mb-3">Estimated Timeline</label>
                <div className="flex flex-wrap gap-2">
                  {TIMELINE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTimeline(opt.value)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 ${
                        timeline === opt.value
                          ? 'border-process-blue bg-process-blue/5 text-dark-blue ring-2 ring-process-blue/20'
                          : 'border-structural-gray-blue text-text-secondary hover:border-process-blue/30 hover:text-dark-blue'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label htmlFor="additionalDetails" className="block text-sm font-bold text-dark-blue mb-2">
                  Additional Details <span className="text-text-secondary font-normal">(optional)</span>
                </label>
                <p className="text-xs text-text-secondary mb-2">
                  Key dependencies, stakeholders involved, technical constraints, or any other context.
                </p>
                <textarea
                  id="additionalDetails"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  rows={3}
                  placeholder="Any additional information that would help us understand your request..."
                  className="w-full px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all resize-y"
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => goTo(0)}
                  className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-dark-blue transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Back
                </button>
                <button
                  onClick={() => goTo(2)}
                  disabled={!canProceedToReview}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-200 ${
                    canProceedToReview
                      ? 'bg-primary-blue hover:bg-dark-blue hover:shadow-lg hover:shadow-primary-blue/20 cursor-pointer'
                      : 'bg-structural-gray-blue cursor-not-allowed'
                  }`}
                >
                  Review Submission
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Contact info (auto-populated) */}
              <div className="bg-structural-light-gray rounded-xl p-6">
                <h4 className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-4">Your Information</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue to-process-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                    {(userName || userEmail).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    {userName && <p className="text-sm font-bold text-dark-blue truncate">{userName}</p>}
                    <p className="text-xs text-text-secondary truncate">{userEmail}</p>
                  </div>
                </div>
                <p className="text-[11px] text-text-secondary">
                  Contact details are automatically populated from your City of Edmonton account.
                </p>
              </div>

              {/* About the Intake Process */}
              <div className="bg-structural-light-gray rounded-xl p-6">
                <h4 className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-4">About the Intake Process</h4>
                <ol className="space-y-3 text-sm text-text-secondary">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-process-blue text-white text-xs font-bold flex items-center justify-center">1</span>
                    <span>Your submission is reviewed by the Business Engagement team under Technology Planning.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-process-blue text-white text-xs font-bold flex items-center justify-center">2</span>
                    <span>Requests are classified into <span className="font-bold text-dark-blue">Tier A</span> ($75K+), <span className="font-bold text-dark-blue">B</span>, or <span className="font-bold text-dark-blue">C</span> based on scope and budget.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-process-blue text-white text-xs font-bold flex items-center justify-center">3</span>
                    <span>Expect a preliminary response within <span className="font-bold text-dark-blue">5 business days</span>.</span>
                  </li>
                </ol>
              </div>

              {/* Contact */}
              <div className="bg-structural-light-gray rounded-xl p-6">
                <h4 className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-4">Questions?</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Contact the Business Engagement team for guidance on the intake process.
                </p>
                <Link
                  href="/technology-planning"
                  className="inline-flex items-center gap-2 text-sm font-bold text-process-blue hover:text-primary-blue transition-colors"
                >
                  View Technology Planning
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* ============ STEP 2: Review ============ */}
        {step === 2 && (
          <div className="max-w-2xl">
            <h2 className="font-sans text-xl font-bold text-dark-blue mb-2">Review your intake submission</h2>
            <p className="text-sm text-text-secondary mb-8">Confirm the details below before submitting.</p>

            <div className="bg-structural-light-gray rounded-2xl p-8 space-y-6">
              {/* Submitted by */}
              <div className="flex items-center gap-3 pb-6 border-b border-structural-gray-blue">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue to-process-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                  {(userName || userEmail).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  {userName && <p className="text-sm font-bold text-dark-blue truncate">{userName}</p>}
                  <p className="text-xs text-text-secondary truncate">{userEmail}</p>
                </div>
              </div>

              {/* Intake Type */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Intake Type</p>
                  <p className="text-base font-bold text-dark-blue">{selectedType?.label}</p>
                </div>
                <button onClick={() => goTo(0)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors mt-1">
                  Change
                </button>
              </div>

              {/* Project Title */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Project Title</p>
                  <p className="text-base text-dark-blue">{projectTitle}</p>
                </div>
                <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors flex-shrink-0 mt-1">
                  Edit
                </button>
              </div>

              {/* Business Justification */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Business Justification</p>
                  <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{justification}</p>
                </div>
                <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors flex-shrink-0 mt-1">
                  Edit
                </button>
              </div>

              {/* Department */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Department</p>
                  <p className="text-base text-dark-blue">{department}</p>
                  {branch && <p className="text-sm text-text-secondary">{branch}</p>}
                </div>
                <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors mt-1">
                  Edit
                </button>
              </div>

              {/* Sponsor */}
              {sponsor && (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Project Sponsor</p>
                    <p className="text-base text-dark-blue">{sponsor}</p>
                  </div>
                  <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors mt-1">
                    Edit
                  </button>
                </div>
              )}

              {/* Budget */}
              {budget && (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Estimated Budget</p>
                    <p className="text-base font-bold text-dark-blue">{budget}</p>
                  </div>
                  <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors mt-1">
                    Edit
                  </button>
                </div>
              )}

              {/* Timeline */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Estimated Timeline</p>
                  <p className="text-base font-bold text-dark-blue">{selectedTimeline?.label}</p>
                </div>
                <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors mt-1">
                  Edit
                </button>
              </div>

              {/* Additional Details */}
              {additionalDetails && (
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Additional Details</p>
                    <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{additionalDetails}</p>
                  </div>
                  <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors flex-shrink-0 mt-1">
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => goTo(1)}
                className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-dark-blue transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="group flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-primary-blue to-process-blue text-white font-bold hover:shadow-xl hover:shadow-primary-blue/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                Submit Intake Request
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
