import { Routes } from '@angular/router';

import { DashComponent } from './components/dash/dash.component';
import { AgentsDashboardComponent } from './components/agents-dashboard/agents-dashboard.component';
import { AgentFormComponent } from './components/agents-dashboard/agent-form/agent-form.component';
import { ShowsDashboardComponent } from './components/shows-dashboard/shows-dashboard.component';
import { ShowFormComponent } from './components/shows-dashboard/show-form/show-form.component';

export const routes: Routes = [
  { path: 'agents', component: AgentsDashboardComponent },
  { path: 'agents/create', component: AgentFormComponent },
  { path: 'agents/edit/:id', component: AgentFormComponent },

  { path: 'shows', component: ShowsDashboardComponent },
  { path: 'shows/create', component: ShowFormComponent },
  { path: 'shows/edit/:id', component: ShowFormComponent },

  { path: 'home', component: DashComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },
];
