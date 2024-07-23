import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ICommercial } from '../models';
import { CommercialsApiService } from './commercials-api.service';

@Injectable({
  providedIn: 'root',
})
export class CommercialsService {

  private readonly _commercials$: BehaviorSubject<ICommercial[]> = new BehaviorSubject<ICommercial[]>([]);
  public readonly commercials$: Observable<ICommercial[]> = this._commercials$.asObservable();

  constructor(private commercialsApiService: CommercialsApiService) {
  }

  private get commercials(): ICommercial[] {
    return this._commercials$.getValue();
  }

  private set commercials(commercials: ICommercial[]) {
    this._commercials$.next(commercials);
  }

  public setCommercials(): void {
    this.commercialsApiService.getCommercials().subscribe((commercials: ICommercial[]) => {
      this.commercials = commercials;
    });
  }

  public getCommercialByID(id: string): ICommercial | undefined {
    return this.commercials.find(({ _id }) => _id === id);
  }

  public initialCommercials(): void {
    this.commercials = [];
  }
}
