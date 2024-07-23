import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../models/';
import { apiEndpoints } from '../constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}${apiEndpoints.USER_CURRENT}`);
  }
}
