// import { Component, signal } from '@angular/core';
// import { NgIf } from '@angular/common';
//
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
// import { MatInput } from '@angular/material/input';
// import { MatButton } from '@angular/material/button';
//
// import { IAgent } from '../../../models';
// import { AgentsApiService } from '../../../services';
// import { UtilsService } from '../../../shared';
// import { regex } from '../../../constants';
// import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
// import { MatDialog } from '@angular/material/dialog';
//
// @Component({
//   selector: 'app-new-agent',
//   standalone: true,
//   imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, NgIf, MatButton],
//   templateUrl: './new-agent.component.html',
//   styleUrl: './new-agent.component.scss',
// })
// export class NewAgentComponent {
//   agentForm: FormGroup;
//
//   protected readonly commissionInputValue = signal('');
//
//   constructor(
//     private agentsApiService: AgentsApiService,
//     private utilsService: UtilsService,
//     private fb: FormBuilder,
//     private dialog: MatDialog,
//   ) {
//     this.agentForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       commission: [
//         '',
//         [Validators.required, Validators.pattern(regex.COMMISSION), Validators.min(0), Validators.max(100)],
//       ],
//     });
//   }
//
//   protected onInputCommission(event: Event) {
//     this.commissionInputValue.set((event.target as HTMLInputElement).value);
//   }
//
//   onSubmit(): void {
//     if (this.agentForm.value) {
//       const agentData: IAgent = {
//         ...this.agentForm.value,
//         commission: Number(this.agentForm.value.commission), // conversion: commission from a string into a number
//       };
//
//       this.agentsApiService.addNewAgent(agentData).subscribe({
//         next: () => {
//           this.utilsService.navigateTo(['/agents']);
//         },
//         error: (err) => {
//           if (err.status === 409) {
//             this.showErrorDialog(err.error.message);
//           }
//         },
//       });
//     }
//   }
//
//   onCancel(): void {
//     this.utilsService.navigateTo(['/agents']);
//   }
//
//   showErrorDialog(message: string) {
//     const dialogRef = this.dialog.open(ErrorDialogComponent, {
//       data: { message },
//     });
//
//     dialogRef.afterClosed().subscribe(() => {
//       // Дії після закриття діалогового вікна, якщо необхідно
//     });
//   }
// }

import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { IAgent } from '../../../models';
import { AgentsApiService } from '../../../services';
import { UtilsService } from '../../../shared';
import { regex } from '../../../constants';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-agent',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, NgIf, MatButton, MatHint],
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss'],
})
export class NewAgentComponent {
  agentForm: FormGroup;

  protected readonly commissionInputValue = signal('');

  constructor(
    private agentsApiService: AgentsApiService,
    private utilsService: UtilsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
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

  onSubmit(): void {
    if (this.agentForm.valid) {
      const agentData: IAgent = {
        ...this.agentForm.value,
        commission: Number(this.agentForm.value.commission), // conversion: commission from a string into a number
      };

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
  }

  onCancel(): void {
    this.utilsService.navigateTo(['/agents']);
  }

  showErrorDialog(message: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Дії після закриття діалогового вікна, якщо необхідно
    });
  }
}
