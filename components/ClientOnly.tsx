'use client';

import { useSyncExternalStore, type ComponentProps } from 'react';
import { ResponsiveContainer } from 'recharts';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * A wrapper around Recharts ResponsiveContainer that only renders on the client.
 * Prevents the "width(-1) and height(-1)" warnings during SSR/static generation.
 */
export function ClientResponsiveContainer(props: ComponentProps<typeof ResponsiveContainer>) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!mounted) return null;
  return <ResponsiveContainer {...props} />;
}
