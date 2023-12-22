'use client';

import { MaintenanceModeBanner } from '@/components/presentational/tailwind/MaintenanceModeBanner';
import { useState } from 'react';
import { useWindowSize } from 'rooks';
import { UserOnboardingFlow } from './UserOnboardingFlow';
import ReactNoSSR from 'react-no-ssr';
import Confetti from 'react-confetti';
import { Table } from '@/types';
import PostHogProvider from '@/contexts/PostHogProvider';

export function ClientLayout({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile: Table<'user_profiles'>;
}) {
  const { innerHeight: _innerHeight, innerWidth: _innerWidth } =
    useWindowSize();
  const innerHeight = _innerHeight ?? 0;
  const innerWidth = _innerWidth ?? 0;

  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  if (!userProfile.full_name) {
    return (
      <UserOnboardingFlow
        onSuccess={() => {
          setShowConfetti(true);
        }}
        userProfile={userProfile}
      />
    );
  }

  return (
    <PostHogProvider>
      <div className="flex overflow-y-auto flex-col h-full w-full">
        <MaintenanceModeBanner />
        <div className="flex h-full">
          <div className="flex-1 h-auto overflow-auto">
            <div className="space-y-10">{children}</div>
          </div>
          <ReactNoSSR>
            {showConfetti ? (
              <Confetti
                confettiSource={{
                  x: innerWidth / 2,
                  y: innerHeight / 3,
                  w: 0,
                  h: 0,
                }}
                numberOfPieces={150}
                gravity={0.1}
                initialVelocityY={20}
                initialVelocityX={20}
                recycle={false}
                tweenDuration={1000}
                run={true}
                width={innerWidth}
                height={innerHeight}
              />
            ) : null}{' '}
          </ReactNoSSR>
        </div>
      </div>
    </PostHogProvider>
  );
}
