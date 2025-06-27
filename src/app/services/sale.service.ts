import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaleRequest } from '../Models/sale.model';
// import { SaleRequest } from '../models/sale.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private apiUrl = 'https://localhost:5001/api/Sales';

  constructor(private http: HttpClient) {}

  submitSale(sale: SaleRequest) {
    return this.http.post(this.apiUrl, sale);
  }

  getSales() {
    return this.http.get(this.apiUrl);
  }
}
