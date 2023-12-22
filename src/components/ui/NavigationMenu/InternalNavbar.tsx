import { UserNav } from './UserNav';
import { Badge } from '../Badge';
import { cn } from '@/utils/cn';
import { AppAdminLink } from './AppAdminLink/AppAdminLink';
import { ReactNode, Suspense } from 'react';
import { PendingInvitationCounter } from './PendingInvitationCounter';
import { SidebarOpen } from './SidebarOpen';

export async function InternalNavbar({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 w-full z-10 dark:bg-slate-900/50 bg-white/90 backdrop-blur">
      <div
        className={cn(
          'h-full  text-sm font-medium flex gap-2 mx-auto pl-6 pr-6 border-b dark:border-gray-700/50 py-3 w-full justify-between items-center',
        )}
      >
        <SidebarOpen />
        <Suspense>{children}</Suspense>

        <div className="relative w-max flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-px h-5 ml-2 mr-4 bg-gray-300 dark:bg-slate-700" />
            <PendingInvitationCounter />
          </div>
          <AppAdminLink />
          <div className="w-px h-5 mr-4 ml-2 bg-gray-300 dark:bg-slate-700" />
          <div className="relative w-max flex items-center space-x-3">
            <Suspense>
              <UserNav />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
