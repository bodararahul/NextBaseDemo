import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { cn } from '@/utils/cn';
import { T } from '@/components/ui/Typography';
import { ApplicationAdminPreviewSidebar } from '../(application-pages)/_sidebar/ApplicationAdminPreviewSidebar';
import { Alert } from '@/components/ui/Alert';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicationLayoutShell sidebar={<ApplicationAdminPreviewSidebar />}>
      <div className="h-full overflow-y-auto">
        <InternalNavbar>Admin panel</InternalNavbar>
        <div className="relative flex-1 h-auto mt-8 w-full">
          <div className="pl-6 pr-12 space-y-6 pb-10">
            <Alert
              variant="default"
              className="hover:bg-gray-50 dark:hover:bg-slate-800/50 bg-gray-50 dark:bg-slate-800/50 text-gray-600 dark:text-slate-400"
            >
              All sections of this area are protected and only accessible by
              Application Admins. This is a preview of the admin panel for demo
              purposes.
            </Alert>
            {children}
          </div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
