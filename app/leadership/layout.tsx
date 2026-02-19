import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leadership Team',
  description: 'Meet the leadership team behind Open City and Technology at the City of Edmonton.',
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
