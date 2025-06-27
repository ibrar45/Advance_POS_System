export interface SaleItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface SaleRequest {
  date: string;
  subtotal: number;
  tax: number;
  total: number;
  items: SaleItem[];
}
