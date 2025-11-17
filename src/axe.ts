export async function initAxe() {
  if (process.env.NODE_ENV === 'production') return;
  if (typeof window === 'undefined') return;

  try {
    const [{ default: axe }] = await Promise.all([import('@axe-core/react')]);
    console.warn(
      'react-axe est chargé mais peut échouer sur React 18 + Turbopack.'
    );
  } catch (err) {
    console.error('Erreur lors de l’init d’axe :', err);
  }
}
