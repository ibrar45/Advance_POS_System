import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [
    { name: 'Laptop', category: 'Electronics', price: 85000, stock: 8 },
    { name: 'Mouse', category: 'Electronics', price: 1500, stock: 3 }
  ];

  formVisible = false;
  isEditing = false;
  form: FormGroup;
  selectedIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  openForm(index?: number): void {
    this.formVisible = true;
    this.isEditing = index !== undefined;
    this.selectedIndex = index ?? null;

    if (this.isEditing && index !== undefined) {
      this.form.patchValue(this.products[index]);
    } else {
      this.form.reset();
    }
  }

  saveProduct(): void {
    if (this.form.valid) {
      const newProduct = this.form.value;

      if (this.isEditing && this.selectedIndex !== null) {
        this.products[this.selectedIndex] = newProduct;
      } else {
        this.products.push(newProduct);
      }

      this.formVisible = false;
      this.selectedIndex = null;
    }
  }

  deleteProduct(index: number): void {
    this.products.splice(index, 1);
  }

  closeForm(): void {
    this.formVisible = false;
    this.form.reset();
  }

  getStockClass(stock: number): string {
    return stock < 5 ? 'low-stock' : 'in-stock';
  }
}
