import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../Models/customer.model';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit {
  customers: Customer[] = [];
  searchText: string = '';
  showForm: boolean = false;
  showViewModal: boolean = false;
  editMode: boolean = false;
  form: Customer = { customerId: 0, name: '', phone: '', email: '' };
  selectedCustomer: Customer | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.customers = data,
      error: () => alert("Failed to load customers")
    });
  }

  filteredCustomers(): Customer[] {
    const lower = this.searchText.toLowerCase();
    return this.customers.filter(c =>
      c.name.toLowerCase().includes(lower) || c.phone.includes(lower)
    );
  }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }

  openCustomerForm(): void {
    this.editMode = false;
    this.form = { customerId: 0, name: '', phone: '', email: '' };
    this.showForm = true;
  }

  editCustomer(customer: Customer): void {
    this.editMode = true;
    this.form = { ...customer };
    this.showForm = true;
  }

  saveCustomer(): void {
    if (this.editMode && this.form.customerId !== undefined) {
      this.customerService.updateCustomer(this.form.customerId, this.form).subscribe({
        next: () => {
          this.fetchCustomers();
          this.closeForm();
        },
        error: () => alert("Update failed")
      });
    } else {
      this.customerService.addCustomer(this.form).subscribe({
        next: () => {
          this.fetchCustomers();
          this.closeForm();
        },
        error: () => alert("Add failed")
      });
    }
  }

  deleteCustomer(customer: Customer): void {
    if (!customer.customerId) return alert('Invalid customer ID');
    if (confirm(`Delete ${customer.name}?`)) {
      this.customerService.deleteCustomer(customer.customerId).subscribe({
        next: () => this.fetchCustomers(),
        error: () => alert("Delete failed")
      });
    }
  }

  viewHistory(customer: Customer): void {
    this.selectedCustomer = customer;
    this.showViewModal = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  closeView(): void {
    this.showViewModal = false;
    this.selectedCustomer = null;
  }
}
