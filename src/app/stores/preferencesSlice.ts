'use client';
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

type Preferences = {
    currency: 'EUR' | 'USD';
    theme: 'light' | 'dark';
    pageSize: 12 | 24 | 48;
};

const initialState: Preferences = { currency: 'EUR', theme: 'light', pageSize: 12 };

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        setCurrency: (s, a: PayloadAction<Preferences['currency']>) => { s.currency = a.payload; },
        toggleTheme: (s) => { s.theme = s.theme === 'light' ? 'dark' : 'light'; },
        setPageSize: (s, a: PayloadAction<Preferences['pageSize']>) => { s.pageSize = a.payload; },
    },
});

export const { setCurrency, toggleTheme, setPageSize } = preferencesSlice.actions;

export const store = configureStore({ reducer: { preferences: preferencesSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
