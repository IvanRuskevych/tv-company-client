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

import { IAgent } from '../../models';
import { AgentsApiService, AgentsService } from '../../services';
import { UtilsService } from '../../shared';
import { dialogData } from '../../constants';

import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

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
    NgIf,
  ],
  templateUrl: './agents-dashboard.component.html',
  styleUrl: './agents-dashboard.component.scss',
})
export class AgentsDashboardComponent implements OnInit, AfterViewInit {
  public agentsDataSource: MatTableDataSource<IAgent> = new MatTableDataSource<IAgent>();
  public displayedColumns: string[] = ['name', 'commission', 'action-edit', 'action-delete'];
  public agents$: Observable<IAgent[]> = this.agentsService.agents$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private agentsApiService: AgentsApiService,
    private agentsService: AgentsService,
    // private titleDashService: TitleDashService, // TODO fix logic
    private dialog: MatDialog,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {
    this.loadAgents();
  }

  ngAfterViewInit() {
    this.agentsDataSource.paginator = this.paginator;
    this.agentsDataSource.sort = this.sort;
  }

  // Main methods
  loadAgents() {
    this.agents$.subscribe({
      next: (agents: IAgent[]) => {
        if (Array.isArray(agents)) {
          this.updateAgentsDataSource(agents);
        } else {
          this.agentsService.initialAgents();
          this.openInfoDialog();
        }
      },
    });
  }

  deleteAgent(agentId: string): void {
    this.agentsApiService.deleteAgent(agentId).subscribe({
      next: () => {
        this.agentsService.setAgents();
        this.loadAgents();
      },
    });
  }

  updateAgentsDataSource(agents: IAgent[]) {
    this.agentsDataSource.data = agents;
    this.agentsDataSource.sort = this.sort;
    this.agentsDataSource.filterPredicate = (data: IAgent, filter: string) => {
      const dataStr = `${data.name} ${data.commission}`;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  // Search filter
  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.agentsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.agentsDataSource.paginator) {
      this.agentsDataSource.paginator.firstPage();
    }
  }

  // Dialogs
  openDeleteDialog(agentId: string): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: dialogData.CONFIRM_DELETE,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAgent(agentId);
      }
    });
  }

  openInfoDialog(): void {
    this.dialog.open(CustomDialogComponent, {
      data: dialogData.NOT_FOUND,
    });
  }

  // Navigation to...
  navigateToNewAgent(): void {
    this.utilsService.navigateTo(['/agents/create']);
  }

  navigateToEditAgent(agentId: string): void {
    this.utilsService.navigateTo([`/agents/edit/${agentId}`]);
  }
}
