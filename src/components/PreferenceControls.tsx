'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCurrency, toggleTheme, setPageSize } from '@/app/stores/preferencesSlice';

export default function PreferencesControls() {
    const prefs = useSelector((s: RootState) => s.preferences);
    const dispatch = useDispatch();

    return (
        <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
            <h2 className="font-semibold">⚙️ Préférences</h2>

            <div>
                <label>Devise : </label>
                <select
                    value={prefs.currency}
                    onChange={(e) => dispatch(setCurrency(e.target.value as any))}
                >
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>
            </div>

            <div>
                <label>Thème : </label>
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="ml-2 px-3 py-1 bg-gray-200 rounded"
                >
                    {prefs.theme === 'light' ? '☀️' : '🌙'}
                </button>
            </div>

            <div>
                <label>Taille page : </label>
                <select
                    value={prefs.pageSize}
                    onChange={(e) => dispatch(setPageSize(Number(e.target.value) as any))}
                >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                </select>
            </div>
        </div>
    );
}
