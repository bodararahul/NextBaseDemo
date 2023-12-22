import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import { z } from 'zod';
import UserIcon from 'lucide-react/dist/esm/icons/user-2';
import DollarSignIcon from 'lucide-react/dist/esm/icons/dollar-sign';
import EditIcon from 'lucide-react/dist/esm/icons/edit';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default function OrganizationSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: unknown;
}) {
  const { organizationId } = paramsSchema.parse(params);
  const tabs = [
    {
      label: 'General',
      href: `/organization/${organizationId}/settings`,
      icon: <EditIcon />,
    },
    {
      label: 'Organization Members',
      href: `/organization/${organizationId}/settings/members`,
      icon: <UserIcon />,
    },
    {
      label: 'Billing',
      href: `/organization/${organizationId}/settings/billing`,
      icon: <DollarSignIcon />,
    },
  ];

  return (
    <div className="space-y-6">
      <TabsNavigation tabs={tabs} />
      {children}
    </div>
  );
}
