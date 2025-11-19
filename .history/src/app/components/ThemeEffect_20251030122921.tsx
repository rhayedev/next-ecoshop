'use client';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/stores';
import { useEffect } from 'react';

export default function ThemeEffect() {
  const theme = useSelector((state: RootState) => state.preferences.theme);

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  return null;
}