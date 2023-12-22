'use server';
import { ReactNode, Suspense } from 'react';
import { ClientShell } from './ClientShell';
import { T } from '../ui/Typography';

export async function ApplicationLayoutShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return <ClientShell sidebar={sidebar}>{children}</ClientShell>;
}
