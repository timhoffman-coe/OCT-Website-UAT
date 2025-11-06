'use client';

import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { OrgPerson } from './types';
import { OrgChartNode } from './OrgChartNode';
import { FaSearchPlus, FaSearchMinus, FaExpand, FaLink } from 'react-icons/fa';

interface OrgChartProps {
  data: OrgPerson;
}

export const OrgChart: React.FC<OrgChartProps> = ({ data }) => {
  const [zoom, setZoom] = useState(0.4);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(0.4);
  };

  const renderTree = (person: OrgPerson) => {
    return (
      <TreeNode label={<OrgChartNode person={person} />}>
        {person.subordinates &&
          person.subordinates.map((subordinate) => (
            <React.Fragment key={subordinate.id}>
              {renderTree(subordinate)}
            </React.Fragment>
          ))}
      </TreeNode>
    );
  };

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={handleZoomOut}
          className="flex items-center gap-2 bg-[#005087] text-white px-4 py-2 rounded-lg hover:bg-[#193A5A] transition-colors shadow-md"
          aria-label="Zoom out"
        >
          <FaSearchMinus />
          <span className="text-sm font-semibold">Zoom Out</span>
        </button>
        <button
          onClick={handleResetZoom}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          aria-label="Reset zoom"
        >
          <FaExpand />
          <span className="text-sm font-semibold">Reset</span>
        </button>
        <button
          onClick={handleZoomIn}
          className="flex items-center gap-2 bg-[#005087] text-white px-4 py-2 rounded-lg hover:bg-[#193A5A] transition-colors shadow-md"
          aria-label="Zoom in"
        >
          <FaSearchPlus />
          <span className="text-sm font-semibold">Zoom In</span>
        </button>
      </div>

      {/* Chart Container */}
      <div className="overflow-auto border-2 border-gray-200 rounded-lg bg-[#F9F9F9] p-8">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Tree
            lineWidth="2px"
            lineColor="#005087"
            lineBorderRadius="10px"
            label={<OrgChartNode person={data} />}
          >
            {data.subordinates &&
              data.subordinates.map((subordinate) => (
                <React.Fragment key={subordinate.id}>
                  {renderTree(subordinate)}
                </React.Fragment>
              ))}
          </Tree>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#005087] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">26</span>
          </div>
          <span>Employee Count</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
            <FaLink className="w-3 h-3 text-white" />
          </div>
          <span>Has Additional Resources</span>
        </div>
      </div>
    </div>
  );
};
