import { AccountSettings } from './AccountSettings';
import { getUserProfile } from '@/data/user/user';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';

export default async function AccountSettingsPage() {
  const user = await serverGetLoggedInUser();
  const userProfile = await getUserProfile(user.id);

  return <AccountSettings userProfile={userProfile} />;
}
