export async function fetchCategories() {
  // Simule une API
  return Promise.resolve([
    { id: '1', name: 'Vélos' },
    { id: '2', name: 'Accessoires' },
    { id: '3', name: 'Textile' },
  ]);
}