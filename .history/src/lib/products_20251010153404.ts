export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string; // ← AJOUTE cette ligne
};

const DB: Product[] = [
  { id: "1", name: "Clavier Mécanique", price: 99, image: "/images/clavier.jpg", description: "Un clavier mécanique confortable et durable." },
  { id: "2", name: "Souris Ergonomique", price: 59, image: "/images/souris.jpg", description: "Souris conçue pour le confort et la précision." },
  { id: "3", name: "Écouteurs Sans Fil", price: 79, image: "/images/ecouteurs.jpg", description: "Écouteurs Bluetooth avec une grande autonomie." },
  { id: "4", name: "Tapis de Souris XXL", price: 29, image: "/images/tapis.jpg", description: "Tapis de souris extra large pour plus de confort." },
  { id: "5", name: "Webcam HD", price: 89, image: "/images/webcam.jpg", description: "Webcam haute définition pour vos visioconférences." },
  { id: "6", name: "Support PC Portable", price: 49, image: "/images/support.jpg", description: "Support réglable pour ordinateur portable." },
  { id: "7", name: "Lampe de Bureau LED", price: 39, image: "/images/lampe.jpg", description: "Lampe LED économique et orientable." },
  { id: "8", name: "Hub USB-C 7-en-1", price: 69, image: "/images/hub.jpg", description: "Hub USB-C multifonction pour tous vos appareils." }
];

export const Products = {
  list: (): Product[] => DB,
  get: (id: string): Product | undefined => DB.find(p => p.id === id),
};