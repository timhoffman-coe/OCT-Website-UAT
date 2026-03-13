'use client';

import React, { useState, useEffect } from 'react';
import { Project, Quarter } from './types';
import { X, Save } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Partial<Project>) => void;
  initialData?: Project;
  categoryName: string;
}

/**
 * ProjectModal - Modal for adding/editing roadmap initiatives
 *
 * NOTE: This component is preserved for future RBAC integration.
 * Currently not rendered in the UI but kept for when editing functionality is enabled.
 */
const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, initialData, categoryName }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [startYear, setStartYear] = useState(1);
  const [endYear, setEndYear] = useState(1);
  const [startQuarter, setStartQuarter] = useState<Quarter>(1);
  const [endQuarter, setEndQuarter] = useState<Quarter>(1);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sync form fields with modal open/initialData
        setName(initialData.name);
        setOwner(initialData.owner);
        setStartYear(initialData.startYear);
        setEndYear(initialData.endYear);
        setStartQuarter(initialData.startQuarter);
        setEndQuarter(initialData.endQuarter);
        setDescription(initialData.description || '');
      } else {
        // Reset for new item
        setName('');
        setOwner('');
        setStartYear(1);
        setEndYear(1);
        setStartQuarter(1);
        setEndQuarter(1);
        setDescription('');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Logic to ensure end date is not before start date
    let validEndYear = endYear;
    let validEndQuarter = endQuarter;

    if (endYear < startYear) {
      validEndYear = startYear;
    }

    if (validEndYear === startYear && endQuarter < startQuarter) {
      validEndQuarter = startQuarter;
    }

    onSave({
      id: initialData?.id,
      name,
      owner,
      startYear,
      endYear: validEndYear,
      startQuarter,
      endQuarter: validEndQuarter,
      description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {initialData ? 'Edit Initiative' : `New ${categoryName} Initiative`}
          </h2>
          <button onClick={onClose} className="text-[#839899] hover:text-[#005087] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initiative Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005087] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Zero Trust Implementation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner / Lead</label>
            <input
              required
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005087] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Sarah J."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date Group */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Start Date</span>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-400">Year</label>
                  <select
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="w-full p-1.5 border border-gray-300 rounded text-sm outline-none focus:border-[#005087]"
                  >
                    {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400">Quarter</label>
                  <select
                    value={startQuarter}
                    onChange={(e) => setStartQuarter(Number(e.target.value) as Quarter)}
                    className="w-full p-1.5 border border-gray-300 rounded text-sm outline-none focus:border-[#005087]"
                  >
                    {[1, 2, 3, 4].map(q => <option key={q} value={q}>Q{q}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* End Date Group */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">End Date</span>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-400">Year</label>
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="w-full p-1.5 border border-gray-300 rounded text-sm outline-none focus:border-[#005087]"
                  >
                    {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400">Quarter</label>
                  <select
                    value={endQuarter}
                    onChange={(e) => setEndQuarter(Number(e.target.value) as Quarter)}
                    className="w-full p-1.5 border border-gray-300 rounded text-sm outline-none focus:border-[#005087]"
                  >
                    {[1, 2, 3, 4].map(q => <option key={q} value={q}>Q{q}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005087] outline-none resize-none"
              placeholder="Strategic details..."
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#005087] hover:bg-[#193A5A] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-[#005087]/20"
            >
              <Save size={18} />
              Save Initiative
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
