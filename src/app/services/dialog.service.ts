import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MatConfirmDialogComponent} from '../components/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmDialog(msg: string) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      height: 'auto',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      }
    });
  }
}
