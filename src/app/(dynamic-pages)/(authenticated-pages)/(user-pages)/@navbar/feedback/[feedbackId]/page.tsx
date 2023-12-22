import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export default function InvitationsNavbar() {
  return (
    <div className={cn('hidden lg:block', 'relative ')}>
      <T.P className="my-0">
        <Anchor href="/feedback">
          <span className="space-x-2 flex items-center">
            <ArrowLeftIcon />
            <span>Back to Feedback</span>
          </span>
        </Anchor>
      </T.P>
    </div>
  );
}
