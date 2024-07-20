import { Component, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatError, MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { IShow } from '../../../models';
import { ShowsApiService, ShowsService } from '../../../services';
import { UtilsService } from '../../../shared';
import { regex } from '../../../constants';

import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';
import { dialogData } from '../../../constants/dialogData';

@Component({
  selector: 'app-show-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, NgIf, MatButton, MatHint],
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss'],
})
export class ShowFormComponent implements OnInit {
  showForm: FormGroup;
  showId: string | null = null;
  isEditMode: boolean = false;

  protected readonly ratingInputValue = signal('');
  protected readonly priceInputValue = signal('');

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private showsApiService: ShowsApiService,
    private showsService: ShowsService,
    private utilsService: UtilsService,
  ) {
    this.showForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      rating: ['', [Validators.required, Validators.pattern(regex.INTEGERS), Validators.min(0), Validators.max(10)]],
      pricePerCommercial: ['', [Validators.required, Validators.pattern(regex.INTEGERS), Validators.min(0)]],
    });
  }

  protected onInputRating(event: Event) {
    this.ratingInputValue.set((event.target as HTMLInputElement).value);
  }

  protected onInputPrice(event: Event) {
    this.priceInputValue.set((event.target as HTMLInputElement).value);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.showId = params.get('id');
      if (this.showId) {
        this.isEditMode = true;
        this.loadShowData(this.showId);
      }
    });
  }

  onSubmit(): void {
    if (this.showForm.valid) {
      const showData: IShow = {
        ...this.showForm.value,
        rating: Number(this.showForm.value.rating), // conversion: rating from a string into a number
        pricePerCommercial: Number(this.showForm.value.pricePerCommercial), // conversion: rating from a string into a number
      };

      if (this.isEditMode && this.showId) {
        this.showEditDialog(showData);
      } else {
        this.createNewShow(showData);
      }
    }
  }

  onCancel(): void {
    this.utilsService.navigateTo(['/shows']);
  }

  showErrorDialog(message: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      // to show smth after close dialog
    });
  }

  createNewShow(showData: IShow): void {
    this.showsApiService.addNewShow(showData).subscribe({
      next: () => {
        this.showsService.setShows();
        this.utilsService.navigateTo(['/shows']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  editShowData(showId: string, showData: IShow): void {
    this.showsApiService.editShow(showId, showData).subscribe({
      next: () => {
        this.showsService.setShows();
        this.utilsService.navigateTo(['/shows']);
      },
      error: (err) => {
        console.error('Error:', err); // Log the error
        if (err.status === 404 || err.status === 409) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  loadShowData(showId: string): void {
    const currentShow: IShow | undefined = this.showsService.getShowByID(showId);
    this.showForm.patchValue(currentShow!);
  }

  showEditDialog(showData: IShow): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: dialogData.CONFIRM_EDIT,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.showId) {
        this.editShowData(this.showId, showData);
        // this.utilsService.navigateTo(['/shows']);
        // this.isEditMode = false;
      }
    });
  }
}
