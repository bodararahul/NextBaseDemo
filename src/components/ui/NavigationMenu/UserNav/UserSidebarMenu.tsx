import { Anchor } from '@/components/Anchor';
import AccountsIcon from 'lucide-react/dist/esm/icons/user';
import SecurityIcon from 'lucide-react/dist/esm/icons/lock';
import LogoutIcon from 'lucide-react/dist/esm/icons/log-out';
import MailIcon from 'lucide-react/dist/esm/icons/mail';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { SelectSeparator } from '@radix-ui/react-select';
import { FeatureViewModal } from './FeatureViewModal';

export function UserSidebarMenu({
  userEmail,
  userFullName,
  userAvatarUrl,
}: {
  userEmail: string;
  userFullName: string;
  userAvatarUrl: string;
}) {
  return (
    <div className="dark:bg-black ">
      <div className="flex items-start mt-1 gap-2 px-2.5 mb-2">
        <div className="h-[28px] mt-1 w-[28px] rounded-full border">
          <Image
            src={userAvatarUrl}
            width={28}
            height={28}
            placeholder="blur"
            blurDataURL={userAvatarUrl}
            quality={100}
            sizes="100vw"
            alt="User avatar"
            style={{
              borderRadius: '50%',
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="mb-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {userFullName}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {userEmail}
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2.5 my-2" />
      <Anchor
        href="/settings"
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex px-3 gap-2 items-center py-2 text-sm',
        )}
      >
        <AccountsIcon className="text-lg" /> Account settings
      </Anchor>

      <Anchor
        href="/settings/security"
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex px-3 gap-2 items-center py-2 text-sm',
        )}
      >
        <SecurityIcon className="text-lg" /> Security Settings
      </Anchor>
      <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2.5 my-2" />
      <FeatureViewModal />
      <Anchor
        href="/feedback"
        prefetch={false}
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex px-3 gap-2 items-center py-2 text-sm',
        )}
      >
        <MailIcon className="text-lg" />
        Feedback
      </Anchor>
      <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2.5 my-2" />
      <Anchor
        href="/logout"
        prefetch={false}
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex px-3 gap-2 items-center py-2 text-sm',
        )}
      >
        <LogoutIcon className="text-lg" />
        Log out
      </Anchor>
    </div>
  );
}
