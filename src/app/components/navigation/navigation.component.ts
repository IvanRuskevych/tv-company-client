import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { IUser } from '../../models';
import {
  AgentsService, BreakpointsService, CommercialsService,
  CustomersService, ShowsService, TitleDashService, AuthenticateService, UserService,
} from '../../services';
import { dialogData } from '../../constants';

import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { LoginComponent } from '../login/login.component';

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
    LoginComponent,
    NgIf,
  ],
})
export class NavigationComponent implements OnInit {
  public currentTitle!: string;
  public currentUser: IUser | null = null;
  public isAuth$: Observable<boolean> = this.authenticateService.authState$;

  constructor(
    public breakpointsService: BreakpointsService,
    private titleDashService: TitleDashService,
    private authenticateService: AuthenticateService,
    private agentsService: AgentsService,
    private showsService: ShowsService,
    private customersService: CustomersService,
    private commercialsService: CommercialsService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.isAuth$.subscribe(isAuth => {
      if (isAuth) {
        // Load all data from DB when reloaded app
        this.agentsService.setAgents();
        this.showsService.setShows();
        this.customersService.setCustomers();
        this.commercialsService.setCommercials();
        this.userService.getCurrentUser().subscribe(user => {
            this.currentUser = user;
          },
        );

        this.titleDashService.title$.subscribe((title) => {
          this.currentTitle = title;
        });
      }
    });
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: dialogData.LOGOUT,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authenticateService.logout();
        this.currentUser = null;
      }
    });

  }
}
