import { Component, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { IAgent } from '../../../models';
import { AgentsApiService } from '../../../services';
import { UtilsService } from '../../../shared';
import { regex } from '../../../constants';
import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, NgIf, MatButton, MatHint],
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss'],
})
export class AgentFormComponent implements OnInit {
  agentForm: FormGroup;
  agentId: string | null = null;
  isEditMode: boolean = false;

  protected readonly commissionInputValue = signal('');

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private agentsApiService: AgentsApiService,
    private utilsService: UtilsService,
  ) {
    this.agentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      commission: [
        '',
        [Validators.required, Validators.pattern(regex.COMMISSION), Validators.min(0), Validators.max(100)],
      ],
    });
  }

  protected onInputCommission(event: Event) {
    this.commissionInputValue.set((event.target as HTMLInputElement).value);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.agentId = params.get('id');
      if (this.agentId) {
        this.isEditMode = true;
        this.loadAgentData(this.agentId);
      }
    });
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const agentData: IAgent = {
        ...this.agentForm.value,
        commission: Number(this.agentForm.value.commission), // conversion: commission from a string into a number
      };

      if (this.isEditMode && this.agentId) {
        this.showEditDialog(agentData);
      } else {
        this.createNewAgent(agentData);
      }
    }
  }

  onCancel(): void {
    this.utilsService.navigateTo(['/agents']);
  }

  showErrorDialog(message: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Дії після закриття діалогового вікна, якщо необхідно
    });
  }

  createNewAgent(agentData: IAgent): void {
    this.agentsApiService.addNewAgent(agentData).subscribe({
      next: () => {
        this.utilsService.navigateTo(['/agents']);
      },
      error: (err) => {
        console.error('Error:', err); // Log the error
        if (err.status === 409) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  editAgentData(agentId: string, agentData: IAgent): void {
    this.agentsApiService.editAgent(agentId, agentData).subscribe({
      next: () => this.utilsService.navigateTo(['/agents']),
      error: (err) => {
        console.error('Error:', err); // Log the error
        if (err.status === 404) {
          this.showErrorDialog(err.error.message);
        }
      },
    });
  }

  loadAgentData(agentId: string): void {
    this.agentsApiService.getAgentByID(agentId).subscribe((agent: IAgent) => {
      this.agentForm.patchValue(agent);
    });
  }

  showEditDialog(agentData: IAgent): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Confirm Edition',
        message: 'Are you sure you want to edit the agent information?',
        isConfirmation: true,
        confirmText: 'Edit',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.agentId) {
        this.editAgentData(this.agentId, agentData);
        // this.utilsService.navigateTo(['/agents']);
        // this.isEditMode = false;
      }
    });
  }
}
