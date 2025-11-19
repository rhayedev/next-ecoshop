'use client';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../stores/stores';
import { setCurrency, setTheme, setPageSize } from '../stores/preferencesSlice';

export default function PreferencesControls() {
  const dispatch = useDispatch();
  const { currency, theme, pageSize } = useSelector((state: RootState) => state.preferences);

  return (
    <section style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
      <h3>Préférences</h3>
      <div>
        <label>Devise : </label>
        <select value={currency} onChange={e => dispatch(setCurrency(e.target.value as 'EUR' | 'USD'))}>
          <option value="EUR">Euro (€)</option>
          <option value="USD">Dollar ($)</option>
        </select>
      </div>
      <div>
        <label>Thème : </label>
        <select value={theme} onChange={e => dispatch(setTheme(e.target.value as 'light' | 'dark'))}>
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
        </select>
      </div>
      <div>
        <label>Produits par page : </label>
        <input
          type="number"
          min={1}
          max={100}
          value={pageSize}
          onChange={e => dispatch(setPageSize(Number(e.target.value)))}
          style={{ width: 60 }}
        />
      </div>
    </section>
  );
}