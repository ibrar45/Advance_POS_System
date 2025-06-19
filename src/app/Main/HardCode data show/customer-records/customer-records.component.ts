import { Component } from '@angular/core';

interface Customer {
  name: string;
  phone: string;
  email: string;
  totalSale?: number;
  ranking?: string;
}

@Component({
  selector: 'app-customer-records',
  templateUrl: './customer-records.component.html',
  styleUrls: ['./customer-records.component.css']
})
export class CustomerRecordsComponent {
  searchText = '';
  customers: Customer[] = [
    { name: 'Ali Raza', phone: '03001234567', email: 'ali@example.com', totalSale: 25000, ranking: 'Gold' },
    { name: 'Fatima Khan', phone: '03009876543', email: 'fatima@example.com', totalSale: 18000, ranking: 'Silver' }
  ];

  showForm = false;
  showViewMode = false;
  editMode = false;
  selectedCustomer: Customer | null = null;
  form: Customer = { name: '', phone: '', email: '', totalSale: 0, ranking: '' };
  editIndex: number | null = null;

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  filteredCustomers() {
    return this.customers.filter(c =>
      c.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.phone.includes(this.searchText)
    );
  }

  openCustomerForm() {
    this.showForm = true;
    this.editMode = false;
    this.form = { name: '', phone: '', email: '', totalSale: 0, ranking: '' };
  }

  editCustomer(customer: Customer) {
    this.editMode = true;
    this.showForm = true;
    this.form = { ...customer };
    this.editIndex = this.customers.indexOf(customer);
  }

  deleteCustomer(customer: Customer) {
    const index = this.customers.indexOf(customer);
    if (index !== -1) this.customers.splice(index, 1);
  }

  saveCustomer() {
    if (this.editMode && this.editIndex !== null) {
      this.customers[this.editIndex] = { ...this.form };
    } else {
      this.customers.push({ ...this.form });
    }
    this.closeForm();
  }

  closeForm() {
    this.showForm = false;
    this.editMode = false;
    this.editIndex = null;
  }

  showView(customer: Customer) {
    this.selectedCustomer = customer;
    this.showViewMode = true;
  }

  closeView() {
    this.showViewMode = false;
    this.selectedCustomer = null;
  }
}
