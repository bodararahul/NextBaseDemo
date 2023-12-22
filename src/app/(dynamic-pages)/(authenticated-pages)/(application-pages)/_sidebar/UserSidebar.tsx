import { SidebarLogo } from './SidebarLogo';
import { SidebarLink } from './SidebarLink';
import HomeIcon from 'lucide-react/dist/esm/icons/home';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import SecurityIcon from 'lucide-react/dist/esm/icons/shield';
import DeveloperIcon from 'lucide-react/dist/esm/icons/code';
import InvitationsIcon from 'lucide-react/dist/esm/icons/mail';
import FeedbackIcon from 'lucide-react/dist/esm/icons/file-question';

export async function UserSidebar() {
  return (
    <div className="h-full w-[264px] flex flex-col space-y-2 border-r dark:border-gray-700/50 select-none">
      <div className="flex flex-col px-3 py-4 pt-2.5 justify-start h-full">
        <div className="flex justify-between items-center">
          <SidebarLogo />
        </div>
        <div className="">
          <SidebarLink
            label="Dashboard"
            href="/dashboard"
            icon={<HomeIcon className="h-5 w-5" />}
          />
          <SidebarLink
            label="Account Settings"
            href="/settings"
            icon={<SettingsIcon className="h-5 w-5" />}
          />
          <SidebarLink
            label="Security Settings"
            href="/settings/security"
            icon={<SecurityIcon className="h-5 w-5" />}
          />
          <SidebarLink
            label="Developer Settings"
            href="/settings/developer"
            icon={<DeveloperIcon className="h-5 w-5" />}
          />
          <SidebarLink
            label="Invitations"
            href="/invitations"
            icon={<InvitationsIcon className="h-5 w-5" />}
          />
          <SidebarLink
            label="My Feedback"
            href="/feedback"
            icon={<FeedbackIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </div>
  );
}
