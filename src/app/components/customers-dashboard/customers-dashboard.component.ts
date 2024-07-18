import { NgIf } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { IShow } from '../../models';
import { ShowsApiService, ShowsService } from '../../services';
import { UtilsService } from '../../shared';
import { dialog_data } from '../../constants';

import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { CustomersApiService } from '../../services/customers-api.service';
import { CustomersService } from '../../services/customers.service';
import { ICustomer } from '../../models/customer.model';

@Component({
  selector: 'app-shows-dashboard',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatColumnDef,
    MatSortHeader,
    MatSortModule,
    MatNoDataRow,
    MatPaginatorModule,
    MatButton,
    MatIcon,
    MatIconButton,
    MatSuffix,
    NgIf,
  ],
  templateUrl: './customers-dashboard.component.html',
  styleUrl: './customers-dashboard.component.scss',
})
export class CustomersDashboardComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['name', 'phone', 'contactPerson', 'action-edit', 'action-delete'];
  public customersDataSource: MatTableDataSource<ICustomer> = new MatTableDataSource<ICustomer>();

  public customers$: Observable<ICustomer[]> = this.customersService.customers$;
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customersApiService: CustomersApiService,
    private customersService: CustomersService,
    // private titleDashService: TitleDashService, // TODO fix logic
    private dialog: MatDialog,
    private utilsService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.customersDataSource.paginator = this.paginator;
    this.customersDataSource.sort = this.sort;
  }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  loadCustomers() {
    this.customers$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (customers: ICustomer[]) => {
        console.log('customers: ', customers);
        if (Array.isArray(customers)) {
          this.updateCustomersDataSource(customers);
        } else {
          this.customersService.initialCustomers();
          this.openInfoDialog(); // TODO fix logic when last item delete
        }
      },
    });
  }

  deleteCustomer(customerId: string): void {
    this.customersApiService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.customersService.setCustomers();
        this.loadCustomers();
      },
      error: (err): void => {
        if (err.status === 404) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  // Update data source for table
  updateCustomersDataSource(customers: ICustomer[]) {
    this.customersDataSource.data = customers;
    this.customersDataSource.sort = this.sort;
    this.customersDataSource.filterPredicate = (data: ICustomer, filter: string) => {
      const dataStr = `${data.name} ${data.phone} ${data.contactPerson}`;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  // Search filter
  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.customersDataSource.paginator) {
      this.customersDataSource.paginator.firstPage();
    }
  }

  // Dialogs
  openDeleteDialog(customerId: string): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: dialog_data.CONFIRM_DELETE,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCustomer(customerId);
      }
    });
  }

  openInfoDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: dialog_data.NOT_FOUND,
    });
  }

  showErrorDialog(message: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      // to do smth after close dialog
    });
  }

  // Navigation to...
  navigateToNewCustomer(): void {
    this.utilsService.navigateTo(['/customers/create']);
  }

  navigateToEditCustomer(customerId: string): void {
    this.utilsService.navigateTo([`/customers/edit/${customerId}`]);
  }
}
