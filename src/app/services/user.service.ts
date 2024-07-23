import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { IUser } from '../models';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: IUser | null = null;

  constructor(private usersApiService: UserApiService) {
  }

  getCurrentUser(): Observable<IUser> {
    return this.usersApiService.getUser().pipe(tap(
      user => this.currentUser = user,
    ));
  }
}
