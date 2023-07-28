import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(msg: string) {
    return this.dialog.open(DialogComponent, {
      width: '390px',
      height: '150px',
      disableClose: true,
      data : {
        message: msg
      }
    })
  }

  close(){
    this.dialog.closeAll();
  }
}
