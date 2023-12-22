import { ReactNode, Suspense } from 'react';
import { z } from 'zod';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { ProjectSidebar } from '../../../_sidebar/ProjectSidebar';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { ApprovalControls } from './ApprovalControls';
import { getProjectTitleById } from '@/data/user/projects';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { Anchor } from '@/components/Anchor';

const paramsSchema = z.object({
  projectId: z.string(),
});

async function ProjectPageHeading({ projectId }: { projectId: string }) {
  const projectTitle = await getProjectTitleById(projectId);
  return (
    <PageHeading
      title={projectTitle}
      actions={
        <Suspense>
          <ApprovalControls projectId={projectId} />
        </Suspense>
      }
    />
  );
}

export default async function ProjectLayout({
  params,
  children,
  navbar,
}: {
  children: ReactNode;
  params: unknown;
  navbar: ReactNode;
}) {
  const { projectId } = paramsSchema.parse(params);

  return (
    <ApplicationLayoutShell sidebar={<ProjectSidebar projectId={projectId} />}>
      <div className="">
        <InternalNavbar>
          <div className="flex w-full justify-between items-center">
            <Suspense>{navbar}</Suspense>
            <div className="flex items-center space-x-2">
              <Anchor
                className="flex gap-1.5 py-1.5 px-3 cursor-pointer items-center group rounded-md transition hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
                href={`/project/${projectId}/settings`}
              >
                <SettingsIcon className="w-4 h-4 text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300" />
                <p className="text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300 text-sm font-normal">
                  Project settings
                </p>
              </Anchor>
            </div>
          </div>
        </InternalNavbar>
        <div className="space-y-8 m-6">
          <div className="space-y-0">
            <Suspense>
              <ProjectPageHeading projectId={projectId} />
            </Suspense>
          </div>
          {children}
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
