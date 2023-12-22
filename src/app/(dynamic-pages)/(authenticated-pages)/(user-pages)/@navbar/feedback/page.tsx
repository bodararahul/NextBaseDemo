import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
export const metadata = {
  title: 'My Feedback',
};
export default function FeedbackNavbar() {
  return (
    <div className={cn('hidden lg:block', 'relative ')}>
      <T.P className="my-0">My Feedback</T.P>
    </div>
  );
}
