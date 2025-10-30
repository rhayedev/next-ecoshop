export async function fetchCategories() {
  // Simule une API
  return Promise.resolve([
    { id: '1', name: 'Périphériques' },
    { id: '2', name: 'Audio & Vidéo' },
    { id: '3', name: 'Accessoires PC' },
  ]);
}