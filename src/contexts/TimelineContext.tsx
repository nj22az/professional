import React, { createContext, useContext, useState } from 'react';

interface TimelineContextType {
  selectedPeriod: string | null;
  setSelectedPeriod: (period: string | null) => void;
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  return (
    <TimelineContext.Provider value={{ selectedPeriod, setSelectedPeriod }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
}; 