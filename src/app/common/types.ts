export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Priced extends Product {
  currency: "EUR" | "USD";
}

export type ID = string | number;
export type Nullable<T> = T | null;
export type ProductPreview = Pick<Product, "id" | "name">;
