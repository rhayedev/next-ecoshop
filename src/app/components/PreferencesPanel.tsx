'use client';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../stores/preferencesSlice';
import { setCurrency, toggleTheme, setPageSize } from '../stores/preferencesSlice';

export default function PreferencesPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const { currency, theme, pageSize } = useSelector((state: RootState) => state.preferences);

  return (
    <div className="p-4 border rounded-xl bg-gray-50 space-y-4 max-w-sm">
      <h2 className="text-lg font-semibold">⚙️ Préférences</h2>

      {/* Devise */}
      <div>
        <label className="block font-medium mb-1">Devise :</label>
        <select
          value={currency}
          onChange={(e) => dispatch(setCurrency(e.target.value as 'EUR' | 'USD'))}
          className="border p-1 rounded"
        >
          <option value="EUR">Euro (€)</option>
          <option value="USD">Dollar ($)</option>
        </select>
      </div>

      {/* Thème */}
      <div>
        <label className="block font-medium mb-1">Thème :</label>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Basculer en {theme === 'light' ? 'sombre' : 'clair'}
        </button>
        <p className="text-sm text-gray-600 mt-1">Thème actuel : {theme}</p>
      </div>

      {/* Taille de page */}
      <div>
        <label className="block font-medium mb-1">Produits par page :</label>
        <select
          value={pageSize}
          onChange={(e) => dispatch(setPageSize(Number(e.target.value) as 12 | 24 | 48))}
          className="border p-1 rounded"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
        </select>
      </div>
    </div>
  );
}
