'use client';
import { MaintenanceModeContext } from '@/contexts/MaintenanceModeContext';
import WrenchIcon from 'lucide-react/dist/esm/icons/wrench';
import { useContext } from 'react';
export function MaintenanceModeBanner() {
  const isAppInMaintenanceMode = useContext(MaintenanceModeContext);

  if (!isAppInMaintenanceMode) {
    return null;
  }
  return (
    <div className="flex-auto flex-grow-0 select-none bg-purple-500 text-white px-10 p-3 text-lg text-center flex items-center space-x-4 justify-center">
      <WrenchIcon className="text-white" />
      <span className="font-[600]">
        The App is currently in maintenance mode and is read-only. Please check
        back later.
      </span>
      <WrenchIcon className="text-white" />
    </div>
  );
}
