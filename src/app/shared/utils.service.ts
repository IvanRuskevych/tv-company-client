import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private dialogRef: MatDialogRef<CustomDialogComponent> | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  public getActivatedRouterParams(param: string): string {
    return this.activatedRoute.snapshot.paramMap.get(param)!;
  }

  public navigateTo(route: string[]) {
    this.router.navigate([...route]);
  }

  public showErrorDialog(message: string): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { message },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      // to prevent double rendering "CustomDialogComponent"
      this.dialogRef = null;
    });


  }
}
