'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Rocket,
  ShieldCheck,
  Briefcase,
  Cpu,
  LayoutDashboard,
  Plus,
  Calendar,
  BarChartHorizontal
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Project, RoadmapSection } from '@/components/roadmap/types';
import RoadmapBar from '@/components/roadmap/RoadmapBar';
import ProjectModal from '@/components/roadmap/ProjectModal';
import { createRoadmapProject, updateRoadmapProject, deleteRoadmapProject } from '@/lib/actions/roadmap-actions';

type ViewMode = 'quarterly' | 'multi-year';

export default function RoadmapPage() {
  const [currentYear, setCurrentYear] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('quarterly');
  const [sections, setSections] = useState<RoadmapSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const fetchSections = useCallback(async () => {
    try {
      const res = await fetch('/api/roadmap/sections');
      if (res.ok) {
        const data = await res.json();
        const mapped: RoadmapSection[] = data.map((s: { id: string; title: string; color: string; projects: Project[] }) => ({
          id: s.id,
          title: s.title,
          color: s.color,
          projects: s.projects.map((p: Project) => ({
            id: p.id,
            name: p.name,
            owner: p.owner,
            startYear: p.startYear,
            endYear: p.endYear,
            startQuarter: p.startQuarter,
            endQuarter: p.endQuarter,
            progress: p.progress,
            description: p.description,
          })),
        }));
        setSections(mapped);
      }
    } catch {
      // Silently fail — page shows empty state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSections();

    // Check edit permissions
    fetch('/api/cms/roadmap/check-access')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data?.canEdit) setCanEdit(true); })
      .catch(() => {});
  }, [fetchSections]);

  const handleAddProject = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setEditingProject(undefined);
    setIsModalOpen(true);
  };

  const handleEditProject = (sectionId: string, project: Project) => {
    setActiveSectionId(sectionId);
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (sectionId: string, projectId: string) => {
    if (!confirm('Are you sure you want to delete this initiative?')) return;
    try {
      await deleteRoadmapProject(projectId);
      setSections(prev => prev.map(sec => {
        if (sec.id === sectionId) {
          return { ...sec, projects: sec.projects.filter(p => p.id !== projectId) };
        }
        return sec;
      }));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  const handleSaveProject = async (projectData: Partial<Project>) => {
    if (!activeSectionId) return;
    try {
      if (projectData.id) {
        // Update existing
        const updated = await updateRoadmapProject(projectData.id, {
          name: projectData.name!,
          owner: projectData.owner!,
          startYear: projectData.startYear!,
          endYear: projectData.endYear!,
          startQuarter: projectData.startQuarter!,
          endQuarter: projectData.endQuarter!,
          description: projectData.description,
        });
        setSections(prev => prev.map(sec => {
          if (sec.id === activeSectionId) {
            return {
              ...sec,
              projects: sec.projects.map(p => p.id === updated.id ? {
                ...p,
                name: updated.name,
                owner: updated.owner,
                startYear: updated.startYear,
                endYear: updated.endYear,
                startQuarter: updated.startQuarter,
                endQuarter: updated.endQuarter,
                progress: updated.progress,
                description: updated.description ?? undefined,
              } : p),
            };
          }
          return sec;
        }));
      } else {
        // Create new
        const created = await createRoadmapProject(activeSectionId, {
          name: projectData.name!,
          owner: projectData.owner!,
          startYear: projectData.startYear!,
          endYear: projectData.endYear!,
          startQuarter: projectData.startQuarter!,
          endQuarter: projectData.endQuarter!,
          description: projectData.description,
        });
        setSections(prev => prev.map(sec => {
          if (sec.id === activeSectionId) {
            return {
              ...sec,
              projects: [...sec.projects, {
                id: created.id,
                name: created.name,
                owner: created.owner,
                startYear: created.startYear,
                endYear: created.endYear,
                startQuarter: created.startQuarter,
                endQuarter: created.endQuarter,
                progress: created.progress,
                description: created.description ?? undefined,
              }],
            };
          }
          return sec;
        }));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save project');
    }
  };

  const getSectionIcon = (title: string) => {
    switch (title) {
      case 'Cyber Security': return <ShieldCheck className="w-5 h-5" />;
      case 'Application Technology Services': return <Briefcase className="w-5 h-5" />;
      case 'Integrated Technology Solutions': return <Cpu className="w-5 h-5" />;
      case 'Project Management Office': return <LayoutDashboard className="w-5 h-5" />;
      default: return <Rocket className="w-5 h-5" />;
    }
  };

  const getSectionColorStyles = (colorName: string) => {
    switch (colorName) {
      case 'watermelon': return { border: 'border-l-[#EA5853]', iconBg: 'bg-[#EA5853]/10', iconText: 'text-[#EA5853]' };
      case 'sea-green': return { border: 'border-l-[#109D7E]', iconBg: 'bg-[#109D7E]/10', iconText: 'text-[#109D7E]' };
      case 'empire-blue': return { border: 'border-l-[#2F63AD]', iconBg: 'bg-[#2F63AD]/10', iconText: 'text-[#2F63AD]' };
      case 'violet-night': return { border: 'border-l-[#99479A]', iconBg: 'bg-[#99479A]/10', iconText: 'text-[#99479A]' };
      case 'sunrise': return { border: 'border-l-[#FAB840]', iconBg: 'bg-[#FAB840]/10', iconText: 'text-[#FAB840]' };
      default: return { border: 'border-l-[#005087]', iconBg: 'bg-[#005087]/10', iconText: 'text-[#005087]' };
    }
  };

  const getVisibleProjects = (projects: Project[]) => {
    if (viewMode === 'multi-year') return projects;

    return projects.filter(p => {
      const startsBeforeOrIn = p.startYear < currentYear || (p.startYear === currentYear);
      const endsAfterOrIn = p.endYear > currentYear || (p.endYear === currentYear);
      return startsBeforeOrIn && endsAfterOrIn;
    });
  };

  const calculateBarPosition = (project: Project) => {
    if (viewMode === 'quarterly') {
      let effectiveStartQ = project.startQuarter;
      if (project.startYear < currentYear) effectiveStartQ = 1;

      let effectiveEndQ = project.endQuarter;
      if (project.endYear > currentYear) effectiveEndQ = 4;

      const left = (effectiveStartQ - 1) * 25;
      const width = (effectiveEndQ - effectiveStartQ + 1) * 25;
      return { left, width };

    } else {
      const globalStartIdx = (project.startYear - 1) * 4 + (project.startQuarter - 1);
      const globalEndIdx = (project.endYear - 1) * 4 + (project.endQuarter - 1);

      const quarterWidth = 100 / 16;

      const left = globalStartIdx * quarterWidth;
      const width = (globalEndIdx - globalStartIdx + 1) * quarterWidth;
      return { left, width };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Roadmap Header */}
      <div className="bg-[#193A5A] text-white shadow-lg pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#005087] rounded-lg shadow-lg shadow-[#005087]/50">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Open City and Technology <span className="text-[#0081BC]">Roadmap</span></h1>
              <p className="text-xs text-[#839899] font-medium tracking-widest uppercase">FY2025 - FY2028 Strategic Plan</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="bg-[#0e2133] p-1 rounded-lg border border-[#2F63AD]/30 flex">
              <button
                onClick={() => setViewMode('quarterly')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'quarterly'
                    ? 'bg-[#005087] text-white shadow-sm'
                    : 'text-[#839899] hover:text-white hover:bg-[#193A5A]'
                }`}
              >
                <BarChartHorizontal size={14} />
                Quarterly
              </button>
              <button
                onClick={() => setViewMode('multi-year')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'multi-year'
                    ? 'bg-[#005087] text-white shadow-sm'
                    : 'text-[#839899] hover:text-white hover:bg-[#193A5A]'
                }`}
              >
                <Calendar size={14} />
                4-Year View
              </button>
            </div>

            {/* Year Selector (Only visible in Quarterly Mode) */}
            {viewMode === 'quarterly' && (
              <div className="flex items-center bg-[#0e2133] p-1 rounded-lg border border-[#2F63AD]/30">
                {[1, 2, 3, 4].map((year) => (
                  <button
                    key={year}
                    onClick={() => setCurrentYear(year)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      currentYear === year
                        ? 'bg-[#005087] text-white shadow-md'
                        : 'text-[#839899] hover:text-white hover:bg-[#193A5A]'
                    }`}
                  >
                    Year {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        {loading ? (
          <div className="animate-pulse space-y-8 py-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 w-6 bg-gray-300 rounded" />
                  <div className="h-6 w-48 bg-gray-300 rounded" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-4">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="flex-1 h-8 bg-gray-100 rounded-full">
                        <div className="h-8 bg-gray-200 rounded-full" style={{ width: `${30 + j * 15}%`, marginLeft: `${j * 10}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center text-gray-500 py-16">No roadmap sections configured yet.</div>
        ) : (
          <>
            {/* Timeline Header */}
            <div className="grid grid-cols-12 gap-0 mb-6 bg-white rounded-t-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="col-span-3 bg-slate-50 p-4 border-r border-gray-200 flex items-center">
                <span className="font-bold text-[#839899] uppercase tracking-wider text-xs">Functional Areas</span>
              </div>

              <div className="col-span-9 grid grid-cols-4 bg-[#193A5A] text-white">
                {viewMode === 'quarterly' ? (
                  ['Q1', 'Q2', 'Q3', 'Q4'].map((q, idx) => (
                    <div key={idx} className="p-4 text-center border-l border-[#2F63AD]/30 first:border-l-0">
                      <span className="font-bold tracking-wider">{q}</span>
                      <span className="block text-[10px] text-[#839899] font-normal mt-0.5">
                        {['JAN-MAR', 'APR-JUN', 'JUL-SEP', 'OCT-DEC'][idx]}
                      </span>
                    </div>
                  ))
                ) : (
                  [1, 2, 3, 4].map((y) => (
                    <div key={y} className="p-4 text-center border-l border-[#2F63AD]/30 first:border-l-0">
                      <span className="font-bold tracking-wider">Year {y}</span>
                      <span className="block text-[10px] text-[#839899] font-normal mt-0.5">
                        FY{2024 + y}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Categories & Timeline */}
            <div className="space-y-6">
              {sections.map((section) => {
                const visibleProjects = getVisibleProjects(section.projects);
                const styles = getSectionColorStyles(section.color);

                return (
                  <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-12 border-b border-gray-100">

                      {/* Sidebar */}
                      <div className={`col-span-3 p-4 border-r border-gray-100 bg-gray-50/50 flex flex-col justify-center border-l-4 ${styles.border}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1.5 rounded-md ${styles.iconBg} ${styles.iconText}`}>
                            {getSectionIcon(section.title)}
                          </div>
                          <h3 className="font-bold text-gray-800 text-sm">{section.title}</h3>
                        </div>

                        {canEdit && (
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleAddProject(section.id)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#005087] hover:bg-[#193A5A] px-3 py-1.5 rounded-md shadow-sm transition-colors"
                            >
                              <Plus size={14} /> Add Initiative
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Grid Area */}
                      <div className="col-span-9 relative min-h-[120px] bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px)] bg-[size:25%_100%]">
                        <div className="py-2 px-0 space-y-3 relative z-10">
                          {visibleProjects.length === 0 ? (
                            <div className="absolute inset-0 flex items-center justify-center text-[#839899] text-sm italic">
                              No initiatives planned for this period.
                            </div>
                          ) : (
                            visibleProjects.map((proj) => {
                              const { left, width } = calculateBarPosition(proj);

                              return (
                                <div key={proj.id} className="grid grid-cols-4 h-11 relative group/row hover:bg-slate-50/50 transition-colors">
                                  <div className="col-span-4 relative h-full">
                                    <div
                                      className="absolute top-1/2 -translate-y-1/2 px-2 flex justify-end pointer-events-none transition-all duration-300"
                                      style={{
                                        left: 0,
                                        width: `${left}%`,
                                        opacity: left > 10 ? 1 : 0
                                      }}
                                    >
                                      <span className="text-xs font-medium text-[#839899] text-right truncate w-full pr-2">
                                        {proj.owner}
                                      </span>
                                    </div>

                                    <RoadmapBar
                                      project={proj}
                                      colorBase={section.color}
                                      left={left}
                                      width={width}
                                      onClick={canEdit ? () => handleEditProject(section.id, proj) : undefined}
                                      onDelete={canEdit ? () => handleDeleteProject(section.id, proj.id) : undefined}
                                    />
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {canEdit && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProject}
          initialData={editingProject}
          categoryName={sections.find(s => s.id === activeSectionId)?.title || 'Project'}
        />
      )}

      <Footer />
    </div>
  );
}
