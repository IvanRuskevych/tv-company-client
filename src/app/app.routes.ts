import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgentComponent } from './components/agent/agent.component';

export const routes: Routes = [
  { path: 'dash', component: DashboardComponent },
  { path: 'agents', component: AgentComponent },
];
