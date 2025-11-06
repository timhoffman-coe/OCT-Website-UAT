import React from 'react';
import { OrgPerson } from './types';
import { FaUser, FaLink } from 'react-icons/fa';

interface OrgChartNodeProps {
  person: OrgPerson;
}

export const OrgChartNode: React.FC<OrgChartNodeProps> = ({ person }) => {
  // Special styling for Branch Manager's Office
  const isBranchOffice = person.id === 'branch-office';

  // Special styling for top-level CIO
  const isCIO = person.id === 'daryl-croft';

  return (
    <div
      className={`
        relative bg-white border-2 rounded-lg shadow-md
        transition-all duration-200 hover:shadow-lg hover:scale-105
        ${isCIO ? 'border-[#005087] w-[220px] min-w-[220px] max-w-[220px]' : 'border-gray-200 w-[200px] min-w-[200px] max-w-[200px]'}
        ${isBranchOffice ? 'border-[#193A5A]' : ''}
      `}
    >
      {/* Employee Number Badge - Top Right */}
      {person.employeeNumber && (
        <div className="absolute -top-2 -right-2 bg-[#005087] text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[32px] text-center">
          {person.employeeNumber}
        </div>
      )}

      {/* Link Icon - Top Left */}
      {person.hasLink && (
        <div className="absolute -top-2 -left-2 bg-gray-600 text-white p-1.5 rounded-full">
          <FaLink className="w-3 h-3" />
        </div>
      )}

      <div className="p-3">
        {/* Profile Picture/Avatar */}
        <div className="flex justify-center mb-2">
          {person.imageUrl ? (
            <img
              src={person.imageUrl}
              alt={person.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#005087]"
            />
          ) : (
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${isCIO ? 'bg-[#005087]' : isBranchOffice ? 'bg-[#193A5A]' : 'bg-gray-300'}
            `}>
              <FaUser className={`
                w-6 h-6
                ${isCIO || isBranchOffice ? 'text-white' : 'text-gray-600'}
              `} />
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className={`
          text-center font-semibold mb-1
          ${isCIO ? 'text-base text-[#005087]' : 'text-sm text-gray-900'}
        `}>
          {person.name}
        </h3>

        {/* Title */}
        {person.title && (
          <p className={`
            text-center text-xs leading-snug
            ${isCIO ? 'text-gray-700 font-medium' : 'text-gray-600'}
          `}>
            {person.title}
          </p>
        )}
      </div>
    </div>
  );
};
