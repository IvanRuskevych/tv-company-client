import { Component, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { AuthService } from '../../services';
import { UtilsService } from '../../shared';
import { regex } from '../../constants';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    NgIf,
    MatError,
    MatButton,
    MatIconButton,
    MatIcon,
    MatSuffix,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  hide = signal(true);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilsService: UtilsService,
    private authenticateService: AuthenticateService,
  ) {
    this.loginForm = this.fb.group({
      employeeID: ['', [Validators.required, Validators.pattern(regex.EMPLOYEE_ID)]],
      password: ['', [Validators.required, Validators.pattern(regex.PASSWORD)]],
    });
  }


  toggleHide(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.hide.set(!this.hide());
  }

  onSubmitForm() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.authenticateService.login();
          this.utilsService.navigateTo(['/dash']);
        },
        error: (err) => {
          this.utilsService.showErrorDialog(err.error.message);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel(): void {
    this.loginForm.reset();
  }
}
