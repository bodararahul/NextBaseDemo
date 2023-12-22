import { Anchor } from '@/components/Anchor';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { getSlimProjectById } from '@/data/user/projects';
import { SidebarLink } from './SidebarLink';
import ArrowLeftIcon from 'lucide-react/dist/esm/icons/arrow-left';
import ProjectIcon from 'lucide-react/dist/esm/icons/layers';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { SidebarLogo } from './SidebarLogo';
import { Suspense } from 'react';
import { SidebarFallback } from './SidebarFallback';

async function ProjectSidebarInternal({ projectId }: { projectId: string }) {
  const [slimOrganizations, project] = await Promise.all([
    fetchSlimOrganizations(),
    getSlimProjectById(projectId),
  ]);
  const organizationId = project.organization_id;

  return (
    <div className="flex flex-col space-y-2 h-full w-[264px] border-r dark:border-gray-700/50 select-none">
      <div className="flex flex-col px-3 py-4 pt-2.5 justify-between h-full">
        <div>
          <SidebarLogo />
          <div className="flex flex-col">
            <SidebarLink
              label="Back to organization"
              href={`/organization/${organizationId}`}
              icon={<ArrowLeftIcon className="h-5 w-5" />}
            />
            {project.team_id && (
              <SidebarLink
                label="Back to team"
                href={`/organization/${organizationId}/team/${project.team_id}`}
                icon={<ArrowLeftIcon className="h-5 w-5" />}
              />
            )}
            <SidebarLink
              label="Project Home"
              href={`/project/${projectId}`}
              icon={<ProjectIcon className="h-5 w-5" />}
            />
            <SidebarLink
              label="Project Settings"
              href={`/project/${projectId}/settings`}
              icon={<SettingsIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <OrganizationSwitcher
          currentOrganizationId={organizationId}
          slimOrganizations={slimOrganizations}
        />
      </div>
    </div>
  );
}

export async function ProjectSidebar({ projectId }: { projectId: string }) {
  return (
    <Suspense fallback={<SidebarFallback />}>
      <ProjectSidebarInternal projectId={projectId} />
    </Suspense>
  );
}
