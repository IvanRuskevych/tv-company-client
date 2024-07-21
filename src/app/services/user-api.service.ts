import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { apiEndpoints } from '../constants';

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
