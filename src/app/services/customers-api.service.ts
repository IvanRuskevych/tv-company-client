import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICustomer } from '../models/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersApiService {
  private readonly apiUrl: string = environment.apiUrl + `/customers`;

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiUrl);
  }

  public addNewCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.apiUrl, customer);
  }

  public editCustomer(id: string, customer: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(`${this.apiUrl}/${id}`, customer);
  }

  public deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
