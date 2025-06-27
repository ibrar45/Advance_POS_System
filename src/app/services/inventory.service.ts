import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../Models/inventory.model';
// import { InventoryItem } from '../models/inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = 'https://localhost:5001/api/inventory';

  constructor(private http: HttpClient) {}

  getAll(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

 updateStock(id: number, stock: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/adjust-stock/${id}`, stock);
}

}
