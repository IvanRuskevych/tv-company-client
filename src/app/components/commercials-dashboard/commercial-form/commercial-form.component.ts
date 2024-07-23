import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';

import { IAgent, ICommercial, ICustomer, IShow } from '../../../models';
import {
  AgentsService,
  CommercialsApiService,
  CommercialsService,
  CustomersService,
  ShowsService,
} from '../../../services';
import { UtilsService } from '../../../shared';
import { dialogData, regex } from '../../../constants';

import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';


@Component({
  selector: 'app-commercial-form',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatTable,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelect,
    MatOption,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './commercial-form.component.html',
  styleUrl: './commercial-form.component.scss',
})
export class CommercialFormComponent implements OnInit {
  private commercialId: string | null = null;
  public commercialForm: FormGroup;
  public isEditMode: boolean = false;
  public shows$: Observable<IShow[]> = this.showsService.shows$;
  public customers$: Observable<ICustomer[]> = this.customersService.customers$;
  public agents$: Observable<IAgent[]> = this.agentsService.agents$;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private utilsService: UtilsService,
    private commercialsApiService: CommercialsApiService,
    private commercialsService: CommercialsService,
    private showsService: ShowsService,
    private customersService: CustomersService,
    private agentsService: AgentsService,
  ) {
    this.commercialForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.max(200)]],
      duration: ['', [Validators.required, Validators.pattern(regex.INTEGERS), Validators.min(0), Validators.max(60)]],
      date: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required],
      }),
      show: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      agent: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.commercialId = params.get('id');
      if (this.commercialId) {
        this.isEditMode = true;
        this.loadCommercialData(this.commercialId);
      }
    });
  }

  onSubmit(): void {
    const commercialData: ICommercial = this.commercialForm.value;
    commercialData.date.start = new Date(commercialData.date.start); // conversion to Date
    commercialData.date.end = new Date(commercialData.date.start);

    if (this.isEditMode && this.commercialId) {
      this.commercialEditDialog(commercialData);
    } else {
      this.createNewCommercial(commercialData);
    }
  }

  onCancel(): void {
    this.utilsService.navigateTo(['/commercials']);
  }

  createNewCommercial(commercialData: ICommercial): void {
    this.commercialsApiService.addNewCommercial(commercialData).subscribe({
      next: () => {
        this.commercialsService.setCommercials();
        this.utilsService.navigateTo(['/commercials']);
      },
      error: (err) => {
        if (err.status === 403 || err.status === 409) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  editCommercialData(commercialId: string, commercialData: ICommercial): void {
    this.commercialsApiService.editCommercial(commercialId, commercialData).subscribe({
      next: () => {
        this.commercialsService.setCommercials();
      },
      error: (err) => {
        if (err.status === 403 || err.status === 404 || err.status === 409) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  loadCommercialData(commercialId: string): void {
    const currentCommercial: ICommercial | undefined = this.commercialsService.getCommercialByID(commercialId);
    this.commercialForm.patchValue(currentCommercial!);
  }

  commercialEditDialog(commercialData: ICommercial): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: dialogData.CONFIRM_EDIT,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.commercialId) {
        this.editCommercialData(this.commercialId, commercialData);
        this.utilsService.navigateTo(['/commercials']);
        this.isEditMode = false;
      }
    });
  }

  showErrorDialog(message: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      // to show smth after close dialog
    });
  }
}
