import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { regex } from '../../../constants';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-new-agent',
  standalone: true,
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    NgIf,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './new-agent.component.html',
  styleUrl: './new-agent.component.scss',
})
export class NewAgentComponent {
  agentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewAgentComponent>,
  ) {
    this.agentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      commission: [
        '',
        [Validators.required, Validators.pattern(regex.COMMISSION), Validators.min(0), Validators.max(100)],
      ],
    });
  }

  onCreate(): void {
    if (this.agentForm.valid) {
      const formValue = this.agentForm.value;
      formValue.commission = Number(formValue.commission); // Convert to number (bad request from BE)
      console.log('Form data before close:', formValue);
      this.dialogRef.close(this.agentForm.value);
    }
  }

  onCansel(): void {
    this.dialogRef.close();
  }
}
