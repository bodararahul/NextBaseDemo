import { Button } from '@/components/ui/Button';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { getUserAvatarUrl } from '@/utils/helpers';
import { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { motion } from 'framer-motion';
import { useLoggedInUserEmail } from '@/hooks/useLoggedInUserEmail';
import Image from 'next/image';
import { Label } from '@/components/ui/Label';
import AddUserIcon from 'lucide-react/dist/esm/icons/user-plus';

const MotionImage = motion(Image);

export const UserOnboardingDialog = ({
  isOpen,
  onSubmit,
  isLoading,
  onFileUpload,
  isUploading,
  profileAvatarUrl,
}: {
  isOpen: boolean;
  profileAvatarUrl?: string;
  isUploading: boolean;
  onSubmit: (fullName: string) => void;
  isLoading: boolean;
  onFileUpload?: (file: File) => void;
}) => {
  const user = useLoggedInUser();
  const [fullName, setFullName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userEmail = useLoggedInUserEmail();
  const avatarURL = getUserAvatarUrl({
    profileAvatarUrl,
    email: userEmail,
  });
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
            <AddUserIcon className=" w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Create new profile</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Please fill in your details.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(fullName);
            setFullName('');
          }}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Avatar</Label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex items-center space-x-2">
                  <MotionImage
                    animate={{
                      opacity: hasImageLoaded ? 1 : 0.8,
                    }}
                    transition={
                      hasImageLoaded
                        ? undefined
                        : {
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }
                    }
                    onLoadingComplete={() => {
                      setHasImageLoaded(true);
                    }}
                    onLoadStart={() => {
                      setHasImageLoaded(false);
                    }}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGg0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    loading="eager"
                    width={24}
                    height={24}
                    className="h-12 w-12 rounded-full"
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
                    id="file-input"
                    hidden
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Please wait...' : 'Change'}
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Name</Label>
              <input
                disabled={isLoading}
                className="mt-1.5 mb-8 shadow appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                type="text"
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="w-full"
              variant="default"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
