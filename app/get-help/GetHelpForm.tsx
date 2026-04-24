'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Category definitions                                               */
/* ------------------------------------------------------------------ */
const CATEGORIES = [
  {
    id: 'incident',
    label: 'Something is Broken',
    subtitle: 'Report an issue or outage',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    id: 'access',
    label: 'Account & Access',
    subtitle: 'Passwords, VPN, permissions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    id: 'hardware',
    label: 'Hardware & Software',
    subtitle: 'Requests, installs, replacements',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    id: 'service_request',
    label: 'Request a Service',
    subtitle: 'New services, changes, provisioning',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-2.55a.75.75 0 010-1.34l5.1-2.55a.75.75 0 01.66 0l5.1 2.55a.75.75 0 010 1.34l-5.1 2.55a.75.75 0 01-.66 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.72 10.83L12 14.5l7.28-3.67M4.72 14.17L12 17.84l7.28-3.67" />
      </svg>
    ),
  },
  {
    id: 'network',
    label: 'Network & Connectivity',
    subtitle: 'WiFi, VPN, bandwidth',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
  {
    id: 'other',
    label: 'Something Else',
    subtitle: 'General question or request',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
];

const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-complement-sea-green', description: 'Workaround available' },
  { value: 'medium', label: 'Medium', color: 'bg-complement-sunrise', description: 'Work is slowed' },
  { value: 'high', label: 'High', color: 'bg-edmonton-warning', description: 'Key tasks blocked' },
  { value: 'critical', label: 'Critical', color: 'bg-edmonton-error', description: 'Major outage' },
] as const;

const STEP_LABELS = ['Category', 'Details', 'Review'];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
interface GetHelpFormProps {
  userEmail: string;
  userName: string;
}

export default function GetHelpForm({ userEmail, userName }: GetHelpFormProps) {
  const [step, setStep] = useState(0);
  const [animDir, setAnimDir] = useState<'forward' | 'back'>('forward');
  const [animating, setAnimating] = useState(false);

  // form state
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedCategory = CATEGORIES.find((c) => c.id === category);

  const canProceedToReview = subject.trim().length > 0 && description.trim().length > 0;

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
    // TODO: Replace with ServiceNow API call
    setSubmitted(true);
    setTimeout(() => setShowSuccess(true), 100);
  };

  const resetForm = () => {
    setSubmitted(false);
    setShowSuccess(false);
    setCategory('');
    setSubject('');
    setDescription('');
    setUrgency('medium');
    setStep(0);
  };

  /* ---------------------------------------------------------------- */
  /*  Success state                                                    */
  /* ---------------------------------------------------------------- */
  if (submitted) {
    return (
      <div className={`transition-all duration-700 ease-out ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Success hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-blue via-primary-blue to-process-blue p-12 md:p-16 text-center text-white">
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="w-[600px] h-[600px] rounded-full border border-white/40" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-white/30" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-white/20" />
          </div>

          <div className="relative z-10">
            {/* Animated checkmark */}
            <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"
                  className="animate-[drawCheck_0.6s_ease-out_0.3s_forwards]"
                  style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
                />
              </svg>
            </div>

            <h2 className="font-sans text-3xl md:text-4xl font-bold mb-4 tracking-tight">Case Submitted</h2>
            <p className="text-white/80 text-lg max-w-lg mx-auto mb-3 leading-relaxed">
              Your support case has been received and will be routed to the appropriate team.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-200 text-sm font-semibold rounded-lg px-4 py-2 mb-6">
              <svg className="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              Integration coming soon &mdash; no action was taken.
            </div>
            <p className="text-white/60 text-sm mb-10">
              Once ServiceNow integration is live, you&apos;ll receive a ticket number and real-time tracking.
            </p>

            {/* Summary card */}
            <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-md w-full border border-white/10">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">Category</span>
                  <span className="font-semibold text-right">{selectedCategory?.label}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">Subject</span>
                  <span className="font-semibold text-right truncate max-w-[200px]">{subject}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">Urgency</span>
                  <span className="font-semibold capitalize">{urgency}</span>
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
                Submit Another Case
              </button>
              <Link
                href="/service-health"
                className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Check Service Health
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
            Support Services
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-dark-blue tracking-tight leading-tight">
            Open a Support Case
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
                  else if (i === 1 && category) goTo(1);
                  else if (i === 2 && category && canProceedToReview) goTo(2);
                }}
                disabled={
                  (i === 1 && !category) ||
                  (i === 2 && (!category || !canProceedToReview))
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
        {/* ============ STEP 0: Category selection ============ */}
        {step === 0 && (
          <div>
            <h2 className="font-sans text-xl font-bold text-dark-blue mb-2">What do you need help with?</h2>
            <p className="text-sm text-text-secondary mb-8">Select the category that best matches your issue.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
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
                      {cat.icon}
                    </div>
                    <h3 className={`font-sans text-base font-bold mb-1 transition-colors duration-300 ${
                      isSelected ? 'text-primary-blue' : 'text-dark-blue'
                    }`}>
                      {cat.label}
                    </h3>
                    <p className="text-xs text-text-secondary">{cat.subtitle}</p>
                  </button>
                );
              })}
            </div>

            {/* ServiceNow note */}
            <div className="mt-10 flex items-start gap-3 bg-complement-sunrise/8 border border-complement-sunrise/20 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-complement-sunrise flex-shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p className="text-sm text-text-secondary">
                <span className="font-bold text-dark-blue">ServiceNow integration coming soon.</span>{' '}
                Cases will be automatically routed with full ticket tracking and SLA management.
              </p>
            </div>
          </div>
        )}

        {/* ============ STEP 1: Details ============ */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Selected category chip */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => goTo(0)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-process-blue/10 text-process-blue text-sm font-semibold hover:bg-process-blue/20 transition-colors"
                >
                  <span className="text-process-blue">{selectedCategory?.icon && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  )}</span>
                  {selectedCategory?.label}
                </button>
              </div>

              <h2 className="font-sans text-xl font-bold text-dark-blue">Describe your issue</h2>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-dark-blue mb-2">
                  Subject <span className="text-edmonton-error">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary — e.g. 'Cannot access VPN from home'"
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-bold text-dark-blue mb-2">
                  Description <span className="text-edmonton-error">*</span>
                </label>
                <p className="text-xs text-text-secondary mb-2">
                  Include error messages, what you were doing, and steps to reproduce if applicable.
                </p>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe your issue in detail..."
                  className="w-full px-4 py-3.5 rounded-xl border border-structural-gray-blue bg-white text-text-dark placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-process-blue/40 focus:border-process-blue transition-all resize-y"
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-bold text-dark-blue mb-3">Urgency</label>
                <div className="flex flex-wrap gap-2">
                  {URGENCY_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setUrgency(level.value)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 ${
                        urgency === level.value
                          ? 'border-process-blue bg-process-blue/5 text-dark-blue ring-2 ring-process-blue/20'
                          : 'border-structural-gray-blue text-text-secondary hover:border-process-blue/30 hover:text-dark-blue'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${level.color}`} />
                      {level.label}
                      <span className="text-xs font-normal text-text-secondary hidden sm:inline">— {level.description}</span>
                    </button>
                  ))}
                </div>
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
                  Review Case
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

              {/* Quick help */}
              <div className="bg-structural-light-gray rounded-xl p-6">
                <h4 className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-4">Need Immediate Help?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-process-blue flex-shrink-0">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-bold text-dark-blue">780-944-4311</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-process-blue flex-shrink-0">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-text-secondary">Mon–Fri, 8:00am – 4:30pm</span>
                  </div>
                </div>
                <p className="text-[10px] text-text-secondary mt-3 italic">
                  24/7 for critical infrastructure emergencies.
                </p>
              </div>
            </aside>
          </div>
        )}

        {/* ============ STEP 2: Review ============ */}
        {step === 2 && (
          <div className="max-w-2xl">
            <h2 className="font-sans text-xl font-bold text-dark-blue mb-2">Review your case</h2>
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

              {/* Category */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Category</p>
                  <p className="text-base font-bold text-dark-blue">{selectedCategory?.label}</p>
                </div>
                <button onClick={() => goTo(0)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors mt-1">
                  Change
                </button>
              </div>

              {/* Subject */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Subject</p>
                  <p className="text-base text-dark-blue">{subject}</p>
                </div>
                <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors flex-shrink-0 mt-1">
                  Edit
                </button>
              </div>

              {/* Description */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Description</p>
                  <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{description}</p>
                </div>
                <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors flex-shrink-0 mt-1">
                  Edit
                </button>
              </div>

              {/* Urgency */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">Urgency</p>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${URGENCY_LEVELS.find((u) => u.value === urgency)?.color}`} />
                    <span className="text-base font-bold text-dark-blue capitalize">{urgency}</span>
                  </div>
                </div>
                <button onClick={() => goTo(1)} className="text-xs font-semibold text-process-blue hover:text-primary-blue transition-colors mt-1">
                  Edit
                </button>
              </div>
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
                Submit Case
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
