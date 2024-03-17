import React, { createContext, useContext, ReactNode, useState } from 'react';
import { STAGE_ITEMS } from '../constants';

export type StageItemType = typeof STAGE_ITEMS[keyof typeof STAGE_ITEMS];

interface StageContextProps {
  currentStage: StageItemType;
  setStage: (newStage: StageItemType) => void;
}

const StageContext = createContext<StageContextProps | undefined>(undefined);

interface StageProviderProps {
  children: ReactNode;
}

export const StageProvider: React.FC<StageProviderProps> = ({ children }) => {
  const [currentStage, setCurrentStage] = useState<StageItemType>(STAGE_ITEMS.TAKE_IMAGE);

  const setStage = (newStage: StageItemType) => {
    setCurrentStage(newStage);
  };

  return (
    <StageContext.Provider value={{ currentStage, setStage }}>
      {children}
    </StageContext.Provider>
  );
};

export const useCurrentStage = (): StageItemType => {
  const context = useContext(StageContext);

  if (!context) {
    throw new Error('useCurrentStage must be used within a StageProvider');
  }

  return context.currentStage;
};

export const useSetStage = (): ((newStage: StageItemType) => void) => {
  const context = useContext(StageContext);

  if (!context) {
    throw new Error('useSetStage must be used within a StageProvider');
  }

  return context.setStage;
};