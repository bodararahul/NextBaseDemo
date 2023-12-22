// https://github.com/vercel/next.js/issues/58272
import { Anchor } from '@/components/Anchor';
import { Badge } from '@/components/ui/Badge';
import { T } from '@/components/ui/Typography';
import { getOrganizationTitle } from '@/data/user/organizations';
import { Suspense } from 'react';
import { z } from 'zod';
import UsersIcon from 'lucide-react/dist/esm/icons/users-2';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export async function generateMetadata({ params }: { params: unknown }) {
  const parsedParams = paramsSchema.parse(params);
  const { organizationId } = parsedParams;
  const organizationTitle = await getOrganizationTitle(organizationId);

  return {
    title: `${organizationTitle} | Organization | Nextbase Pro`,
    description: 'Organization title',
  };
}

async function Title({ organizationId }: { organizationId: string }) {
  const title = await getOrganizationTitle(organizationId);
  // className="gap-2 ring-0 bg-purple-50 rounded-full dark:bg-slate-800 text-purple-600 font-medium dark:text-slate-400"

  return (
    <div className="flex items-center gap-2">
      <UsersIcon className="w-4 h-4" />
      <T.P>{title}</T.P>
      {/* <div className="flex items-center gap-2 p-0.5 px-1.5 rounded-md text-sm bg-gray-50 border border-gray-300 dark:border-slate-700/50 dark:bg-slate-800/50 text-gray-700 dark:text-slate-400">
        Organization
      </div> */}
      <div className="flex items-center gap-2 p-0.5 px-2 rounded-full text-xs font-normal  text-gray-600 dark:text-slate-300 border border-gray-600 dark:border-slate-300  uppercase ">
        Organization
      </div>
    </div>
  );
}

export default async function OrganizationNavbar({
  params,
}: {
  params: unknown;
}) {
  const { organizationId } = paramsSchema.parse(params);
  return (
    <div className="flex items-center">
      <Anchor href={`/organization/${organizationId}`}>
        <span className="space-x-2 flex items-center">
          <Suspense fallback={<span>Loading...</span>}>
            <Title organizationId={organizationId} />
          </Suspense>
        </span>
      </Anchor>
    </div>
  );
}
