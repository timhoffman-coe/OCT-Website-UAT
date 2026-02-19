import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OCT Architecture | Open City & Technology',
  description: 'Interactive network architecture diagram for Open City & Technology.',
};

export default function OCTArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
