import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  formVisible = false;
  isEditing = false;
  form: FormGroup;
  selectedProductId: number | undefined;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  openForm(product?: Product): void {
    this.formVisible = true;
    this.isEditing = !!product;

    if (product) {
      this.selectedProductId = product.id;
      this.form.patchValue(product);
    } else {
      this.selectedProductId = undefined;
      this.form.reset();
    }
  }

 saveProduct(): void {
  if (this.form.valid) {
    const formData = { ...this.form.value };

    if (this.isEditing && this.selectedProductId !== undefined) {
      formData.id = this.selectedProductId; // ✅ Add id to the body
      this.productService.updateProduct(this.selectedProductId, formData).subscribe(() => {
        this.loadProducts();
        this.formVisible = false;
        this.selectedProductId = undefined;
      });
    } else {
      this.productService.addProduct(formData).subscribe(added => {
        this.products.push(added);
        this.formVisible = false;
      });
    }
  }
}


  deleteProduct(product: Product): void {
    if (product.id !== undefined) {
      this.productService.deleteProduct(product.id).subscribe(() => {
        this.products = this.products.filter(p => p !== product);
      });
    }
  }

  closeForm(): void {
    this.formVisible = false;
    this.form.reset();
    this.selectedProductId = undefined;
  }

  getStockClass(stock: number): string {
    return stock < 5 ? 'low-stock' : 'in-stock';
  }
}
