import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  public getActivatedRouterParams(param: string): string {
    return this.activatedRoute.snapshot.paramMap.get(param)!;
  }

  public navigateTo(route: string[]) {
    this.router.navigate([...route]);
  }
}
