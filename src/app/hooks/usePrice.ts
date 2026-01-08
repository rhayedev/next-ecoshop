export const usePrice = (price: number, currency: 'EUR' | 'USD' = 'EUR'): string => {
  if (price == null || isNaN(price)) return `0.00 ${currency}`;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(price);
};
