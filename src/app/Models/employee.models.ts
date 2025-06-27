export interface Employee {
  employeeId: number;
  name: string;
  role: 'Admin' | 'Cashier';
  totalSales?: number; // used for performance
}
