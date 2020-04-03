import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/common/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public dialog: MatDialog) { }

  public openSimpleDialog = (messages: any, w?) => {
    const width = w ? w : '350px';
    this.dialog.open(ConfirmationDialogComponent, {
      width: width,
      data: {
        message: messages,
        type: 'simple'
      }
    });
  }

  public openConfirmationDialog = (messages: any, w?) => {
    const promise = new Promise((resolve, reject) => {
      const width = w ? w : '350px';
      const dialogref = this.dialog.open(ConfirmationDialogComponent, {
        width: width,
        data: {
          message: messages,
          type: 'simple'
        }
      });
      dialogref.afterClosed().subscribe(result => {
        resolve(result);
      });
    });
    return promise;
  }
}
