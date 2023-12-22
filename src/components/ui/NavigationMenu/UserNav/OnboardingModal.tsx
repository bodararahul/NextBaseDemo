'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/Dialog';
import { ReactNode, useState } from 'react';
import GuideIcon from 'lucide-react/dist/esm/icons/help-circle';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { cn } from '@/utils/cn';

type OnboardingFeature = {
  title: string;
  description: ReactNode;
  image: string;
};

export function OnboardingModal({
  featureList,
}: {
  featureList: OnboardingFeature[];
}) {
  const [open, setOpen] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const handleNext = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % featureList.length);
  };

  const handlePrevious = () => {
    setCurrentFeatureIndex(
      (prevIndex) => (prevIndex - 1 + featureList.length) % featureList.length,
    );
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentFeatureIndex(0);
  };

  const currentFeature = featureList[currentFeatureIndex];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            'hover:bg-gray-100 hover:text-gray-900 cursor-pointer text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
            'flex px-3 gap-2 items-center py-2 text-sm',
          )}
        >
          <GuideIcon />
          Help
        </div>
      </DialogTrigger>
      <DialogContent className="p-8">
        <div className="object-fit ">
          <p className="text-base text-muted-foreground font-bold mb-4">
            {currentFeatureIndex + 1} / {featureList.length}
          </p>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={currentFeature.image}
              alt="feature"
              className="rounded-lg object-cover border"
              layout="fill"
            />
          </AspectRatio>
          <p className=" mt-6 text-2xl font-bold">{currentFeature.title}</p>
          <div className="mt-2 text-base text-muted-foreground">
            {currentFeature.description}
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          {currentFeatureIndex !== 0 ? (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          ) : null}
          {currentFeatureIndex < featureList.length - 1 ? (
            <Button variant="default" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="default" onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
