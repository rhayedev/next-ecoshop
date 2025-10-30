export async function fetchCategories() {
  // Simule une API
  return Promise.resolve([
    { id: '1', name: 'Périphériques' },
    { id: '2', name: 'Accessoires' },
    { id: '3', name: 'Textile' },
  ]);
}