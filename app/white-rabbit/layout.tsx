import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'White Rabbit',
  robots: { index: false, follow: false },
};

export default function WhiteRabbitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
