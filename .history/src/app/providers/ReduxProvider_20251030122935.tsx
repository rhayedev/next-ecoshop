'use client';
import { Provider } from 'react-redux';
import { store } from '../stores/stores';
import ThemeEffect from '../components/ThemeEffect';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}