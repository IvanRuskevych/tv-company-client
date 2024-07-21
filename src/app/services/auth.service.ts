import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';

import { ILogin } from '../models';
import { UtilsService } from '../shared';
import { environment } from '../../environments/environment';
import { apiEndpoints, routeEndpoints } from '../constants';
import { AgentsService } from './agents.service';
import { ShowsService } from './shows.service';
import { CustomersService } from './customers.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    private agentsService: AgentsService,
    private showsService: ShowsService,
    private customersService: CustomersService,
  ) {
  }

  login(credentials: ILogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${apiEndpoints.LOGIN}`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        // Load all data from DB
        this.agentsService.setAgents();
        this.showsService.setShows();
        this.customersService.setCustomers();
      }),
      catchError((err) => {
        this.utilsService.showErrorDialog(err.error.message);
        return throwError(() => err);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.utilsService.navigateTo([routeEndpoints.LOGIN]);
  }

  refreshAccessToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.pipe(
        switchMap((token) => (token ? of(token) : throwError(() => new Error('No token available')))),
      );
    } else {
      this.refreshTokenInProgress = true;
      const refreshToken = localStorage.getItem('refreshToken');

      return this.http.post<any>(`${this.apiUrl}${apiEndpoints.REFRESH}`, { refreshToken }).pipe(
        tap((response) => {
          this.refreshTokenInProgress = false;
          localStorage.setItem('accessToken', response.accessToken);
          this.refreshTokenSubject.next(response.accessToken);
        }),
        catchError((err) => {
          this.refreshTokenInProgress = false;
          this.logout();
          return throwError(() => err);
        }),
      );
    }
  }


}
