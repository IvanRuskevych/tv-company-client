import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UtilsService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService implements CanActivate {
  constructor(private utilsService: UtilsService) {}

  canActivate(): boolean {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      this.utilsService.navigateTo(['/login']);
      return false;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token; // true=token exists & false = not
  }
}
