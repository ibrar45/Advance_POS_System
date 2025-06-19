import { Component } from '@angular/core';

interface Customer {
  name: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent {
  searchText = '';
  customers: Customer[] = [
    { name: 'Ali Raza', phone: '03001234567', email: 'ali@example.com' },
    { name: 'Fatima Khan', phone: '03009876543', email: 'fatima@example.com' }
  ];

  showForm = false;
  editMode = false;
  form: Customer = { name: '', phone: '', email: '' };
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
    this.form = { name: '', phone: '', email: '' };
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

  viewHistory(customer: Customer) {
    alert(`Purchase history for ${customer.name} will be shown here.`);
  }
}
