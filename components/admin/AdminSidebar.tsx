'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, ClipboardList, ChevronRight } from 'lucide-react';

interface Team {
  id: string;
  teamName: string;
  slug: string;
}

interface AdminSidebarProps {
  teams: Team[];
  userRole: string;
  userName: string;
}

export default function AdminSidebar({ teams, userRole, userName }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <aside className="w-64 bg-dark-blue min-h-screen flex flex-col text-white flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <Link href="/admin" className="block">
          <h2 className="font-sans text-lg font-bold">OCT CMS</h2>
          <p className="font-sans text-xs text-white/60">Content Management</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
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
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/admin/teams/${team.id}`}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${
                isActive(`/admin/teams/${team.id}`)
                  ? 'bg-primary-blue text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <ChevronRight className="w-3 h-3" />
              <span className="truncate">{team.teamName}</span>
            </Link>
          ))}
        </div>

        {/* Admin Section (Super Admin Only) */}
        {userRole === 'SUPER_ADMIN' && (
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
