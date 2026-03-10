'use client';

import React from 'react';
import { Project } from './types';
import { Edit2, Trash2 } from 'lucide-react';

interface RoadmapBarProps {
  project: Project;
  colorBase: string;
  left: number; // Percentage
  width: number; // Percentage
  onClick?: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

// Map color bases to specific hex codes from the brand palette
const getColorClasses = (base: string) => {
  switch (base) {
    case 'watermelon': return 'bg-[#EA5853] border-[#EA5853]';
    case 'sea-green': return 'bg-[#109D7E] border-[#109D7E]';
    case 'empire-blue': return 'bg-[#2F63AD] border-[#2F63AD]';
    case 'violet-night': return 'bg-[#99479A] border-[#99479A]';
    case 'sunrise': return 'bg-[#FAB840] border-[#FAB840]';
    default: return 'bg-[#005087] border-[#005087]';
  }
};

const RoadmapBar: React.FC<RoadmapBarProps> = ({ project, colorBase, left, width, onClick, onDelete }) => {
  return (
    <div
      className={`absolute h-8 top-1.5 rounded-md shadow-md group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      }`}
      style={{
        left: `${left}%`,
        width: `${width}%`,
        marginLeft: '2px',
        maxWidth: `calc(${width}% - 4px)` // Prevent overlap issues with tiny gaps
      }}
      onClick={onClick}
    >
      <div className={`w-full h-full ${getColorClasses(colorBase)} border-b-2 flex items-center justify-between px-3`}>
        <span className="text-white text-xs font-bold truncate tracking-wide drop-shadow-sm">
          {project.name.toUpperCase()}
        </span>

        {(onClick || onDelete) && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onClick && (
              <button
                className="text-white/80 hover:text-white"
                title="Edit"
              >
                <Edit2 size={12} />
              </button>
            )}
            {onDelete && (
              <button
                className="text-white/80 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(e);
                }}
                title="Delete"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Glossy overlay effect */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 pointer-events-none"></div>
    </div>
  );
};

export default RoadmapBar;
