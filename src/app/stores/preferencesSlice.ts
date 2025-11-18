'use client';
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

export type Preferences = {
  currency: 'EUR' | 'USD';
  theme: 'light' | 'dark';
  pageSize: 12 | 24 | 48;
};

const initialState: Preferences = {
  currency: 'EUR',
  theme: 'light',
  pageSize: 12,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Preferences['currency']>) => {
      state.currency = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setPageSize: (state, action: PayloadAction<Preferences['pageSize']>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { setCurrency, toggleTheme, setPageSize } = preferencesSlice.actions;

export const store = configureStore({
  reducer: {
    preferences: preferencesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
