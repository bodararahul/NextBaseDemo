'use server';

import { toSiteURL } from '@/utils/helpers';

export async function customRevalidate(
  path: string,
  type?: 'layout' | 'page' | undefined,
) {
  const requestPath = toSiteURL(`/api/revalidate`);
  const searchParams = new URLSearchParams({ path });
  if (type) {
    searchParams.append('type', type);
  }

  const res = await fetch(`${requestPath}?${searchParams.toString()}`, {
    credentials: 'include',
  });
  const payload = await res.json();
  return payload;
}
