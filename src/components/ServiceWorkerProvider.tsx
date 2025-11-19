'use client';

import { useEffect } from 'react';

export default function ServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => console.error('SW registration failed:', err));
    }
  }, []);

  return <>{children}</>;
}
