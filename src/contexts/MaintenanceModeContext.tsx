import { createContext, useContext } from 'react';

export const MaintenanceModeContext = createContext<boolean>(false);

export function useMaintenanceMode() {
  return useContext(MaintenanceModeContext);
}

export function MaintenanceModeContextProvider({
  children,
  isAppInMaintenanceMode,
}: {
  children: React.ReactNode;
  isAppInMaintenanceMode: boolean;
}) {
  return (
    <MaintenanceModeContext.Provider value={isAppInMaintenanceMode}>
      {children}
    </MaintenanceModeContext.Provider>
  );
}
