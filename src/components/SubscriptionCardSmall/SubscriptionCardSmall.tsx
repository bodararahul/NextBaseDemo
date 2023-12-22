import { Anchor } from '@/components/Anchor';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/HoverCard';
import { T } from '@/components/ui/Typography';
import { getNormalizedOrganizationSubscription } from '@/data/user/organizations';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { formatNormalizedSubscription } from '@/utils/formatNormalizedSubscription';
import ArrowUpRightIcon from 'lucide-react/dist/esm/icons/arrow-up-right';
import { Button } from '../ui/Button';

export async function SubscriptionCardSmall({
  organizationId,
}: {
  organizationId: string;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const normalizedSubscription =
    await getNormalizedOrganizationSubscription(organizationId);

  const { title, sidenote, description } = formatNormalizedSubscription(
    normalizedSubscription,
  );

  if (title) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Anchor href={`/organization/${organizationId}/settings/billing`}>
            <div className="group cursor-pointer flex flex-col gap-1 items-start p-2 py-2 pb-3 border     w-full rounded-lg">
              <T.P className="font-semibold ">{title} Pro</T.P>
              {sidenote ? (
                <T.Small className=" font-normal  group-hover:underline underline-offset-4">
                  {sidenote}
                </T.Small>
              ) : null}
            </div>
          </Anchor>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">{description}</HoverCardContent>
      </HoverCard>
    );
  } else {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Anchor
            className="w-full cursor-pointer flex mr-2 gap-2 items-center mt-1 rounded-lg"
            href={`/organization/${organizationId}/settings/billing`}
          >
            <Button variant="default" className="w-full">
              <ArrowUpRightIcon className="h-5 w-5 mr-2 " />
              {sidenote}
            </Button>
          </Anchor>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">{description}</HoverCardContent>
      </HoverCard>
    );
  }
}
