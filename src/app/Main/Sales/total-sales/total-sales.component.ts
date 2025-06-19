import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}
interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.css']
})
export class TotalSalesComponent {
  searchText = '';
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 80000 },
    { id: 2, name: 'Mouse', price: 2000 },
    { id: 3, name: 'Keyboard', price: 4000 }
  ];
  cart: CartItem[] = [];

  get filteredProducts(): Product[] {
    if (!this.searchText.trim()) return [];
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get subtotal(): number {
    return this.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  }
  get tax(): number {
    return +(this.subtotal * 0.05).toFixed(2);
  }
  get total(): number {
    return this.subtotal + this.tax;
  }

  addToCart(product: Product): void {
    const existing = this.cart.find(c => c.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.searchText = '';
  }

  increaseQty(item: CartItem): void {
    item.quantity++;
  }

  decreaseQty(item: CartItem): void {
    item.quantity--;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter(c => c !== item);
    }
  }

  checkout(): void {
    alert(`Paid Rs. ${this.total}. Thank you!`);
    this.cart = [];
  }
}
