import { AppAdminLinkClient } from './AppAdminLinkClient';
import { isLoggedInUserAppAdmin } from '@/data/admin/security';
import { AppAdminPreviewLink } from './AppAdminPreviewClient';

export async function AppAdminLink() {
  const isUserAppAdmin = await isLoggedInUserAppAdmin();
  return (
    <>{isUserAppAdmin ? <AppAdminLinkClient /> : <AppAdminPreviewLink />}</>
  );
}
