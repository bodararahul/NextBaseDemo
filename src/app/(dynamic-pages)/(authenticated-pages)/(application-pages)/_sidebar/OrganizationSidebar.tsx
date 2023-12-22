import { Suspense } from 'react';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { T } from '@/components/ui/Typography';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { SidebarLogo } from './SidebarLogo';
import { ProjectsList } from './ProjectsList';
import { TeamsList } from './TeamsList';
import { SidebarLink } from './SidebarLink';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import HomeIcon from 'lucide-react/dist/esm/icons/home';
import UserIcon from 'lucide-react/dist/esm/icons/user-2';
import DollarIcon from 'lucide-react/dist/esm/icons/dollar-sign';
import { SidebarFallback } from './SidebarFallback';

async function OrganizationSidebarInternal({
  organizationId,
}: {
  organizationId: string;
}) {
  const slimOrganizations = await fetchSlimOrganizations();
  return (
    <div className="h-full w-[264px] border-r dark:border-gray-700/50 select-none">
      <div className="flex flex-col px-3 py-4 pt-2.5 justify-between h-full">
        <div>
          <div className="flex justify-between items-center">
            <SidebarLogo />
          </div>
          <div className="flex flex-col gap-6 h-full overflow-y-auto">
            {/* <ProjectsList organizationId={organizationId} />
            <TeamsList organizationId={organizationId} /> */}
            <div>
              <SidebarLink
                label="Organization Home"
                href={`/organization/${organizationId}`}
                icon={<HomeIcon className="h-5 w-5" />}
              />
              <SidebarLink
                label="Organization Settings"
                href={`/organization/${organizationId}/settings`}
                icon={<SettingsIcon className="h-5 w-5" />}
              />
              <SidebarLink
                label="Organization Members"
                href={`/organization/${organizationId}/settings/members`}
                icon={<UserIcon className="h-5 w-5" />}
              />
              <SidebarLink
                label="Billing"
                href={`/organization/${organizationId}/settings/billing`}
                icon={<DollarIcon className="h-5 w-5" />}
              />
            </div>
            {/* <TeamsList organizationId={organizationId} /> */}
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

export async function OrganizationSidebar({
  organizationId,
}: {
  organizationId: string;
}) {
  return (
    <Suspense fallback={<SidebarFallback />}>
      <OrganizationSidebarInternal organizationId={organizationId} />
    </Suspense>
  );
}
