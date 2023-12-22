import { ReactNode, Suspense } from 'react';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';
import { Anchor } from '@/components/Anchor';
import { Badge } from '@/components/ui/Badge';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { UserSidebar } from '../(application-pages)/_sidebar/UserSidebar';

export default async function Layout({
  children,
  navbar,
}: {
  children: ReactNode;
  navbar: ReactNode;
}) {
  return (
    <ApplicationLayoutShell sidebar={<UserSidebar />}>
      <div>
        <InternalNavbar>
          <Suspense>{navbar}</Suspense>
        </InternalNavbar>
        <div className="relative flex-1 h-auto mt-6 w-full overflow-auto">
          <div className="px-6 space-y-6 pb-10">{children}</div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
