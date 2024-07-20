import { Routes } from '@angular/router';

import { DashComponent } from './components/dash/dash.component';
import { AgentsDashboardComponent } from './components/agents-dashboard/agents-dashboard.component';
import { AgentFormComponent } from './components/agents-dashboard/agent-form/agent-form.component';
import { ShowsDashboardComponent } from './components/shows-dashboard/shows-dashboard.component';
import { ShowFormComponent } from './components/shows-dashboard/show-form/show-form.component';
import { CustomersDashboardComponent } from './components/customers-dashboard/customers-dashboard.component';
import { CustomerFormComponent } from './components/customers-dashboard/customer-form/customer-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticateService } from './services/authenticate.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'agents', component: AgentsDashboardComponent, canActivate: [AuthenticateService] },
  { path: 'agents/create', component: AgentFormComponent, canActivate: [AuthenticateService] },
  { path: 'agents/edit/:id', component: AgentFormComponent, canActivate: [AuthenticateService] },

  { path: 'shows', component: ShowsDashboardComponent, canActivate: [AuthenticateService] },
  { path: 'shows/create', component: ShowFormComponent, canActivate: [AuthenticateService] },
  { path: 'shows/edit/:id', component: ShowFormComponent, canActivate: [AuthenticateService] },

  { path: 'customers', component: CustomersDashboardComponent, canActivate: [AuthenticateService] },
  { path: 'customers/create', component: CustomerFormComponent, canActivate: [AuthenticateService] },
  { path: 'customers/edit/:id', component: CustomerFormComponent, canActivate: [AuthenticateService] },

  { path: 'dash', component: DashComponent, canActivate: [AuthenticateService] },

  { path: '**', redirectTo: '/dash', pathMatch: 'full' },
];
