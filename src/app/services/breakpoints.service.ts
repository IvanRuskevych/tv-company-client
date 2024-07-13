import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  constructor(private breakpointsObserver: BreakpointObserver) {}

  isXSmall$ = this.breakpointsObserver.observe(Breakpoints.XSmall).pipe(
    map((value) => value.matches),
    shareReplay(),
  );
  isHandset$ = this.breakpointsObserver.observe(Breakpoints.Handset).pipe(
    map((value) => value.matches),
    shareReplay(),
  );
  isTablet$ = this.breakpointsObserver.observe(Breakpoints.Tablet).pipe(
    map((value) => value.matches),
    shareReplay(),
  );
  isWeb$ = this.breakpointsObserver.observe(Breakpoints.Web).pipe(
    map((value) => value.matches),
    shareReplay(),
  );
}
