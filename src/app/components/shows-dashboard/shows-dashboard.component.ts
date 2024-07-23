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
import { dialogData } from '../../constants';

import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

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
  templateUrl: './shows-dashboard.component.html',
  styleUrl: './shows-dashboard.component.scss',
})
export class ShowsDashboardComponent implements OnInit, AfterViewInit {
  public shows$: Observable<IShow[]> = this.showsService.shows$;
  public showsDataSource: MatTableDataSource<IShow> = new MatTableDataSource<IShow>();
  public displayedColumns: string[] = ['name', 'rating', 'pricePerCommercial', 'action-edit', 'action-delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private showsApiService: ShowsApiService,
    private showsService: ShowsService,
    // private titleDashService: TitleDashService, // TODO fix logic
    private dialog: MatDialog,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {
    this.loadShows();
  }

  ngAfterViewInit() {
    this.showsDataSource.paginator = this.paginator;
    this.showsDataSource.sort = this.sort;
  }

  loadShows() {
    this.shows$.subscribe({
      next: (shows: IShow[]) => {
        if (Array.isArray(shows)) {
          this.updateShowsDataSource(shows);
        } else {
          this.showsService.initialShows();
          this.openInfoDialog();
        }
      },
    });
  }

  deleteShow(showId: string): void {
    this.showsApiService.deleteShow(showId).subscribe({
      next: () => {
        this.showsService.setShows();
        this.loadShows();
      },
      error: (err): void => {
        if (err.status === 404 || err.status === 403) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  // Update data source for table
  updateShowsDataSource(shows: IShow[]) {
    this.showsDataSource.data = shows;
    this.showsDataSource.sort = this.sort;
    this.showsDataSource.filterPredicate = (data: IShow, filter: string) => {
      const dataStr = `${data.name} ${data.rating} ${data.pricePerCommercial}`;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  // Search filter
  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.showsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.showsDataSource.paginator) {
      this.showsDataSource.paginator.firstPage();
    }
  }

  // Dialogs
  openDeleteDialog(showId: string): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: dialogData.CONFIRM_DELETE,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteShow(showId);
      }
    });
  }

  openInfoDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: dialogData.NOT_FOUND,
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
  navigateToNewShow(): void {
    this.utilsService.navigateTo(['/shows/create']);
  }

  navigateToEditShow(showId: string): void {
    this.utilsService.navigateTo([`/shows/edit/${showId}`]);
  }
}
