// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { HttpClient, HttpParams } from '@angular/common/http';

// @Component({
//   selector: 'app-report',
//   templateUrl: './report.component.html',
//   styleUrls: ['./report.component.css']
// })
// export class ReportComponent implements OnInit {
//   reportForm: FormGroup;
//   sales: any[] = [];

//   totalRevenue: number = 0;
//   totalItemsSold: number = 0;
//   topProduct: string = '';

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.reportForm = this.fb.group({
//       startDate: [''],
//       endDate: [''],
//       product: [''],
//       employee: ['']
//     });
//   }

//   ngOnInit() {
//     this.fetchReportSummary();
//     this.fetchSalesData(); // Load all data by default
//   }

//   fetchReportSummary() {
//     this.http.get<number>('http://localhost:5000/api/Report/totalsales').subscribe({
//       next: (data) => this.totalRevenue = data,
//       error: () => this.totalRevenue = 0
//     });

//     this.http.get<number>('http://localhost:5000/api/Report/totalSoldItems').subscribe({
//       next: (data) => this.totalItemsSold = data,
//       error: () => this.totalItemsSold = 0
//     });

//     this.http.get<string>('http://localhost:5000/api/Report/topSelling').subscribe({
//       next: (data) => this.topProduct = data,
//       error: () => this.topProduct = 'N/A'
//     });
//   }

//   fetchSalesData() {
//     const { startDate, endDate } = this.reportForm.value;

//     let params = new HttpParams();
//     if (startDate) params = params.set('start', startDate);
//     if (endDate) params = params.set('end', endDate);

//     this.http.get<any[]>('http://localhost:5000/api/Report/sales-by-date', { params }).subscribe({
//       next: (data) => this.sales = data,
//       error: () => this.sales = []
//     });
//   }

//   applyFilter() {
//     this.fetchSalesData();
//   }

//   export(format: string) {
//     alert(`Exporting as ${format}...`);
//     // Placeholder logic
//   }

//   print() {
//     window.print();
//   }

//   encode(data: string): string {
//   return encodeURIComponent(data);
// }

//   generateChartConfig(): string {
//   const labels = this.sales.map(s => s.product);
//   const data = this.sales.map(s => s.total);
//   return JSON.stringify({
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [{ label: 'Sales', data: data }]
//     }
//   });
// }}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportForm: FormGroup;
  sales: any[] = [];
  products: string[] = [];
  employees: string[] = [];

  totalRevenue = 0;
  totalItemsSold = 0;
  topProduct = 'N/A';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.reportForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      product: [''],
      employee: ['']
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
    this.fetchSalesReport();
  }

  loadDropdownData(): void {
    this.http.get<any[]>('http://localhost:5000/api/Product').subscribe(data => {
      this.products = data.map(p => p.name);
    });

    this.http.get<any[]>('http://localhost:5000/api/Employee').subscribe(data => {
      this.employees = data.map(e => e.name);
    });
  }

  fetchSalesReport(): void {
    this.http.get<any[]>('http://localhost:5000/api/Sales').subscribe(data => {
      this.sales = data;
      this.calculateSummary();
    }, error => {
      console.error('Sales fetch failed', error);
    });
  }

  calculateSummary(): void {
    this.totalRevenue = this.sales.reduce((sum, s) => sum + s.total, 0);
    this.totalItemsSold = this.sales.reduce((sum, s) => sum + s.quantity, 0);
    const productTotals: { [key: string]: number } = {};

    for (const s of this.sales) {
      productTotals[s.product] = (productTotals[s.product] || 0) + s.quantity;
    }

    const top = Object.entries(productTotals).sort((a, b) => b[1] - a[1])[0];
    this.topProduct = top ? top[0] : 'N/A';
  }

  applyFilter(): void {
    const { startDate, endDate, product, employee } = this.reportForm.value;
    const queryParams = [];

    if (startDate) queryParams.push(`startDate=${encodeURIComponent(startDate)}`);
    if (endDate) queryParams.push(`endDate=${encodeURIComponent(endDate)}`);
    if (product) queryParams.push(`product=${encodeURIComponent(product)}`);
    if (employee) queryParams.push(`employee=${encodeURIComponent(employee)}`);

    const query = queryParams.length ? '?' + queryParams.join('&') : '';

    this.http.get<any[]>(`http://localhost:5000/api/Sales${query}`).subscribe(data => {
      this.sales = data;
      this.calculateSummary();
    });
  }

  export(format: string): void {
    alert(`Exporting as ${format}...`);
    // Export logic placeholder
  }

  print(): void {
    window.print();
  }
    encode(data: string): string {
  return encodeURIComponent(data);
}

  generateChartConfig(): string {
  const labels = this.sales.map(s => s.product);
  const data = this.sales.map(s => s.total);
  return JSON.stringify({
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{ label: 'Sales', data: data }]
    }
  });
}
}
