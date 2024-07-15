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

import { IAgent } from '../../models';
import { AgentsApiService, AgentsService } from '../../services';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TitleDashService } from '../../services/title-dash.service';
import { MatDialog } from '@angular/material/dialog';
import { NewAgentComponent } from './new-agent/new-agent.component';

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
  displayedColumns: string[] = ['name', 'commission'];
  agentsDataSource: MatTableDataSource<IAgent> = new MatTableDataSource<IAgent>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private agentsApiService: AgentsApiService,
    private agentsService: AgentsService,
    private titleDashService: TitleDashService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadAgents();
    this.titleDashService.setTitle('Agents dashboard');
  }

  ngAfterViewInit() {
    this.agentsDataSource.paginator = this.paginator;
    this.agentsDataSource.sort = this.sort;
  }

  loadAgents() {
    this.agentsApiService.getAgents().subscribe(
      (agents: IAgent[]): void => {
        // console.log('agents:', agents);
        this.agentsService.setAgents(agents);
        this.agentsDataSource.data = agents;
        this.agentsDataSource.sort = this.sort;

        // value from input convert to string to search by numbers
        this.agentsDataSource.filterPredicate = (data: IAgent, filter: string) => {
          const dataStr = `${data.name} ${data.commission}`;
          return dataStr.toLowerCase().includes(filter);
        };
      },
      (error: any): void => {
        console.log('Failed to load agents: =>', error);
      },
    );
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.agentsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.agentsDataSource.paginator) {
      this.agentsDataSource.paginator.firstPage();
    }
  }

  openNewAgentDialog(): void {
    const dialogRef = this.dialog.open(NewAgentComponent); // { width: '500px' }
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('Dialog result:', result);

      if (result) {
        this.agentsApiService.addNewAgent(result).subscribe(
          (response: IAgent) => {
            // console.log('Agent added successfully:', response);
            this.agentsApiService.getAgents();
            this.loadAgents();
          },
          // ,
          // (error) => {
          //   console.error('Error adding agent:', error);
          // },
        );
      }
    });
  }
}
