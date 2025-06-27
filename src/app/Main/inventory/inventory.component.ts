import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../Models/inventory.model';
// import { InventoryItem } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  showModal = false;
  selectedItem: InventoryItem | null = null;
  newStock: number = 0;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getAll().subscribe(data => {
      this.items = data.map(item => ({
        ...item,
        status: this.getStockStatus(item.stock)
      }));
    });
  }

  openModal(item: InventoryItem): void {
    this.selectedItem = { ...item };
    this.newStock = item.stock;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedItem = null;
  }

  updateStock(): void {
     console.log('Updating stock for:', this.selectedItem?.id, 'to', this.newStock);
    if (this.selectedItem?.id != null) {
      this.inventoryService.updateStock(this.selectedItem.id, this.newStock).subscribe(() => {
        this.loadInventory();
        this.closeModal();
      });
    }
  }

  getStockStatus(stock: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
    if (stock > 10) return 'In Stock';
    if (stock > 0) return 'Low Stock';
    return 'Out of Stock';
  }

  getStatusClass(status: string | undefined): string {
  return {
    'In Stock': 'status-green',
    'Low Stock': 'status-orange',
    'Out of Stock': 'status-red'
  }[status || ''] || '';
}

}
