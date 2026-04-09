'use client';

import { useState, useEffect, type ComponentProps } from 'react';
import { ResponsiveContainer } from 'recharts';

/**
 * A wrapper around Recharts ResponsiveContainer that only renders on the client.
 * Prevents the "width(-1) and height(-1)" warnings during SSR/static generation.
 */
export function ClientResponsiveContainer(props: ComponentProps<typeof ResponsiveContainer>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <ResponsiveContainer {...props} />;
}
