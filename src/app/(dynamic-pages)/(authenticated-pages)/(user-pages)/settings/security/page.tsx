import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { UpdatePassword } from './UpdatePassword';
import { UpdateEmail } from './UpdateEmail';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';

export default async function SecuritySettings() {
  const user = await serverGetLoggedInUser();
  return (
    <div className="space-y-8 max-w-sm">
      <PageHeading
        title="Security Settings"
        titleClassName="text-xl"
        subTitleClassName="text-base -mt-1"
        subTitle="Manage your login credentials here."
      />
      <div className="space-y-24">
        <UpdateEmail initialEmail={user.email} />
        <UpdatePassword />
      </div>
    </div>
  );
}
