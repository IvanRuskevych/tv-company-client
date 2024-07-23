import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthenticateService,
    private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/commercials']);
      return false;
    } else {
      return true;
    }
  }
}
