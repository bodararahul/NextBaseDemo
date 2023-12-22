import { T } from '@/components/ui/Typography';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { Suspense } from 'react';
import { PendingInvitationsList } from './PendingInvitationsList';

export default async function DashboardPage() {
  return (
    <div className="space-y-4">
      <PageHeading
        title="Pending Invitations"
        subTitle="Manage pending invitations here."
      />
      <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
        <PendingInvitationsList />
      </Suspense>
    </div>
  );
}
