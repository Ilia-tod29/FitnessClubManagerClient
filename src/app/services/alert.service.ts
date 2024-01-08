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
}
