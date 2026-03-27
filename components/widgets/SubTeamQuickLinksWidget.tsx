import { ExternalLink, Lock } from 'lucide-react';

interface QuickLink {
  label: string;
  description: string;
  href: string;
  isSecure: boolean;
}

interface SubTeamQuickLinksWidgetProps {
  quickLinks: QuickLink[];
}

export default function SubTeamQuickLinksWidget({ quickLinks }: SubTeamQuickLinksWidgetProps) {
  if (quickLinks.length === 0) return null;
  return (
    <div className="bg-structural-light-gray rounded-md p-5">
      <h3 className="font-sans font-bold text-text-dark border-b border-structural-gray-blue pb-2 mb-4">
        Quick Links
      </h3>
      <ul className="space-y-3">
        {quickLinks.map((link, index) => (
          <li
            key={index}
            className="border-b border-structural-gray-blue pb-3 last:border-0 last:pb-0"
          >
            <a
              href={link.href}
              className="font-sans font-semibold text-sm text-primary-blue hover:underline flex items-center gap-1"
            >
              {link.label}
              {link.isSecure ? (
                <Lock className="w-3 h-3" />
              ) : (
                <ExternalLink className="w-3 h-3" />
              )}
            </a>
            <span className="font-sans text-xs text-text-secondary block mt-0.5">
              {link.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
