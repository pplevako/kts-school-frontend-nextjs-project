'use client';

import '@config/configureMobX';
import React, { createContext, useContext, useRef } from 'react';

import RootStore from './RootStore';

const StoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<RootStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = new RootStore();
  }
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};
