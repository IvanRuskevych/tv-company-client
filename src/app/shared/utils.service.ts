import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  public getActivatedRouterParams(param: string): string {
    return this.activatedRoute.snapshot.paramMap.get(param)!;
  }

  public navigateTo(route: string[]) {
    this.router.navigate([...route]);
  }

  public showErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      // for actions after close dialog
    });
  }
}
