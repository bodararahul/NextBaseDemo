import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useRef, useState } from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getUserAvatarUrl } from '@/utils/helpers';
import { PageHeading } from '../PageHeading';
import { Button } from '../Button';
import { classNames } from '@/utils/classNames';
import { useLoggedInUserEmail } from '@/hooks/useLoggedInUserEmail';
import { T } from '@/components/ui/Typography';
import CameraIcon from 'lucide-react/dist/esm/icons/camera';
import { Label } from '@/components/ui/Label';
const MotionImage = motion(Image);

export function UpdateAvatarAndNameBody({
  onSubmit,
  isLoading,
  onFileUpload,
  isUploading,
  profileAvatarUrl,
  profileFullname,
  isNewAvatarImageLoading,
  setIsNewAvatarImageLoading,
}: {
  profileAvatarUrl: string | undefined;
  isUploading: boolean;
  onSubmit: (fullName: string) => void;
  isLoading: boolean;
  onFileUpload?: (file: File) => void;
  profileFullname: string | undefined;
  isNewAvatarImageLoading: boolean;
  setIsNewAvatarImageLoading: (value: boolean) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const email = useLoggedInUserEmail();
  const [fullName, setFullName] = useState(profileFullname ?? email);
  const avatarURL = getUserAvatarUrl({
    profileAvatarUrl,
    email,
  });
  return (
    <div className="space-y-6 max-w-sm">
      <PageHeading
        title="Account Settings"
        titleClassName="text-xl"
        subTitleClassName="text-base -mt-1"
        subTitle="Manage your account settings here."
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(fullName);
        }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <T.P>Avatar</T.P>
            <div className="relative p-0 m-0 group">
              <Label
                className="inline p-0 m-0 cursor-pointer text-muted-foreground"
                htmlFor="file-input"
              >
                <MotionImage
                  animate={{
                    opacity: isNewAvatarImageLoading ? [0.5, 1, 0.5] : 1,
                  }}
                  transition={
                    /* eslint-disable */
                    isNewAvatarImageLoading
                      ? {
                          duration: 1,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }
                      : undefined
                    /* eslint-enable */
                  }
                  onLoadingComplete={() => {
                    setIsNewAvatarImageLoading(false);
                  }}
                  onError={() => {
                    setIsNewAvatarImageLoading(false);
                  }}
                  loading="eager"
                  width={64}
                  height={64}
                  className="h-16 object-center object-cover w-16 border-2 border-gray-200 rounded-full"
                  src={avatarURL}
                  alt="avatarUrl"
                />
                <input
                  disabled={isUploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      onFileUpload?.(file);
                    }
                  }}
                  ref={fileInputRef}
                  type="file"
                  name="file-input"
                  id="file-input"
                  hidden
                  accept="image/*"
                />
                <div className="bg-gray-900 group-hover:bg-gray-800  absolute -bottom-[calc(100%-64px)] right-[calc(100%-64px)]  border border-muted-foreground rounded-full p-1">
                  <CameraIcon className="h-4 w-4 group-hover:fill-white/30 text-white" />
                </div>
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-muted-foreground">
              Name
            </Label>
            <div className="flex space-x-2 ">
              <input
                disabled={isLoading}
                className="block w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                type="text"
                required
              />
            </div>
          </div>
          <div className="flex justify-start space-x-2">
            <Button
              withMaintenanceMode
              className={classNames(
                'flex w-full justify-center rounded-lg border border-transparent py-2 text-white dark:text-black px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
                isLoading
                  ? 'bg-yellow-300 dark:bg-yellow-700 '
                  : 'bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100  ',
              )}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
