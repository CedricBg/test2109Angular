import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(text1: string = 'réussi', text2: string = 'bravo',horizontalPositions: any = 'center', verticalPositions: any = 'top' ) {
    this._snackBar.open(text1, text2, {
      horizontalPosition: horizontalPositions,
      verticalPosition: verticalPositions,
      duration: this.durationInSeconds * 500,
    });
  }
}
