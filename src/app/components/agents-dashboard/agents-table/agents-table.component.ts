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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { IAgent } from '../../../models';
import { AgentsApiService, AgentsService } from '../../../services';

@Component({
  selector: 'app-agents-table',
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
  ],
  templateUrl: './agents-table.component.html',
  styleUrl: './agents-table.component.scss',
})
export class AgentsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'commission'];
  agentsDataSource: MatTableDataSource<IAgent> = new MatTableDataSource<IAgent>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private agentsApiService: AgentsApiService,
    private agentsService: AgentsService,
  ) {}

  ngOnInit(): void {
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

  ngAfterViewInit() {
    this.agentsDataSource.paginator = this.paginator;
    this.agentsDataSource.sort = this.sort;
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.agentsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.agentsDataSource.paginator) {
      this.agentsDataSource.paginator.firstPage();
    }
  }
}
