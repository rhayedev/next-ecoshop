'use client';
import { useEffect } from 'react';

export default function AxeReporter() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      import('@axe-core/react').then(({ default: axe }) => {
        // @ts-expect-error axe-core expects React/ReactDOM globals
        axe(React, ReactDOM, 1000);
      }).catch(() => {});
    }
  }, []);
  return null;
}