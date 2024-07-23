import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

import { ICommercial } from '../../models';
import { CommercialsApiService, CommercialsService } from '../../services';
import { UtilsService } from '../../shared';
import { dialogData } from '../../constants';

import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-commercials-dashboard',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatTable,
    MatHeaderCellDef,
    MatSortHeader,
  ],
  templateUrl: './commercials-dashboard.component.html',
  styleUrl: './commercials-dashboard.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CommercialsDashboardComponent implements OnInit, AfterViewInit {
  private destroy$ = new Subject<void>();

  public commercialsDataSource: MatTableDataSource<ICommercial> = new MatTableDataSource<ICommercial>();
  public expandedElement: ICommercial | null = null;
  public commercials$: Observable<ICommercial[]> = this.commercialsService.commercials$;
  public displayedColumns: string[] = ['name', 'show', 'date', 'duration'];
  public columnsToDisplayWithExpand = [...this.displayedColumns, 'expand', 'action-edit', 'action-delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private commercialsService: CommercialsService,
    private commercialsApiService: CommercialsApiService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.loadCommercials();
  }

  ngAfterViewInit(): void {
    this.commercialsDataSource.paginator = this.paginator;
    this.commercialsDataSource.sort = this.sort;
  }

  // Main methods
  loadCommercials(): void {
    this.commercials$.pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: (commercials: ICommercial[]) => {
          if (Array.isArray(commercials)) {
            this.updateCommercialsDataSource(commercials);
          } else {
            this.commercialsService.initialCommercials();
            this.openInfoDialog();
          }
        },
      },
    );
  }

  updateCommercialsDataSource(commercials: ICommercial[]) {
    this.commercialsDataSource.data = commercials;
    this.commercialsDataSource.sort = this.sort;
    this.commercialsDataSource.filterPredicate = (data: ICommercial, filter: string) => {
      const dataStr = `${data.name} ${data.date} ${data.duration}`;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  deleteCommercial(commercialId: string): void {
    this.commercialsApiService.deleteCommercial(commercialId).subscribe({
      next: () => {
        this.commercialsService.setCommercials();
        this.loadCommercials();
      },
    });
  }

  // Search filter
  applySearchFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.commercialsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.commercialsDataSource.paginator) this.commercialsDataSource.paginator.firstPage();
  }

  // Dialogs
  openDeleteDialog(commercialId: string): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: dialogData.CONFIRM_DELETE,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCommercial(commercialId);
      }
    });
  }

  openInfoDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: dialogData.NOT_FOUND,
    });
  }

  // Navigation to...
  navigateToNewCommercial(): void {
    this.utilsService.navigateTo(['/commercials/create']);
  }

  navigateToEditCommercial(commercialId: string): void {
    this.utilsService.navigateTo([`/commercials/edit/${commercialId}`]);
  }

  protected readonly toString = toString;
}
