import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ICustomer } from '../models/customer.model';
import { CustomersApiService } from './customers-api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly _customers$: BehaviorSubject<ICustomer[]> = new BehaviorSubject<ICustomer[]>([]);
  public readonly customers$: Observable<ICustomer[]> = this._customers$.asObservable();

  constructor(private customersApiService: CustomersApiService) {}

  private get customers(): ICustomer[] {
    return this._customers$.getValue();
  }

  private set customers(customers: ICustomer[]) {
    this._customers$.next(customers);
  }

  public setCustomers(): void {
    this.customersApiService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  public getCustomerByID(id: string): ICustomer | undefined {
    return this.customers.find(({ _id }) => _id === id);
  }

  public initialCustomers(): void {
    this.customers = [];
  }
}
