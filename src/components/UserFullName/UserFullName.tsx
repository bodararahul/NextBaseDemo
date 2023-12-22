import { getUserFullName } from '@/data/user/user';
import { T } from '../ui/Typography';

export const UserFullName = async ({ userId }: { userId: string }) => {
  const userFullName = await getUserFullName(userId);
  return <T.Subtle className="text-xs">{userFullName ?? 'User'}</T.Subtle>;
};
