import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { IAgent } from '../../../models';
import { AgentsApiService, AgentsService } from '../../../services';
import { CdkTable } from '@angular/cdk/table';
import { AsyncPipe } from '@angular/common';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';

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
    CdkTable,
    MatColumnDef,
    AsyncPipe,
    MatSortHeader,
    MatSortModule,
  ],
  templateUrl: './agents-table.component.html',
  styleUrl: './agents-table.component.scss',
})
export class AgentsTableComponent implements OnInit {
  // public agents$: Observable<IAgent[]> | undefined;
  displayedColumns: string[] = ['name', 'commission'];
  agentsDataSource: MatTableDataSource<IAgent> = new MatTableDataSource<IAgent>();

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
      },
      (error: any): void => {
        console.log('Failed to load agents: =>', error);
      },
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.agentsDataSource.filter = filterValue.trim().toLowerCase();
  }
}
