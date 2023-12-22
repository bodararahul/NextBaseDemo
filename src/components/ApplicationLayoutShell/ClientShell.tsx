'use client';
import { SidebarVisibilityContext } from '@/contexts/SidebarVisibilityContext';
import { cn } from '@/utils/cn';
import { ReactNode, useContext } from 'react';

export function ClientShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  const { isVisible } = useContext(SidebarVisibilityContext);
  return (
    <div
      className={cn(
        'h-screen w-full overflow-hidden',
        isVisible ? 'grid' : 'block',
      )}
      style={{
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      <> {isVisible ? sidebar : null}</>
      <div className="h-full overflow-y-auto">
        <div className="relative flex-1 h-auto w-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
