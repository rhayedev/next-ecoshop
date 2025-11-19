"use client"; // <--- indispensable pour Redux hooks

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { setCurrency, setTheme, setPageSize } from "@/store/preferencesSlice";

export default function PreferencesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { currency, theme, pageSize } = useSelector(
    (state: RootState) => state.preferences
  );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Préférences utilisateur</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Devise :</label>
        <select
          value={currency}
          onChange={(e) => dispatch(setCurrency(e.target.value as "EUR" | "USD"))}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="EUR">EUR (€)</option>
          <option value="USD">USD ($)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Thème :</label>
        <select
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value as "light" | "dark"))}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Taille de page :</label>
        <input
          type="number"
          value={pageSize}
          onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
          className="border rounded px-2 py-1 w-full"
          min={5}
          max={100}
        />
      </div>

      <div className="bg-gray-100 rounded p-3 mt-6">
        <p>
          <strong>Devise :</strong> {currency}
        </p>
        <p>
          <strong>Thème :</strong> {theme}
        </p>
        <p>
          <strong>Taille de page :</strong> {pageSize}
        </p>
      </div>
    </div>
  );
}
