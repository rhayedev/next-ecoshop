export type Product = { id: string; name: string; price: number };

const DB: Product[] = [
  { id: "1", name: "Clavier Mécanique", price: 99 },
  { id: "2", name: "Souris Ergonomique", price: 59 },
];

export const Products = {
    list: (): Product[] => DB,
    get: (id: string): Product | undefined => DB.find(p => p.id === id),
};