import FileLineChart from 'lucide-react/dist/esm/icons/file-line-chart';
import BriefcaseIcon from 'lucide-react/dist/esm/icons/briefcase';
import PenToolIcon from 'lucide-react/dist/esm/icons/pen-tool';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import FeedbackIcon from 'lucide-react/dist/esm/icons/help-circle';
import ActivityLogIcon from 'lucide-react/dist/esm/icons/book';
import RoadMapIcon from 'lucide-react/dist/esm/icons/map';
import HomeIcon from 'lucide-react/dist/esm/icons/home';
import { Anchor } from '@/components/Anchor';
import { SidebarLogo } from './SidebarLogo';
import { SidebarLink } from './SidebarLink';

const links = [
  {
    label: 'Home',
    href: `/dashboard`,
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    label: 'Admin Dashboard',
    href: `/app_admin`,
    icon: <FileLineChart className="h-5 w-5" />,
  },
  {
    label: 'Users',
    href: `/app_admin/users`,
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    label: 'Organizations',
    href: `/app_admin/organizations`,
    icon: <BriefcaseIcon className="h-5 w-5" />,
  },
  {
    label: 'Application Settings',
    href: `/app_admin/settings`,
    icon: <SettingsIcon className="h-5 w-5" />,
  },
  {
    label: 'Blog',
    href: `/app_admin/blog`,
    icon: <PenToolIcon className="h-5 w-5" />,
  },
  {
    label: 'Feedback List',
    href: `/app_admin/feedback`,
    icon: <FeedbackIcon className="h-5 w-5" />,
  },

  {
    label: 'Changelog List',
    href: `/app_admin/changelog`,
    icon: <ActivityLogIcon className="h-5 w-5" />,
  },
  {
    label: 'Roadmap',
    href: `/app_admin/internal-roadmap`,
    icon: <RoadMapIcon className="h-5 w-5" />,
  },
];

export function ApplicationAdminSidebar() {
  return (
    <div className="h-full w-[264px] border-r dark:border-slate-700/50 select-none">
      <div className="flex flex-col px-3 py-4 pt-2.5 justify-start h-full">
        <SidebarLogo />
        <div className="h-full">
          {links.map((link) => {
            return (
              <SidebarLink
                key={link.href}
                label={link.label}
                href={link.href}
                icon={link.icon}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
