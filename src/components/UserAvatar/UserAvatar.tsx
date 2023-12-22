'use server';
import { getUserAvatarUrl, getUserProfile } from '@/data/user/user';
import { getPublicUserAvatarUrl } from '@/utils/helpers';
import Image from 'next/image';

const blurFallback =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAGklEQVR42mNkMGYgCTCOahjVMKphVANtNQAApZ0E4ZNIscsAAAAASUVORK5CYII=';

const fallbackSource = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp`;

export const UserAvatar = async ({
  userId,
  size = 24,
}: {
  userId: string;
  size: number;
}) => {
  const avatarUrl = await getUserAvatarUrl(userId);
  let imageSource = fallbackSource;
  if (avatarUrl) {
    imageSource = getPublicUserAvatarUrl(avatarUrl);
  }

  return (
    <Image
      className={`rounded-full`}
      placeholder="blur"
      blurDataURL={blurFallback}
      alt={`${userId} avatar`}
      src={imageSource}
      width={size}
      style={{
        width: size,
        height: size,
      }}
      height={size}
    />
  );
};

export async function FallbackImage({ size }: { size: number }) {
  return (
    <Image
      className={`rounded-full`}
      placeholder="blur"
      blurDataURL={blurFallback}
      alt={`Fallback`}
      src={blurFallback}
      width={size}
      style={{
        width: size,
        height: size,
      }}
      height={size}
    />
  );
}
