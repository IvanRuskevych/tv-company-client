import { Component, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatError, MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

import { ICustomer } from '../../../models';
import { CustomersApiService, CustomersService } from '../../../services';
import { UtilsService } from '../../../shared';
import { regex } from '../../../constants';

import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';
import { dialogData } from '../../../constants/dialogData';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, NgIf, MatButton, MatHint, MatIcon],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  customerId: string | null = null;
  isEditMode: boolean = false;

  protected readonly phoneInputValue = signal('');
  protected readonly contactPersonInputValue = signal('');

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private customersApiService: CustomersApiService,
    private customersService: CustomersService,
    private utilsService: UtilsService,
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(regex.PHONE)]],
      contactPerson: ['', [Validators.required, Validators.minLength(3)]],
      bankDetails: this.fb.group({
        bankName: ['', [Validators.required, Validators.minLength(3)]],
        identifierTIN: ['', [Validators.required, Validators.pattern(regex.TIN)]],
        iban: ['', [Validators.required, Validators.pattern(regex.IBAN)]],
      }),
    });
  }

  protected onInputPhone(event: Event) {
    this.phoneInputValue.set((event.target as HTMLInputElement).value);
  }

  protected onInputContactPerson(event: Event) {
    this.contactPersonInputValue.set((event.target as HTMLInputElement).value);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('id');
      if (this.customerId) {
        this.isEditMode = true;
        this.loadCustomerData(this.customerId);
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customerData: ICustomer = this.customerForm.value;

      if (this.isEditMode && this.customerId) {
        this.customerEditDialog(customerData);
      } else {
        this.createNewCustomer(customerData);
      }
    }
  }

  onCancel(): void {
    this.utilsService.navigateTo(['/customers']);
  }

  showErrorDialog(message: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      // to show smth after close dialog
    });
  }

  createNewCustomer(customerData: ICustomer): void {
    this.customersApiService.addNewCustomer(customerData).subscribe({
      next: () => {
        this.customersService.setCustomers();
        this.utilsService.navigateTo(['/customers']);
      },
      error: (err) => {
        if (err.status === 403 || err.status === 409) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  editCustomerData(customerId: string, customerData: ICustomer): void {
    this.customersApiService.editCustomer(customerId, customerData).subscribe({
      next: () => {
        this.customersService.setCustomers();
        this.utilsService.navigateTo(['/customers']);
      },
      error: (err) => {
        if (err.status === 403 || err.status === 404 || err.status === 409) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  loadCustomerData(customerId: string): void {
    const currentCustomer: ICustomer | undefined = this.customersService.getCustomerByID(customerId);
    this.customerForm.patchValue(currentCustomer!);
  }

  customerEditDialog(customerData: ICustomer): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: dialogData.CONFIRM_EDIT,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.customerId) {
        this.editCustomerData(this.customerId, customerData);
        // this.utilsService.navigateTo(['/customers']);
        // this.isEditMode = false;
      }
    });
  }
}
