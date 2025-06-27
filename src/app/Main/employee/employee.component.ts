import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeList: Employee[] = [];
  newEmployee: Employee = { employeeId: 0, name: '', role: 'Admin' };

  showAddModal = false;
  editing = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe(data => this.employeeList = data);
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.editing = false;
    this.newEmployee = { employeeId: 0, name: '', role: 'Admin' };
  }

  editStaff(staff: Employee): void {
    this.showAddModal = true;
    this.editing = true;
    this.newEmployee = { ...staff }; // clone to avoid binding issues
  }

  confirmAddEmployee(): void {
    this.employeeService.add(this.newEmployee).subscribe(() => {
      this.loadEmployees();
      this.showAddModal = false;
    });
  }

  updateEmployee(): void {
     console.log('Update called', this.newEmployee);
    if (!this.newEmployee.employeeId) return;

    this.employeeService.updateEmployee(this.newEmployee.employeeId!, this.newEmployee).subscribe(() => {
  this.loadEmployees();
  this.cancelEdit();
});

  }

  removeStaff(staff: Employee): void {
    if (staff.employeeId) {
      this.employeeService.delete(staff.employeeId).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  cancelEdit(): void {
    this.showAddModal = false;
    this.newEmployee = { employeeId: 0, name: '', role: 'Admin' };
  }

  calculatePerformance(name: string): number {
    const sales = 10  ; // replace with actual logic
    return sales;
  }
}
