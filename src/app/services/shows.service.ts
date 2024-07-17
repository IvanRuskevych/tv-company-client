import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IShow } from '../models';
import { ShowsApiService } from './shows-api.service';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  private readonly _shows$: BehaviorSubject<IShow[]> = new BehaviorSubject<IShow[]>([]);
  public readonly shows$: Observable<IShow[]> = this._shows$.asObservable() || [];

  constructor(private showsApiService: ShowsApiService) {}

  private get shows(): IShow[] {
    return this._shows$.getValue();
  }

  private set shows(shows: IShow[]) {
    this._shows$.next(shows);
  }

  public setShows(): void {
    this.showsApiService.getShows().subscribe((shows: IShow[]) => {
      this.shows = shows;
    });
  }

  public getShowByID(id: string): IShow | undefined {
    return this.shows.find(({ _id }) => _id === id);
  }

  public initialShows(): void {
    this.shows = [];
  }
}
