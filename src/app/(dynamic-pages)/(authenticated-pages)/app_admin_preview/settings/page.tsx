import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { MaintenanceModeTogglePreview } from '../../app_admin/settings/MaintenanceModeTogglePreview';

export default async function AdminPanelSettingsPreview() {
  return (
    <div className="space-y-4 max-w-[1296px]">
      <PageHeading
        title="Application Settings"
        subTitle="Create your own SAAS specific administrator components here if you like.
      You can build components similar to Retool and make them available to
      your administrators to quickly act and solve issues for your users."
      ></PageHeading>
      <div>
        <MaintenanceModeTogglePreview />
      </div>
    </div>
  );
}
