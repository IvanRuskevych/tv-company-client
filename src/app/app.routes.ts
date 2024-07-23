import { Routes } from '@angular/router';

import { AuthenticateService } from './services';

import { AgentsDashboardComponent } from './components/agents-dashboard/agents-dashboard.component';
import { AgentFormComponent } from './components/agents-dashboard/agent-form/agent-form.component';
import { ShowsDashboardComponent } from './components/shows-dashboard/shows-dashboard.component';
import { ShowFormComponent } from './components/shows-dashboard/show-form/show-form.component';
import { CustomersDashboardComponent } from './components/customers-dashboard/customers-dashboard.component';
import { CustomerFormComponent } from './components/customers-dashboard/customer-form/customer-form.component';
import { LoginComponent } from './components/login/login.component';
import { CommercialsDashboardComponent } from './components/commercials-dashboard/commercials-dashboard.component';
import { CommercialFormComponent } from './components/commercials-dashboard/commercial-form/commercial-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'commercials', component: CommercialsDashboardComponent },
  { path: 'commercials/create', component: CommercialFormComponent },
  { path: 'commercials/edit/:id', component: CommercialFormComponent },

  { path: 'agents', component: AgentsDashboardComponent, canActivate: [AuthenticateService] },
  { path: 'agents/create', component: AgentFormComponent, canActivate: [AuthenticateService] },
  { path: 'agents/edit/:id', component: AgentFormComponent, canActivate: [AuthenticateService] },

  { path: 'shows', component: ShowsDashboardComponent, canActivate: [AuthenticateService] },
  { path: 'shows/create', component: ShowFormComponent, canActivate: [AuthenticateService] },
  { path: 'shows/edit/:id', component: ShowFormComponent, canActivate: [AuthenticateService] },

  { path: 'customers', component: CustomersDashboardComponent, canActivate: [AuthenticateService] },
  { path: 'customers/create', component: CustomerFormComponent, canActivate: [AuthenticateService] },
  { path: 'customers/edit/:id', component: CustomerFormComponent, canActivate: [AuthenticateService] },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
