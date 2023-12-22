import urlJoin from 'url-join';
import MD5 from 'crypto-js/md5';
import { DEV_PORT } from '@/constants';

export const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    `http://localhost:${DEV_PORT}/`;
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const toSiteURL = (path: string) => {
  const url = getURL();
  return urlJoin(url, path);
};

export const toDateTime = (secs: number) => {
  const t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const getUserAvatarUrl = ({
  email,
  profileAvatarUrl,
}: {
  email: string;
  profileAvatarUrl?: string | null | undefined;
}) => {
  const placeholderAvatarUrl = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp`;
  const fallbackAvatarUrl = `https://www.gravatar.com/avatar/${MD5(
    email,
  )}?d=mp`;
  const isProfileAvatarUrlValid =
    profileAvatarUrl && profileAvatarUrl.length > 0;
  return isProfileAvatarUrlValid
    ? profileAvatarUrl
    : fallbackAvatarUrl ?? placeholderAvatarUrl;
};

export const getPublicUserAvatarUrl = (
  possibleAvatarUrl?: string | null | undefined,
) => {
  const placeholderAvatarUrl = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp`;

  return possibleAvatarUrl ?? placeholderAvatarUrl;
};
