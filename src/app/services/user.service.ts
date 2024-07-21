import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { IUser } from '../models/user.model';
import { catchError, Observable, of, tap } from 'rxjs';

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
