import { Component, Inject } from '@angular/core';
import { NgIf } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, NgIf],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss',
})
export class CustomDialogComponent {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  isConfirmation: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      isConfirmation?: boolean;
      confirmText?: string;
      cancelText?: string;
    },
    public dialogRef: MatDialogRef<CustomDialogComponent>,
  ) {
    this.title = data.title || 'Error';
    this.message = data.message || '';
    this.isConfirmation = !!data.isConfirmation;
    this.confirmText = data.confirmText || 'Ok';
    this.cancelText = data.cancelText || 'Cancel';
  }

  onCloseClick(): void {
    // Close the dialog without confirming
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    // Close the dialog and confirm action
    this.dialogRef.close(true);
  }
}
