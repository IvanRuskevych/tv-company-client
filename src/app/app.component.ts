import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatToolbar } from '@angular/material/toolbar';

import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tv-company-client';
}
