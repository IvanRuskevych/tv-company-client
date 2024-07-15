import { Routes } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { AgentsDashboardComponent } from './components/agents-dashboard/agents-dashboard.component';

export const routes: Routes = [
  {
    path: 'agents',
    component: AgentsDashboardComponent,
  },
  { path: '', component: DashComponent },
];
