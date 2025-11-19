import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PreferencesState = {
  currency: 'EUR' | 'USD';
  theme: 'light' | 'dark';
  pageSize: number;
};

const initialState: PreferencesState = {
  currency: 'EUR',
  theme: 'light',
  pageSize: 10,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<'EUR' | 'USD'>) {
      state.currency = action.payload;
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
});

export const { setCurrency, setTheme, setPageSize } = preferencesSlice.actions;
export default preferencesSlice.reducer;