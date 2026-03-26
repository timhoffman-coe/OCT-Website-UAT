'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, ClipboardList, Trash2, ChevronRight, ChevronDown, ExternalLink, Rocket, Map, BarChart3 } from 'lucide-react';

interface Team {
  id: string;
  teamName: string;
  slug: string;
  pageTemplate: string;
  parentId: string | null;
}

interface AdminSidebarProps {
  teams: Team[];
  userRole: string;
  userName: string;
}

export default function AdminSidebar({ teams, userRole, userName }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const topLevel = teams.filter((t) => !t.parentId);
  const childrenOf = (parentId: string) =>
    teams.filter((t) => t.parentId === parentId);

  // Collect all descendant IDs for a given team
  const allDescendantIds = (parentId: string): string[] => {
    const children = childrenOf(parentId);
    return children.flatMap((c) => [c.id, ...allDescendantIds(c.id)]);
  };

  // Auto-expand sections that contain the currently active page
  const initialExpanded = new Set<string>();
  for (const team of topLevel) {
    const descendants = allDescendantIds(team.id);
    if (isActive(`/admin/teams/${team.id}`) || descendants.some((id) => isActive(`/admin/teams/${id}`))) {
      initialExpanded.add(team.id);
    }
    // Also check mid-level children for grandchild expansion
    for (const child of childrenOf(team.id)) {
      const grandchildren = childrenOf(child.id);
      if (isActive(`/admin/teams/${child.id}`) || grandchildren.some((gc) => isActive(`/admin/teams/${gc.id}`))) {
        initialExpanded.add(child.id);
      }
    }
  }

  const [expanded, setExpanded] = useState<Set<string>>(initialExpanded);

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <aside className="w-64 bg-dark-blue min-h-screen flex flex-col text-white flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="block">
            <h2 className="font-sans text-lg font-bold">OCT CMS</h2>
            <p className="font-sans text-xs text-white/60">Content Management</p>
          </Link>
          <Link
            href="/"
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="View Website"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <Link
          href="/admin"
          className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${
            pathname === '/admin' ? 'bg-primary-blue text-white' : 'text-white/80 hover:bg-white/10'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        {/* Teams Section */}
        <div className="pt-4">
          <p className="px-3 text-xs font-sans font-semibold text-white/40 uppercase tracking-wider mb-2">
            Teams
          </p>
          {topLevel.map((team) => {
            const children = childrenOf(team.id);
            const hasChildren = children.length > 0;
            const isExpanded = expanded.has(team.id);

            return (
              <div key={team.id}>
                <div className="flex items-center">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpanded(team.id)}
                      className="p-1 text-white/40 hover:text-white/80 transition-colors flex-shrink-0"
                      aria-label={isExpanded ? `Collapse ${team.teamName}` : `Expand ${team.teamName}`}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </button>
                  ) : (
                    <span className="w-5 flex-shrink-0" />
                  )}
                  <Link
                    href={`/admin/teams/${team.id}`}
                    className={`flex-1 px-2 py-2 rounded text-sm font-sans transition-colors truncate ${
                      isActive(`/admin/teams/${team.id}`)
                        ? 'bg-primary-blue text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {team.teamName}
                  </Link>
                </div>
                {hasChildren && isExpanded && (
                  <div className="ml-2">
                    {children.map((child) => {
                      const grandchildren = childrenOf(child.id);
                      const childHasChildren = grandchildren.length > 0;
                      const childIsExpanded = expanded.has(child.id);

                      return (
                        <div key={child.id}>
                          <div className="flex items-center">
                            {childHasChildren ? (
                              <button
                                onClick={() => toggleExpanded(child.id)}
                                className="p-1 ml-3 text-white/40 hover:text-white/80 transition-colors flex-shrink-0"
                                aria-label={childIsExpanded ? `Collapse ${child.teamName}` : `Expand ${child.teamName}`}
                              >
                                {childIsExpanded ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                              </button>
                            ) : (
                              <span className="w-5 ml-3 flex-shrink-0" />
                            )}
                            <Link
                              href={`/admin/teams/${child.id}`}
                              className={`flex-1 px-2 py-1.5 rounded text-xs font-sans transition-colors truncate ${
                                isActive(`/admin/teams/${child.id}`)
                                  ? 'bg-primary-blue text-white'
                                  : 'text-white/60 hover:bg-white/10'
                              }`}
                            >
                              {child.teamName}
                            </Link>
                          </div>
                          {childHasChildren && childIsExpanded &&
                            grandchildren.map((gc) => (
                              <Link
                                key={gc.id}
                                href={`/admin/teams/${gc.id}`}
                                className={`flex items-center gap-2 pl-12 pr-3 py-1 rounded text-xs font-sans transition-colors ${
                                  isActive(`/admin/teams/${gc.id}`)
                                    ? 'bg-primary-blue text-white'
                                    : 'text-white/50 hover:bg-white/10'
                                }`}
                              >
                                <span className="truncate">{gc.teamName}</span>
                              </Link>
                            ))
                          }
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Admin Section */}
        {(userRole === 'SUPER_ADMIN' || userRole === 'TEAM_ADMIN') && (
          <div className="pt-4">
            <p className="px-3 text-xs font-sans font-semibold text-white/40 uppercase tracking-wider mb-2">
              Administration
            </p>
            <Link
              href="/admin/users"
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${
                isActive('/admin/users')
                  ? 'bg-primary-blue text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              User Management
            </Link>
            {userRole === 'SUPER_ADMIN' && (
              <>
                <Link
                  href="/admin/roadmap-editors"
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${
                    isActive('/admin/roadmap-editors')
                      ? 'bg-primary-blue text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Rocket className="w-4 h-4" />
                  Roadmap Editors
                </Link>
                <Link
                  href="/admin/oct-web-dev-viewers"
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${
                    isActive('/admin/oct-web-dev-viewers')
                      ? 'bg-primary-blue text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  OCT-Web-Dev Viewers
                </Link>
                <Link
                  href="/admin/analytics"
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${
                    isActive('/admin/analytics')
                      ? 'bg-primary-blue text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Page Analytics
                </Link>
                <Link
                  href="/admin/audit-log"
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${
                    isActive('/admin/audit-log')
                      ? 'bg-primary-blue text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  Audit Log
                </Link>
                <Link
                  href="/admin/trash"
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${
                    isActive('/admin/trash')
                      ? 'bg-primary-blue text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  Trash
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        <p className="font-sans text-sm font-semibold truncate">{userName}</p>
        <p className="font-sans text-xs text-white/60">{userRole.replace('_', ' ')}</p>
        <Link
          href="/"
          className="font-sans text-xs text-white/40 hover:text-white/80 mt-1 block"
        >
          Back to site
        </Link>
      </div>
    </aside>
  );
}
