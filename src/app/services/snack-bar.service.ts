import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar({ text1 = 'réussi', text2 = 'bravo', horizontalPositions = 'center', verticalPositions = 'top', temps= 1000 }: { text1?: string, text2?: string, horizontalPositions?: any, verticalPositions?: any, temps?: any } = {}) {
    this._snackBar.open(text1, text2, {
      horizontalPosition: horizontalPositions,
      verticalPosition: verticalPositions,
      duration: this.durationInSeconds * temps,
    });
  }
}
