import {
  Network,
  Server,
  Smartphone,
  Database,
  Layers,
  Headphones,
  Wrench,
  Monitor,
  Building2,
  Phone,
  ClipboardList,
  BarChart3,
  FileText,
  Shield,
  Users,
  Settings,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Network,
  Server,
  Smartphone,
  Database,
  Layers,
  Headphones,
  Wrench,
  Monitor,
  Building2,
  Phone,
  ClipboardList,
  BarChart3,
  FileText,
  Shield,
  Users,
  Settings,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] || Server;
}

export const availableIcons = Object.keys(iconMap);
