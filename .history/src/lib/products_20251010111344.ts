export type Product = { id: string; name: string; price: number };

const DB: Product[] = [
  { id: "1", name: "Clavier Mécanique", price: 99 },
  { id: "2", name: "Souris Ergonomique", price: 59 },
  { id: "3", name: "Écouteurs Sans Fil", price: 79 },
  { id: "4", name: "Tapis de Souris XXL", price: 29 },
  { id: "5", name: "Webcam HD", price: 89 },
  { id: "6", name: "Support PC Portable", price: 49 },
  { id: "7", name: "Lampe de Bureau LED", price: 39 },
  { id: "8", name: "Hub USB-C 7-en-1", price: 69 },
];

export const Products = {
    list: (): Product[] => DB,
    get: (id: string): Product | undefined => DB.find(p => p.id === id),
};