import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && accessToken) {
          return this.handleTokenExpired(request, next); /// ============00000000
        }
        return throwError(() => err);
      }),
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleTokenExpired(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshAccessToken().pipe(
      switchMap(() => {
        const newAccessToken = localStorage.getItem('accessToken');
        if (newAccessToken) {
          return next.handle(this.addToken(request, newAccessToken));
        } else {
          return throwError(() => 'Failed to refresh token');
        }
      }),
      catchError((err) => {
        console.log(`Error handling expired access token: `, err);
        return throwError(() => err);
      }),
    );
  }
}
