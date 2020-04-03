import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/common/confirmation-dialog/confirmation-dialog.component';
import { HospitalService } from '../byFuncionality/hospital.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private loadingSource = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSource.asObservable();

  public authService: AuthenticationService;
  public hospitalService: HospitalService;
  public autService: AuthenticationService;

  constructor(public authService: AuthenticationService, public dialog: MatDialog) { }

  public setLoading = loading => {
    this.loadingSource.next(loading);
  }

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
