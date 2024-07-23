import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService {

  constructor(private dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          // Error from client-side
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error from server-side
          if (error.error && error.error.message) {
            console.log('error.error.message: ', error.error.message);
            errorMessage = error.error.message;  // Use the message from the backend
          } else {
            switch (error.status) {
              case 400:
                errorMessage = 'Bad Request';
                break;
              case 401:
                errorMessage = 'Unauthorized';
                break;
              case 403:
                errorMessage = 'Forbidden';
                break;
              case 404:
                errorMessage = 'Not Found';
                break;
              case 409:
                errorMessage = 'Conflict';
                break;
              case 500:
                errorMessage = 'Internal Server Error';
                break;
              default:
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                break;
            }
          }
        }

        this.showErrorDialog(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(CustomDialogComponent, {
      data: { message },
    });
  }
}
