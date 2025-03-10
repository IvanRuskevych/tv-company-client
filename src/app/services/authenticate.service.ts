import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UtilsService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService implements CanActivate {
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  authState$ = this.authState.asObservable();

  constructor(private utilsService: UtilsService) {
  }

  // use it for routes
  canActivate(): boolean {
    const isAuthenticated = this.hasToken();
    if (!isAuthenticated) {
      this.utilsService.navigateTo(['/login']);
    }
    return isAuthenticated;
  }

  hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    const isAuthenticated = this.hasToken();
    this.authState.next(isAuthenticated);
    return isAuthenticated;
  }

  login(): void {
    this.authState.next(true);
    this.utilsService.navigateTo(['/commercials']);
  }

  logout(): void {
    this.authState.next(false); // refresh state to false
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.utilsService.navigateTo(['/login']);
  }
}
