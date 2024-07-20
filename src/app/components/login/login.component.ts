import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { AuthService } from '../../services';
import { UtilsService } from '../../shared';
import { regex } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgIf, MatError, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilsService: UtilsService,
  ) {
    this.loginForm = this.fb.group({
      employeeID: ['', [Validators.required, Validators.pattern(regex.EMPLOYEE_ID)]],
      password: ['', [Validators.required, Validators.pattern(regex.PASSWORD)]],
    });
  }

  onSubmitForm() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.utilsService.navigateTo(['/dash']);
        },
        error: (err) => {
          console.log('login err: ', err);
          this.utilsService.showErrorDialog(err.error.message);
        },
      });
    }
  }

  onCancel(): void {
    this.loginForm.reset();
  }
}
