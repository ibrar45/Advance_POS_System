import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product { id: number; name: string; price: number; }
interface Employee { employeeId: number; name: string; }
interface CartItem extends Product { quantity: number; }

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.css']
})
export class TotalSalesComponent implements OnInit {
  searchText = '';
  products: Product[] = [];
  employees: Employee[] = [];
  cart: CartItem[] = [];
  selectedEmployeeId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchEmployees();
  }

  fetchProducts() {
    this.http.get<Product[]>('https://localhost:5001/api/Product').subscribe(data => {
      this.products = data;
    });
  }

  fetchEmployees() {
    this.http.get<Employee[]>('http://localhost:5000/api/employee').subscribe(data => {
      this.employees = data;
    });
  }

  get filteredProducts(): Product[] {
    return this.searchText.trim()
      ? this.products.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()))
      : [];
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
    existing ? existing.quantity++ : this.cart.push({ ...product, quantity: 1 });
    this.searchText = '';
  }

  increaseQty(item: CartItem): void {
    item.quantity++;
  }

  decreaseQty(item: CartItem): void {
    item.quantity--;
    if (item.quantity <= 0) this.cart = this.cart.filter(c => c !== item);
  }

  checkout(): void {
    if (!this.selectedEmployeeId || this.cart.length === 0) return;

    const sale = {
      employeeId: this.selectedEmployeeId,
      saleDate: new Date().toISOString(),
      totalAmount: this.total,
      saleDetails: this.cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.http.post('http://localhost:5000/api/sales', sale).subscribe({
      next: () => {
        alert('Sale successful!');
        this.cart = [];
        this.selectedEmployeeId = null;
      },
      error: (err) => {
        console.error(err);
        alert('Sale failed!');
      }
    });
  }
}
