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

import { IAgent } from '../../models';
import { AgentsApiService, AgentsService, TitleDashService } from '../../services';
import { UtilsService } from '../../shared';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agents-dashboard',
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
  ],
  templateUrl: './agents-dashboard.component.html',
  styleUrl: './agents-dashboard.component.scss',
})
export class AgentsDashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'commission', 'action-edit', 'action-delete'];
  agentsDataSource: MatTableDataSource<IAgent> = new MatTableDataSource<IAgent>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private agentsApiService: AgentsApiService,
    private agentsService: AgentsService,
    // private titleDashService: TitleDashService,
    private dialog: MatDialog,
    private utilsService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.loadAgents();
    // this.titleDashService.setTitle('Agents dashboard');
  }

  ngAfterViewInit() {
    this.agentsDataSource.paginator = this.paginator;
    this.agentsDataSource.sort = this.sort;
  }

  loadAgents() {
    this.agentsApiService.getAgents().subscribe({
      next: (agents: IAgent[]) => {
        console.log('agents', agents);
        if (Array.isArray(agents)) {
          console.log('agents:', agents);
          this.agentsService.setAgents(agents);
          this.agentsDataSource.data = agents;
          this.agentsDataSource.sort = this.sort;

          // commissionInputValue from input convert to string to search by numbers
          this.agentsDataSource.filterPredicate = (data: IAgent, filter: string) => {
            const dataStr = `${data.name} ${data.commission}`;
            return dataStr.toLowerCase().includes(filter);
          };
        } else {
          this.openInfoDialog();
        }
      },
      error: (err): void => {
        if (err.status === 404) {
          this.showErrorDialog(err.error.message);
        }
        console.log('Failed to load agents: =>', err);
      },
    });
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.agentsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.agentsDataSource.paginator) {
      this.agentsDataSource.paginator.firstPage();
    }
  }

  deleteAgent(agentId: string): void {
    this.agentsApiService.deleteAgent(agentId).subscribe({
      next: () => {
        this.loadAgents();
      },
      error: (err): void => {
        if (err.status === 404) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  openDeleteDialog(agentId: string): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the agent?`,
        isConfirmation: true,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAgent(agentId);
      }
    });
  }

  openInfoDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Information',
        message: 'There are no agents in the database.',
        isConfirmation: false,
        confirmText: 'Ok',
      },
    });
  }

  showErrorDialog(message: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Дії після закриття діалогового вікна, якщо необхідно
    });
  }

  navigateToNewAgent(): void {
    this.utilsService.navigateTo(['/agents/create']);
  }

  navigateToEditAgent(agentId: string): void {
    this.utilsService.navigateTo([`/agents/edit/${agentId}`]);
  }
}
