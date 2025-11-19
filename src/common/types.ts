export type Product = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
};

export type FakeStoreItem = {
	id: number;
	title: string;
	price: number;
};
