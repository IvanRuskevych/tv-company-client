import { Routes } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { AgentsDashboardComponent } from './components/agents-dashboard/agents-dashboard.component';
import { AgentFormComponent } from './components/agents-dashboard/agent-form/agent-form.component';

export const routes: Routes = [
  {
    path: 'agents',
    component: AgentsDashboardComponent,
  },
  { path: 'agents/create', component: AgentFormComponent },
  { path: 'agents/edit/:id', component: AgentFormComponent },

  { path: '', redirectTo: '/agents', pathMatch: 'full' },
  { path: '', component: DashComponent },
];
