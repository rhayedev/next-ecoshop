export type Product = { id: string; name: string; price: number };

const DB: Product[] = [
    { id: "1", name: "Clavier Mécanique", price: 99 },
    { id: "2", name: "Souris Ergonomique", price: 59 },
    { id: "3", name: "Souris Ergonomique", price: 59 },
    { id: "4", name: "Souris Ergonomique", price: 59 },
    { id: "5", name: "Souris Ergonomique", price: 59 },
    { id: "6", name: "Souris Ergonomique", price: 59 },
    { id: "7", name: "Souris Ergonomique", price: 59 },
    { id: "8", name: "Souris Ergonomique", price: 59 },
    { id: "9", name: "Souris Ergonomique", price: 59 },
    { id: "10", name: "Souris Ergonomique", price: 59 },
    { id: "11", name: "Souris Ergonomique", price: 59 },
    { id: "12", name: "Souris Ergonomique", price: 59 },
    { id: "13", name: "Souris Ergonomique", price: 59 },
    { id: "14", name: "Souris Ergonomique", price: 59 },
    { id: "15", name: "Souris Ergonomique", price: 59 },
    { id: "16", name: "Souris Ergonomique", price: 59 },
    { id: "17", name: "Souris Ergonomique", price: 59 },
];

export const Products = {
    list: (): Product[] => DB,
    get: (id: string): Product | undefined => DB.find((p) => p.id === id),
};
