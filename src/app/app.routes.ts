import { Routes } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { AgentsDashboardComponent } from './components/agents-dashboard/agents-dashboard.component';
import { NewAgentComponent } from './components/agents-dashboard/new-agent/new-agent.component';

export const routes: Routes = [
  {
    path: 'agents',
    component: AgentsDashboardComponent,
  },
  { path: 'agents/create', component: NewAgentComponent },
  
  { path: '', redirectTo: '/agents', pathMatch: 'full' },
  { path: '', component: DashComponent },
];
