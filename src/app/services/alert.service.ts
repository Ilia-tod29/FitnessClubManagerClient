import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  confirmAlert(message: string): Observable<boolean> {
    message += " Wait to say 'No'"
    const dialogRef = this.snackBar.open(message, 'Yes', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    return new Observable<boolean>(observer => {
      const subscription = dialogRef.onAction().subscribe(() => {
        observer.next(true);
        observer.complete();
      });

      dialogRef.afterDismissed().subscribe(() => {
        if (!subscription.closed) {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['info-snackbar'],
    });
  }

  showAlertWithRefresh(message: string): void {
    const snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['info-snackbar'],
    });

    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    })
  }

  parseDate(date: string): Date | null {
    const parts = date.split("-");

    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-based
      const year = parseInt(parts[2], 10);

      return new Date(year, month, day);
    }

    return null;
  }
}
