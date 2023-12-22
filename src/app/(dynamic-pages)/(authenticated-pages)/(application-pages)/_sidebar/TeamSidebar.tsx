import { OrganizationSwitcher } from './OrganizationSwitcher';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';
import { Suspense } from 'react';
import { T } from '@/components/ui/Typography';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { getSlimTeamById } from '@/data/user/teams';
import { SidebarLink } from './SidebarLink';
import TeamIcon from 'lucide-react/dist/esm/icons/folder';
import ArrowLeftIcon from 'lucide-react/dist/esm/icons/arrow-left';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { SidebarLogo } from './SidebarLogo';
import { SidebarFallback } from './SidebarFallback';

async function TeamSidebarInternal({ teamId }: { teamId: number }) {
  const [slimOrganizations, team] = await Promise.all([
    fetchSlimOrganizations(),
    getSlimTeamById(teamId),
  ]);
  const organizationId = team.organization_id;
  return (
    <div className="h-full w-[264px] border-r dark:border-gray-700/50 select-none">
      <div className="flex flex-col px-3 py-4 pt-2.5 justify-between h-full">
        <div>
          <SidebarLogo />
          <div>
            <SidebarLink
              label="Back to organization"
              href={`/organization/${organizationId}`}
              icon={<ArrowLeftIcon className="h-5 w-5" />}
            />
            <SidebarLink
              label="Team Home"
              href={`/organization/${organizationId}/team/${teamId}/`}
              icon={<TeamIcon className="h-5 w-5" />}
            />
            <SidebarLink
              label="Team Settings"
              href={`/organization/${organizationId}/team/${teamId}`}
              icon={<SettingsIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<T.P>Loading subscription details...</T.P>}>
            <SubscriptionCardSmall organizationId={organizationId} />
          </Suspense>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-normal text-gray-500 dark:text-slate-400">
              Select organization
            </p>
            <OrganizationSwitcher
              currentOrganizationId={organizationId}
              slimOrganizations={slimOrganizations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function TeamSidebar({ teamId }: { teamId: number }) {
  return (
    <Suspense fallback={<SidebarFallback />}>
      <TeamSidebarInternal teamId={teamId} />
    </Suspense>
  );
}
