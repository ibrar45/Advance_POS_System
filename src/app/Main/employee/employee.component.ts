import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  showAddModal: boolean = false;
  editing: boolean = false;

  employeeList = [
    { name: 'Ali', role: 'Admin' },
    { name: 'Fatima', role: 'Cashier' },
    { name: 'Ahmed', role: 'Cashier' }
  ];

  employeeSales = [
    { name: 'Ali', sales: 120 },
    { name: 'Fatima', sales: 60 },
    { name: 'Ahmed', sales: 30 }
  ];

  // newEmployee is reused for both adding and editing
  newEmployee = { name: '', role: 'Cashier' };
  editIndex: number = -1;

  // Open modal for new employee
  openAddModal(): void {
    this.newEmployee = { name: '', role: 'Cashier' };
    this.editing = false;
    this.showAddModal = true;
  }

  // Add new employee
  confirmAddEmployee(): void {
    this.employeeList.push({ ...this.newEmployee });
    this.employeeSales.push({ name: this.newEmployee.name, sales: 0 });
    this.showAddModal = false;
  }

  // Start editing an employee
  editStaff(staff: any): void {
    this.editIndex = this.employeeList.findIndex(e => e.name === staff.name);
    this.newEmployee = { ...staff };
    this.editing = true;
    this.showAddModal = true;
  }

  // Confirm editing
  updateEmployee(): void {
    if (this.editIndex !== -1) {
      const oldName = this.employeeList[this.editIndex].name;
      this.employeeList[this.editIndex] = { ...this.newEmployee };

      // Update corresponding sales record
      const salesIndex = this.employeeSales.findIndex(s => s.name === oldName);
      if (salesIndex !== -1) {
        this.employeeSales[salesIndex].name = this.newEmployee.name;
      }
    }
    this.cancelEdit();
  }

  // Cancel and close modal
  cancelEdit(): void {
    this.showAddModal = false;
    this.editing = false;
    this.newEmployee = { name: '', role: 'Cashier' };
    this.editIndex = -1;
  }

  // Delete employee
  removeStaff(staff: any): void {
    this.employeeList = this.employeeList.filter(e => e !== staff);
    this.employeeSales = this.employeeSales.filter(s => s.name !== staff.name);
  }

  // Get performance based on max sales
  calculatePerformance(name: string): number {
    const empSales = this.employeeSales.find(e => e.name === name)?.sales || 0;
    const maxSales = Math.max(...this.employeeSales.map(e => e.sales), 1);
    return Math.round((empSales / maxSales) * 100);
  }
}
