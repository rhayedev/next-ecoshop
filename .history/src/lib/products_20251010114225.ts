export type Product = { id: string; name: string; price: number; image: string };

const DB: Product[] = [
  { id: "1", name: "Clavier Mécanique", price: 99, image: "/images/clavier.jpg" },
  { id: "2", name: "Souris Ergonomique", price: 59, image: "/images/souris.jpg" },
  { id: "3", name: "Écouteurs Sans Fil", price: 79, image: "/images/ecouteurs.jpg" },
  { id: "4", name: "Tapis de Souris XXL", price: 29, image: "/images/tapis.jpg" },
  { id: "5", name: "Webcam HD", price: 89, image: "/images/webcam.jpg" },
  { id: "6", name: "Support PC Portable", price: 49, image: "/images/support.jpg" },
  { id: "7", name: "Lampe de Bureau LED", price: 39, image: "/images/lampe.jpg" },
  { id: "8", name: "Hub USB-C 7-en-1", price: 69, image: "/images/hub.jpg" },
];

export const Products = {
    list: (): Product[] => DB,
    get: (id: string): Product | undefined => DB.find(p => p.id === id),
};