'use client';
import { Anchor } from '@/components/Anchor';
import { usePathname } from 'next/navigation';
import { TabProps } from './types';

export const Tab = ({ label, href, icon }: TabProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const baseClassNames =
    'whitespace-nowrap py-4 pb-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2';
  const modifierClasses = isActive
    ? 'border-slate-900 dark:border-slate-200 dark:text-slate-200 '
    : 'border-transparent text-muted-foreground dark:text-slate-500 dark:hover:text-slate-400 hover:border-muted-foreground';
  const className = `${baseClassNames} ${modifierClasses}`;
  return (
    <Anchor href={href} className={className}>
      {icon} <span>{label}</span>
    </Anchor>
  );
};
