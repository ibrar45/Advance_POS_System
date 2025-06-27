export interface InventoryItem {
  id?: number;
  name: string;
  stock: number;
  status?: 'In Stock' | 'Low Stock' | 'Out of Stock';
}
