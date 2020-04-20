import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/common/confirmation-dialog/confirmation-dialog.component';
import { FormDialogComponent } from '@components/common/form-dialog/form-dialog.component';
import { Title } from '@angular/platform-browser';

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

  public openFormDialog = (config: any, title: string, t?, w?) => {
    const promise = new Promise((resolve, reject) => {
      const width = w ? w : '350px';
      const type = t ? t : 'simple';
      const dialogref = this.dialog.open(FormDialogComponent, {
        width: width,
        data: {
          config: config,
          title: title,
          type: type
        }
      });
      dialogref.afterClosed().subscribe(result => {
        resolve(result);
      });
    });
    return promise;
  }
}
