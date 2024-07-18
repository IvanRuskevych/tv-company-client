import { Routes } from '@angular/router';

import { DashComponent } from './components/dash/dash.component';
import { AgentsDashboardComponent } from './components/agents-dashboard/agents-dashboard.component';
import { AgentFormComponent } from './components/agents-dashboard/agent-form/agent-form.component';
import { ShowsDashboardComponent } from './components/shows-dashboard/shows-dashboard.component';
import { ShowFormComponent } from './components/shows-dashboard/show-form/show-form.component';
import { CustomersDashboardComponent } from './components/customers-dashboard/customers-dashboard.component';
import { CustomerFormComponent } from './components/customers-dashboard/customer-form/customer-form.component';

export const routes: Routes = [
  { path: 'agents', component: AgentsDashboardComponent },
  { path: 'agents/create', component: AgentFormComponent },
  { path: 'agents/edit/:id', component: AgentFormComponent },

  { path: 'shows', component: ShowsDashboardComponent },
  { path: 'shows/create', component: ShowFormComponent },
  { path: 'shows/edit/:id', component: ShowFormComponent },

  { path: 'customers', component: CustomersDashboardComponent },
  { path: 'customers/create', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },

  { path: 'home', component: DashComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },
];
