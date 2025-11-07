import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OCT Org Chart | Open City & Technology',
  description: 'View the organizational chart for Open City & Technology.',
};

export default function OrgChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
