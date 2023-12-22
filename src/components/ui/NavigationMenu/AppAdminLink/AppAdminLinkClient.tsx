'use client';
import { Anchor } from '@/components/Anchor';
import { classNames } from '@/utils/classNames';
import ServerIcon from 'lucide-react/dist/esm/icons/server';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

const matchAppAdmin = match('/app_admin/(.*)?');
export function AppAdminLinkClient() {
  const pathname = usePathname();
  const isActive = pathname ? matchAppAdmin(pathname) : false;

  return (
    <Anchor
      href="/app_admin"
      className={classNames(
        `flex gap-1.5 py-1.5 px-3 cursor-pointer items-center group rounded-md transition hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 `,
        isActive ? ' bg-gray-100  dark:bg-slate-800  ' : ' bg-transparent',
      )}
    >
      <span
        className={classNames(
          'text-gray-700 dark:text-slate-300 ',
          isActive
            ? ' text-gray-700 dark:text-slate-300 '
            : ' text-gray-500 dark:text-slate-400 ',
        )}
      >
        <ServerIcon className="h-4 w-4" />
      </span>

      <span
        className={classNames(
          'transition text-sm font-normal whitespace-nowrap',
          isActive
            ? ' text-gray-700 dark:text-slate-300 '
            : ' text-gray-500 dark:text-slate-400 ',
        )}
      >
        Admin Panel
      </span>
    </Anchor>
  );
}
