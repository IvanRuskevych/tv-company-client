import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UtilsService } from '../shared';
import { BehaviorSubject } from 'rxjs';

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
    console.log('isAuthenticated()', isAuthenticated);
    return isAuthenticated;
  }

  login(token: string): void {
    localStorage.setItem('accessToken', token);
    this.authState.next(true); // оновлюємо стан
    this.utilsService.navigateTo(['/dash']);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.authState.next(false); // оновлюємо стан
    this.utilsService.navigateTo(['/login']);
  }

  getAuthStatus(): boolean {
    return this.authState.value;
  }

  updateAuthState(): void {
    this.authState.next(this.hasToken());
  }

}
