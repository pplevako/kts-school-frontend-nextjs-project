'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { AuthState } from '@/stores/AuthStore';
import RootStore from '@/stores/RootStore';

const StoreContext = createContext<RootStore | null>(null);

type StoreProviderProps = {
  children: ReactNode;
  initialAuth?: AuthState;
};

export function StoreProvider({ children, initialAuth }: StoreProviderProps) {
  const [store] = useState(() => new RootStore());

  useEffect(() => {
    if (initialAuth) {
      store.authStore.hydrate(initialAuth);
    }
  }, [store, initialAuth]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): RootStore {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return store;
}
