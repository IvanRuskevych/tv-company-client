import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IShow } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShowsApiService {
  private readonly apiUrl: string = environment.apiUrl + '/shows';

  constructor(private http: HttpClient) {}

  public getShows(): Observable<IShow[]> {
    return this.http.get<IShow[]>(this.apiUrl);
  }

  public addNewShow(show: IShow): Observable<IShow> {
    return this.http.post<IShow>(`${this.apiUrl}`, show);
  }

  public editShow(id: string, show: IShow): Observable<IShow> {
    return this.http.put<IShow>(`${this.apiUrl}/${id}`, show);
  }

  public deleteShow(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
