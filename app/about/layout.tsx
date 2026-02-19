import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Open City and Technology at the City of Edmonton - our mission, vision, key actions, and organizational structure.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
