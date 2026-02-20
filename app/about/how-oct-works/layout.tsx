import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How OCT Works | Open City & Technology',
  description: 'A technical overview of OCT\'s infrastructure, systems, and operations.',
};

export default function OCTArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
