'use client';

import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './preferencesSlice';
import { initAxe } from '../../axe';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAxe().catch((err) => {
      console.error('Erreur lors de l’init d’axe :', err);
    });
  }, []);

  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}