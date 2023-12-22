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
    <div className={cn('hidden lg:block', 'relative ')}>
      <T.P className="my-0">
        <Anchor href={`/organization/${organizationId}`}>
          <span className="space-x-2 flex items-center">
            <ArrowLeftIcon />
            <span>Back to Organization catch all</span>
          </span>
        </Anchor>
      </T.P>
    </div>
  );
}
