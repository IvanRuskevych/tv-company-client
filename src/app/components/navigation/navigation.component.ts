import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AgentsService, BreakpointsService, CustomersService, ShowsService, TitleDashService } from '../../services';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
  ],
})
export class NavigationComponent implements OnInit {
  public currentTitle!: string;

  constructor(
    public breakpointsService: BreakpointsService,
    private titleDashService: TitleDashService,
    private authenticateService: AuthenticateService,
    private agentsService: AgentsService,
    private showsService: ShowsService,
    private customersService: CustomersService,
  ) {}

  ngOnInit() {
    if (this.authenticateService.isAuthenticated()) {
      // Load all data from DB when reloaded app
      this.agentsService.setAgents();
      this.showsService.setShows();
      this.customersService.setCustomers();

      this.titleDashService.title$.subscribe((title) => {
        this.currentTitle = title;
      });
    }
  }
}
