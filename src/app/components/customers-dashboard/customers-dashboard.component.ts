import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';

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
  MatTextColumn,
} from '@angular/material/table';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatRipple } from '@angular/material/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ICustomer } from '../../models';
import { CustomersApiService, CustomersService } from '../../services';
import { UtilsService } from '../../shared';

import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { dialogData } from '../../constants';

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
    MatRipple,
    MatTextColumn,
  ],
  templateUrl: './customers-dashboard.component.html',
  styleUrl: './customers-dashboard.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomersDashboardComponent implements OnInit, AfterViewInit {
  public customers$: Observable<ICustomer[]> = this.customersService.customers$;
  public expandedElement: ICustomer | null = null;
  public customersDataSource: MatTableDataSource<ICustomer> = new MatTableDataSource<ICustomer>();
  public displayedColumns: string[] = ['name', 'phone', 'contactPerson'];
  public columnsToDisplayWithExpand = [...this.displayedColumns, 'expand', 'action-edit', 'action-delete'];
  public columnHeaders: { [key: string]: string } = {
    name: 'Customer name',
    phone: 'Phone number',
    contactPerson: 'Contact person',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customersApiService: CustomersApiService,
    private customersService: CustomersService,
    // private titleDashService: TitleDashService, // TODO fix logic
    private dialog: MatDialog,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.customersDataSource.paginator = this.paginator;
    this.customersDataSource.sort = this.sort;
  }

  // Main methods
  loadCustomers() {
    this.customers$.subscribe({
      next: (customers: ICustomer[]) => {
        if (Array.isArray(customers)) {
          this.updateCustomersDataSource(customers);
        } else {
          this.customersService.initialCustomers();
          this.openInfoDialog();
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
    });
  }

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
      data: dialogData.CONFIRM_DELETE,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCustomer(customerId);
      }
    });
  }

  openInfoDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: dialogData.NOT_FOUND,
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
