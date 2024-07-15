import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleDashService {
  private titleSubject = new BehaviorSubject<string>('Default title !');
  title$ = this.titleSubject.asObservable();

  constructor() {}

  setTitle(title: string): void {
    this.titleSubject.next(title);
  }
}
