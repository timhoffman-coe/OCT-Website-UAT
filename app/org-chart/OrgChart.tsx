'use client';

import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { OrgPerson } from './types';
import { OrgChartNode } from './OrgChartNode';
import { FaSearchPlus, FaSearchMinus, FaExpand, FaLink, FaChevronDown } from 'react-icons/fa';

interface OrgChartProps {
  data: OrgPerson;
}

export const OrgChart: React.FC<OrgChartProps> = ({ data }) => {
  const [zoom, setZoom] = useState(0.8);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    // Initialize with only root expanded (CIO)
    // Users can click to expand directors
    const initialExpanded = new Set<string>();
    initialExpanded.add(data.id); // Only add root (CIO)
    return initialExpanded;
  });

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(0.8);
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderTree = (person: OrgPerson) => {
    const isExpanded = expandedNodes.has(person.id);
    const hasSubordinates = person.subordinates && person.subordinates.length > 0;

    return (
      <TreeNode
        label={
          <OrgChartNode
            person={person}
            isExpanded={isExpanded}
            onToggle={() => hasSubordinates && toggleNode(person.id)}
          />
        }
      >
        {hasSubordinates && isExpanded &&
          person.subordinates!.map((subordinate) => (
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
      <div className="w-full overflow-x-auto py-8">
        <div
          className="inline-flex justify-center min-w-full"
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
            label={
              <OrgChartNode
                person={data}
                isExpanded={expandedNodes.has(data.id)}
                onToggle={() => data.subordinates && data.subordinates.length > 0 && toggleNode(data.id)}
              />
            }
          >
            {data.subordinates && expandedNodes.has(data.id) &&
              data.subordinates.map((subordinate) => (
                <React.Fragment key={subordinate.id}>
                  {renderTree(subordinate)}
                </React.Fragment>
              ))}
          </Tree>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#005087] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">26</span>
          </div>
          <span>Total Employees</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
            <FaLink className="w-3 h-3 text-white" />
          </div>
          <span>Has Additional Resources</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded">
            <FaChevronDown className="w-3 h-3 text-[#005087]" />
            <span className="text-xs">X reports</span>
          </div>
          <span>Click to expand/collapse</span>
        </div>
      </div>
    </div>
  );
};
