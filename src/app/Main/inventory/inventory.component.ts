import { Component } from '@angular/core';

interface InventoryItem {
  name: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  items: InventoryItem[] = [
    { name: 'Laptop', stock: 20, status: 'In Stock' },
    { name: 'Mouse', stock: 3, status: 'Low Stock' },
    { name: 'Keyboard', stock: 0, status: 'Out of Stock' },
  ];

  showModal = false;
  selectedItem: InventoryItem | null = null;
  newStock: number = 0;

  openModal(item: InventoryItem) {
    this.selectedItem = { ...item };
    this.newStock = item.stock;
    this.showModal = true;
  }

  updateStock() {
    if (this.selectedItem) {
      const index = this.items.findIndex(i => i.name === this.selectedItem!.name);
      this.items[index].stock = this.newStock;
      this.items[index].status =
        this.newStock === 0 ? 'Out of Stock' :
        this.newStock < 5 ? 'Low Stock' :
        'In Stock';

      this.showModal = false;
      alert('Stock updated successfully! ✅');
    }
  }

  closeModal() {
    this.showModal = false;
  }

  getStatusClass(status: string): string {
    return {
      'In Stock': 'green',
      'Low Stock': 'orange',
      'Out of Stock': 'red'
    }[status] || '';
  }
}
