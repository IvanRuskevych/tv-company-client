import { Component } from '@angular/core';
import { LoaderService } from '../services';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinner,
    AsyncPipe,
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  loader$ = this.loaderService.loader$;

  constructor(private loaderService: LoaderService) {
  }
}
