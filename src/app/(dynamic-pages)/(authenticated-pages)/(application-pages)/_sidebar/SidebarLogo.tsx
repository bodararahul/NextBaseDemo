import { Anchor } from '@/components/Anchor';
import { cn } from '@/utils/cn';
import darkLogo from 'public/logos/nextbase-dark-logo.png';
import lightLogo from 'public/logos/nextbase-light-logo.png';
import Image from 'next/image';
import { T } from '@/components/ui/Typography';
import PanelLeftClose from 'lucide-react/dist/esm/icons/panel-left-close';
import { SidebarClose } from './SidebarClose';

export function SidebarLogo() {
  return (
    <div className="flex justify-between items-center w-full mb-5">
      <Anchor
        href="/dashboard"
        className="ml-2 cursor-pointer flex items-center gap-1 w-full"
      >
        <Image
          width={36}
          src={lightLogo}
          alt="Nextbase Logo"
          className={cn(
            'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
            '-ml-2 ',
          )}
        />
        <Image
          width={36}
          src={darkLogo}
          alt="Nextbase Logo"
          className={cn(
            ' absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
            '-ml-2 ',
          )}
        />

        <T.P className="text-sm font-medium text-neutral-600 dark:text-slate-300">
          Nextbase
        </T.P>
      </Anchor>

      <SidebarClose />
    </div>
  );
}
