'use client';
import React from 'react';
import { MaintenanceModeContextProvider } from '@/contexts/MaintenanceModeContext';

/**
 * This is a wrapper for the app that provides the supabase client, the router event wrapper
 * the react-query client, supabase listener, and the navigation progress bar.
 *
 * The listener is used to listen for changes to the user's session and update the UI accordingly.
 */
export function DynamicLayoutProviders({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  isAppInMaintenanceMode,
}: {
  children: React.ReactNode;
  isAppInMaintenanceMode: boolean;
}) {
  return (
    <MaintenanceModeContextProvider
      isAppInMaintenanceMode={isAppInMaintenanceMode}
    >
      {children}
    </MaintenanceModeContextProvider>
  );
}
