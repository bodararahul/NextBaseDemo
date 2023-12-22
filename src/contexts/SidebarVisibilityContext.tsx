'use client';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type SidebarVisibilityContextType = {
  isVisible: boolean;
  toggleVisibility: () => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
};

export const SidebarVisibilityContext = createContext(
  {} as SidebarVisibilityContextType,
);

export const SidebarVisibilityProvider = ({
  children,
  initialValue = true,
}: {
  children: React.ReactNode;
  initialValue?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialValue);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SidebarVisibilityContext.Provider
      value={{ isVisible, toggleVisibility, setVisibility: setIsVisible }}
    >
      {children}
    </SidebarVisibilityContext.Provider>
  );
};
