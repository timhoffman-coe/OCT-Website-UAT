'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, User, Users, Building } from 'lucide-react';

type OrgNode = {
  id: string;
  title: string;
  name?: string;
  role?: string;
  children?: OrgNode[];
  isOpen?: boolean;
};

const orgData: OrgNode = {
  id: 'root',
  title: 'Office of the Chief Technology Officer (OCT)',
  name: 'Branch Manager',
  role: 'Chief Technology Officer',
  isOpen: true,
  children: [
    {
      id: 'tech-planning',
      title: 'Technology Planning',
      children: [
        { id: 'tp-dir', title: 'Director', name: 'Director Name', role: 'Director' },
        { id: 'tp-ea', title: 'Enterprise Architecture', name: 'Lead Architect', role: 'Principal Architect' },
        { id: 'tp-strat', title: 'Technology Strategy', name: 'Strategy Lead', role: 'Senior Strategist' },
      ]
    },
    {
      id: 'biz-solutions',
      title: 'Application Technology Services',
      children: [
        { id: 'bs-dir', title: 'Director', name: 'Director Name', role: 'Director' },
        { id: 'bs-lead1', title: 'Solution Delivery', name: 'Delivery Lead', role: 'Manager' },
        { id: 'bs-lead2', title: 'Business Analysis', name: 'BA Lead', role: 'Manager' },
      ]
    },
    {
      id: 'its',
      title: 'Integrated Technology Solutions',
      children: [
        { id: 'its-dir', title: 'Director', name: 'Director Name', role: 'Director' },
        { id: 'its-infra', title: 'Infrastructure Operations', name: 'Ops Lead', role: 'Manager' },
        { id: 'its-data', title: 'Data Technology', name: 'Data Lead', role: 'Manager' },
        { id: 'its-partner', title: 'Partner Experience', name: 'Partner Lead', role: 'Manager' },
      ]
    },
    {
      id: 'pmo',
      title: 'Project Management Office',
      children: [
        { id: 'pmo-dir', title: 'Director', name: 'Director Name', role: 'Director' },
        { id: 'pmo-port', title: 'Portfolio Management', name: 'Portfolio Mgr', role: 'Manager' },
        { id: 'pmo-del', title: 'Project Delivery', name: 'Senior PM', role: 'Lead' },
      ]
    },
    {
      id: 'cis',
      title: 'Corporate Information Security',
      children: [
        { id: 'cis-ciso', title: 'Chief Information Security Officer', name: 'CISO Name', role: 'CISO' },
        { id: 'cis-ops', title: 'Security Operations', name: 'SecOps Lead', role: 'Manager' },
        { id: 'cis-grc', title: 'Governance, Risk & Compliance', name: 'GRC Lead', role: 'Manager' },
      ]
    },
  ]
};

const OrgTreeNode = ({ node, level = 0 }: { node: OrgNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(node.isOpen ?? false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="select-none relative">
      <button
        type="button"
        className={`
          w-full text-left flex items-center p-3 my-2 rounded-lg border transition-all duration-200 relative z-10
          ${level === 0 ? 'bg-primary-blue text-white border-primary-blue shadow-md' : ''}
          ${level === 1 ? 'bg-white border-gray-200 hover:border-primary-blue/50 shadow-sm ml-8' : ''}
          ${level > 1 ? 'bg-gray-50 border-gray-100 ml-16' : ''}
          ${hasChildren ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}
        `}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className="mr-3 flex-shrink-0">
          {hasChildren ? (
            isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
          ) : (
            <div className="w-5 h-5" />
          )}
        </div>

        <div className="flex-grow flex items-center">
          <div className={`p-2 rounded-full mr-3 ${level === 0 ? 'bg-white/20' : 'bg-blue-100 text-primary-blue'}`}>
            {level === 0 ? <Building className="w-5 h-5" /> : (node.name ? <User className="w-5 h-5" /> : <Users className="w-5 h-5" />)}
          </div>
          <div>
            <h3 className={`font-bold ${level === 0 ? 'text-lg' : 'text-base text-gray-800'}`}>
              {node.title}
            </h3>
            {node.name && (
              <p className={`text-sm ${level === 0 ? 'text-blue-100' : 'text-gray-500'}`}>
                {node.name} {node.role && `• ${node.role}`}
              </p>
            )}
          </div>
        </div>
      </button>

      {isOpen && hasChildren && (
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 w-px bg-gray-200 -z-0"
            style={{ left: level === 0 ? '2.25rem' : level === 1 ? '4.25rem' : '6.25rem' }}
          ></div>
          <div>
            {node.children!.map((child) => (
              <OrgTreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function OrgTree() {
  return <OrgTreeNode node={orgData} />;
}
