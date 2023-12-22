'use client';
import { UserOnboardingDialog } from '@/components/presentational/tailwind/UserOnboardingDialog/UserOnboardingModal';
import {
  updateUserProfileNameAndAvatar,
  uploadPublicUserAvatar,
} from '@/data/user/user';
import { useToastMutation } from '@/hooks/useToastMutation';
import { Table } from '@/types';

export function UserOnboardingFlow({
  userProfile,
  onSuccess,
}: {
  userProfile: Table<'user_profiles'>;
  onSuccess: () => void;
}) {
  const { mutate: updateProfile, isLoading: isUpdatingProfile } =
    useToastMutation(
      async ({
        fullName,
        avatarUrl,
      }: {
        fullName: string;
        avatarUrl?: string;
      }) => {
        return await updateUserProfileNameAndAvatar({ fullName, avatarUrl });
      },
      {
        loadingMessage: 'Updating profile...',
        successMessage: 'Profile updated!',
        errorMessage: 'Error updating profile',
        onSuccess: () => {
          onSuccess();
        },
      },
    );

  const { mutate: uploadFile, isLoading: isUploading } = useToastMutation(
    async (file: File) => {
      return uploadPublicUserAvatar(file, file.name, {
        upsert: true,
      });
    },
    {
      loadingMessage: 'Uploading avatar...',
      successMessage: 'Avatar uploaded!',
      errorMessage: 'Error uploading avatar',
    },
  );

  return (
    <UserOnboardingDialog
      isOpen
      onSubmit={(fullName: string) => {
        updateProfile({
          fullName,
        });
      }}
      onFileUpload={(file: File) => {
        uploadFile(file);
      }}
      profileAvatarUrl={userProfile.avatar_url ?? undefined}
      isUploading={isUploading}
      isLoading={isUpdatingProfile ?? isUploading}
    />
  );
}
