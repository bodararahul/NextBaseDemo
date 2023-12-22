import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { z } from 'zod';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default function OrganizationSettingsNavbar({
  params,
}: {
  params: unknown;
}) {
  const { organizationId } = paramsSchema.parse(params);
  return (
    <div className={cn('hidden', 'relative flex gap-2 items-center ')}>
      <Anchor
        className="flex gap-1.5 py-1.5 px-3 cursor-pointer items-center group rounded-md transition hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
        href={`/organization/${organizationId}`}
      >
        <ArrowLeftIcon className="w-4 h-4 text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300" />
        <span className="text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300 text-sm font-normal">
          Back to Organization
        </span>
      </Anchor>
      {/* <p className="text-gray-500 dark:text-slate-400  text-sm font-normal">
        /
      </p>
      <p className="text-gray-500 px-2 dark:text-slate-400  text-sm font-normal">
        Settings
      </p>
      <p className="text-gray-500 dark:text-slate-400  text-sm font-normal">
        /
      </p>
      <p className="text-gray-500 px-2 dark:text-slate-400  text-sm font-normal">
        Members
      </p> */}
    </div>
  );
}
