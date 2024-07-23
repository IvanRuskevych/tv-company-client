import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICommercial } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommercialsApiService {
  private readonly apiUrl: string = environment.apiUrl + '/commercials';

  constructor(private http: HttpClient) {
  }

  public getCommercials(): Observable<ICommercial[]> {
    return this.http.get<ICommercial[]>(this.apiUrl);
  }

  public addNewCommercial(commercial: ICommercial): Observable<ICommercial> {
    return this.http.post<ICommercial>(this.apiUrl, commercial);
  }

  public editCommercial(id: string, commercial: ICommercial): Observable<ICommercial> {
    return this.http.put<ICommercial>(`${this.apiUrl}/${id}`, commercial);
  }

  public deleteCommercial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
