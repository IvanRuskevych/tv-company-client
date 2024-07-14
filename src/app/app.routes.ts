import { Routes } from '@angular/router';
import { AgentsDashboardComponent } from './components/agents-dashboard/agents-dashboard.component';
import { DashComponent } from './components/dash/dash.component';

export const routes: Routes = [
  {
    path: 'agents',
    component: AgentsDashboardComponent,
  },
  { path: '', component: DashComponent },
];
