import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AgentsTableComponent } from './agents-table/agents-table.component';

@Component({
  selector: 'app-agents-dashboard',
  templateUrl: './agents-dashboard.component.html',
  styleUrl: './agents-dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    AgentsTableComponent,
  ],
})
export class AgentsDashboardComponent {}
